"""
LangChain Research Agent with Chimoney Wallet Integration

This agent autonomously pays for API access to data sources (weather, stock prices, news)
with spending limits and transaction approval controls.
"""

import os
import requests
from datetime import datetime
from typing import Dict, List
from dotenv import load_dotenv
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import Tool

# Load environment variables
load_dotenv()

# Configuration
CHIMONEY_API_KEY = os.getenv("CHIMONEY_API_KEY")
CHIMONEY_BASE_URL = os.getenv("CHIMONEY_SANDBOX_URL", "https://api-v2-sandbox.chimoney.io")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
AGENT_EMAIL = os.getenv("AGENT_EMAIL", "research-agent@example.com")
AGENT_NAME = os.getenv("AGENT_NAME", "Research Agent")
DAILY_LIMIT = float(os.getenv("DAILY_LIMIT", "50"))
APPROVAL_THRESHOLD = float(os.getenv("APPROVAL_THRESHOLD", "10"))

# Validate required API keys
if not CHIMONEY_API_KEY:
    raise ValueError("CHIMONEY_API_KEY environment variable is required. Get your API key at https://sandbox.chimoney.io")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is required")


class ChimoneyWallet:
    """Wrapper for Chimoney API operations"""
    
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "X-API-KEY": api_key
        }
        self.wallet_id = None
    
    def create_wallet(self, name: str, email: str, daily_limit: float = 50.0, approval_threshold: float = 10.0) -> Dict:
        """Create an AI agent wallet with built-in limits
        
        Limits are enforced by the Chimoney API automatically:
        - dailyCap: Maximum spending per day (in USD cents)
        - maxPerTx: Maximum per transaction (in USD cents)
        - approvalRequired: Whether transactions require manual approval
        """
        url = f"{self.base_url}/v0.2.4/agents/create"
        payload = {
            "name": name,
            "email": email,
            "limits": {
                "USD": {
                    "maxPerTx": int(approval_threshold * 100),  # Convert to cents
                    "dailyCap": int(daily_limit * 100)  # Convert to cents
                },
                "approvalRequired": False  # Auto-approve transactions within limits
            },
            "capabilities": ["finance.payment.payout"]
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            # Agent wallet ID is typically in data.data.id or data.data.walletId
            wallet_data = data.get("data", {})
            self.wallet_id = wallet_data.get("id") or wallet_data.get("walletId") or wallet_data.get("subAccount")
            return wallet_data
        raise Exception(f"Failed to create agent wallet: {data}")
    
    def issue_payment_pointer(self, user_id: str, ilp_username: str) -> Dict:
        """Issue an Interledger payment pointer for the wallet"""
        url = f"{self.base_url}/v0.2.4/accounts/issue-wallet-address"
        payload = {
            "userID": user_id,
            "ilpUsername": ilp_username
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def pay_for_api_access(self, amount: float, api_name: str, recipient_email: str) -> Dict:
        """Pay for API access using Chimoney payout
        
        Limits are automatically enforced by the Chimoney API.
        If limits are exceeded, the API will return an error.
        """
        url = f"{self.base_url}/v0.2.4/payouts/chimoney"
        payload = {
            "chimoneys": [{
                "email": recipient_email,
                "valueInUSD": amount,
                "reason": f"API access payment: {api_name}"
            }]
        }
        
        # Include subAccount if wallet_id is available
        if self.wallet_id:
            payload["subAccount"] = self.wallet_id
        
        response = requests.post(url, json=payload, headers=self.headers)
        
        # Check for limit violations (API will return 400/403 for limit exceeded)
        if response.status_code in [400, 403]:
            error_data = response.json()
            error_msg = error_data.get("error") or error_data.get("message", "Payment failed")
            raise Exception(f"Transaction limit exceeded: {error_msg}")
        
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data.get("data", {})
        
        raise Exception(f"Payment failed: {data}")
    
    def get_transaction_history(self, limit: int = 10) -> List[Dict]:
        """Get transaction history for the wallet"""
        if not self.wallet_id:
            return []
        
        url = f"{self.base_url}/v0.2.4/accounts/transactions"
        payload = {
            "subAccount": self.wallet_id,
            "limit": limit,
            "page": 1
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data.get("data", {}).get("transactions", [])
        return []


class ResearchAgent:
    """LangChain agent with Chimoney wallet integration"""
    
    def __init__(self):
        self.wallet = ChimoneyWallet(CHIMONEY_API_KEY, CHIMONEY_BASE_URL)
        self.initialize_wallet()
        self.llm = ChatOpenAI(model="gpt-4", temperature=0, api_key=OPENAI_API_KEY)
        self.tools = self._create_tools()
        self.agent = self._create_agent()
    
    def initialize_wallet(self):
        """Initialize the agent's wallet with built-in limits"""
        try:
            wallet_data = self.wallet.create_wallet(
                AGENT_NAME, 
                AGENT_EMAIL,
                daily_limit=DAILY_LIMIT,
                approval_threshold=APPROVAL_THRESHOLD
            )
            print(f"✅ Wallet created: {wallet_data.get('id')}")
            print(f"   Daily limit: ${DAILY_LIMIT} (enforced by API)")
            print(f"   Max per transaction: ${APPROVAL_THRESHOLD} (enforced by API)")
            
            # Issue payment pointer
            if wallet_data.get("id"):
                pointer_data = self.wallet.issue_payment_pointer(
                    wallet_data["id"],
                    "research-agent"
                )
                print(f"✅ Payment pointer issued: {pointer_data}")
        except Exception as e:
            print(f"⚠️  Wallet initialization error: {e}")
            print("Continuing with limited functionality...")
    
    def _create_tools(self) -> List[Tool]:
        """Create tools for the agent"""
        
        def get_weather_data(query: str) -> str:
            """Get weather data. Costs $5 per query."""
            try:
                amount = 5.0
                self.wallet.pay_for_api_access(amount, "Weather API", "weather-api@example.com")
                # In production, make actual API call here
                return f"Weather data for {query}: Sunny, 72°F (Paid ${amount} for API access)"
            except Exception as e:
                return f"Error accessing weather API: {str(e)}"
        
        def get_stock_price(symbol: str) -> str:
            """Get stock price data. Costs $8 per query."""
            try:
                amount = 8.0
                self.wallet.pay_for_api_access(amount, "Stock API", "stock-api@example.com")
                # In production, make actual API call here
                return f"Stock price for {symbol}: $150.25 (Paid ${amount} for API access)"
            except Exception as e:
                return f"Error accessing stock API: {str(e)}"
        
        def get_news(query: str) -> str:
            """Get news data. Costs $3 per query."""
            try:
                amount = 3.0
                self.wallet.pay_for_api_access(amount, "News API", "news-api@example.com")
                # In production, make actual API call here
                return f"News for {query}: Latest headlines... (Paid ${amount} for API access)"
            except Exception as e:
                return f"Error accessing news API: {str(e)}"
        
        def check_spending() -> str:
            """Check current daily spending and remaining budget."""
            # Get transaction history to calculate current spending
            transactions = self.wallet.get_transaction_history(limit=100)
            today = datetime.now().date()
            today_spent = 0.0
            for t in transactions:
                if t.get("issueDate"):
                    try:
                        # Handle different date formats
                        issue_date_str = t["issueDate"].replace("Z", "+00:00")
                        issue_date = datetime.fromisoformat(issue_date_str).date()
                        if issue_date == today:
                            today_spent += float(t.get("valueInUSD", 0))
                    except (ValueError, AttributeError):
                        # Skip invalid date formats
                        continue
            remaining = DAILY_LIMIT - today_spent
            return f"Daily spending: ${today_spent:.2f} / ${DAILY_LIMIT:.2f}. Remaining: ${remaining:.2f}"
        
        return [
            Tool(
                name="get_weather",
                func=get_weather_data,
                description="Get weather information for a location. Costs $5 per query."
            ),
            Tool(
                name="get_stock_price",
                func=get_stock_price,
                description="Get current stock price for a symbol. Costs $8 per query."
            ),
            Tool(
                name="get_news",
                func=get_news,
                description="Get news articles for a topic. Costs $3 per query."
            ),
            Tool(
                name="check_spending",
                func=check_spending,
                description="Check current daily spending and remaining budget."
            )
        ]
    
    def _create_agent(self) -> AgentExecutor:
        """Create the LangChain agent"""
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a research agent with access to paid data APIs.
You have a daily spending limit of ${daily_limit} and max per transaction of ${approval_threshold}.
These limits are automatically enforced by the Chimoney API - transactions exceeding limits will be rejected.
Always check spending before making expensive queries.""".format(
                daily_limit=DAILY_LIMIT,
                approval_threshold=APPROVAL_THRESHOLD
            )),
            ("user", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        agent = create_openai_tools_agent(self.llm, self.tools, prompt)
        return AgentExecutor(agent=agent, tools=self.tools, verbose=True)
    
    def query(self, question: str) -> str:
        """Query the agent"""
        try:
            result = self.agent.invoke({"input": question})
            return result.get("output", "No response generated")
        except Exception as e:
            return f"Error: {str(e)}"


def main():
    """Main function to run the research agent"""
    print("🚀 Initializing Research Agent with Chimoney Wallet...")
    print(f"📊 Daily Limit: ${DAILY_LIMIT}")
    print(f"✅ Auto-approval threshold: ${APPROVAL_THRESHOLD}")
    print()
    
    agent = ResearchAgent()
    
    # Example queries
    examples = [
        "What's the weather in New York?",
        "What's the current price of AAPL stock?",
        "Get me the latest news about AI",
        "Check my spending",
    ]
    
    print("Example queries:")
    for i, query in enumerate(examples, 1):
        print(f"{i}. {query}")
    
    print("\n" + "="*50)
    print("Agent is ready! Try asking questions.")
    print("="*50 + "\n")
    
    # Interactive mode
    while True:
        try:
            question = input("You: ")
            if question.lower() in ['exit', 'quit', 'q']:
                break
            
            response = agent.query(question)
            print(f"Agent: {response}\n")
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}\n")


if __name__ == "__main__":
    main()

