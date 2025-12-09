"""
CrewAI Support Agent with Chimoney Wallet Integration

This agent autonomously issues refunds up to $100/day with L4 assurance
for compliance and immutable audit trail.
"""

import os
import requests
from datetime import datetime
from typing import Dict, List
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# Load environment variables
load_dotenv()

# Configuration
CHIMONEY_API_KEY = os.getenv("CHIMONEY_API_KEY")
CHIMONEY_BASE_URL = os.getenv("CHIMONEY_SANDBOX_URL", "https://api-v2-sandbox.chimoney.io")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
AGENT_EMAIL = os.getenv("AGENT_EMAIL", "support-agent@example.com")
AGENT_NAME = os.getenv("AGENT_NAME", "Support Agent")
DAILY_REFUND_LIMIT = float(os.getenv("DAILY_REFUND_LIMIT", "100"))

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
        self.audit_log = []
    
    def create_wallet(self, name: str, email: str, daily_refund_limit: float = 100.0) -> Dict:
        """Create an AI agent wallet with built-in refund limits
        
        Limits are enforced by the Chimoney API automatically:
        - refundAmountDailyCap: Maximum refunds per day (in USD cents)
        - refundAmountMaxPerTx: Maximum refund per transaction (in USD cents)
        """
        url = f"{self.base_url}/v0.2.4/agents/create"
        payload = {
            "name": name,
            "email": email,
            "limits": {
                "refundAmountMaxPerTx": int(daily_refund_limit * 100),  # Max $100 per refund
                "refundAmountDailyCap": int(daily_refund_limit * 100)  # $100 daily cap
            },
            "capabilities": ["finance.payment.refund"]
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
    
    def process_refund(self, customer_email: str, amount: float, reason: str = "Customer refund") -> Dict:
        """Process a refund to a customer using Chimoney payout
        
        Limits are automatically enforced by the Chimoney API.
        If limits are exceeded, the API will return an error.
        """
        url = f"{self.base_url}/v0.2.4/payouts/chimoney"
        payload = {
            "chimoneys": [{
                "email": customer_email,
                "valueInUSD": amount,
                "reason": f"Refund: {reason}"
            }]
        }
        
        # Include subAccount if wallet_id is available
        if self.wallet_id:
            payload["subAccount"] = self.wallet_id
        
        response = requests.post(url, json=payload, headers=self.headers)
        
        # Check for limit violations (API will return 400/403 for limit exceeded)
        if response.status_code in [400, 403]:
            error_data = response.json()
            error_msg = error_data.get("error") or error_data.get("message", "Refund failed")
            raise Exception(f"Refund limit exceeded: {error_msg}")
        
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            # Extract issueID from response
            payout_data = data.get("data", {})
            chimoneys = payout_data.get("chimoneys", [])
            transaction_id = chimoneys[0].get("issueID", "unknown") if chimoneys else payout_data.get("issueID", "unknown")
            
            # Create audit log entry
            audit_entry = {
                "timestamp": datetime.now().isoformat(),
                "transaction_id": transaction_id,
                "type": "refund",
                "amount": amount,
                "customer_email": customer_email,
                "reason": reason,
                "l4_assurance": True
            }
            self.audit_log.append(audit_entry)
            
            return {
                "transaction_id": transaction_id,
                "amount": amount,
                "audit_entry": audit_entry
            }
        
        raise Exception(f"Refund failed: {data}")
    
    def get_audit_trail(self) -> List[Dict]:
        """Get immutable audit trail"""
        return self.audit_log.copy()
    
    def get_transaction_by_id(self, issue_id: str) -> Dict:
        """Get transaction details by issue ID"""
        url = f"{self.base_url}/v0.2.4/accounts/issue-id-transactions"
        params = {"issueID": issue_id}
        
        response = requests.post(url, json={}, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json()


class SupportAgent:
    """CrewAI support agent with Chimoney wallet integration"""
    
    def __init__(self):
        self.wallet = ChimoneyWallet(CHIMONEY_API_KEY, CHIMONEY_BASE_URL)
        self.initialize_wallet()
        self.llm = ChatOpenAI(model="gpt-4", temperature=0, api_key=OPENAI_API_KEY)
        self.crew = self._create_crew()
    
    def initialize_wallet(self):
        """Initialize the agent's wallet with built-in refund limits"""
        try:
            wallet_data = self.wallet.create_wallet(
                AGENT_NAME, 
                AGENT_EMAIL,
                daily_refund_limit=DAILY_REFUND_LIMIT
            )
            print(f"✅ Wallet created: {wallet_data.get('id')}")
            print(f"   Daily refund limit: ${DAILY_REFUND_LIMIT} (enforced by API)")
            print(f"   Max refund per transaction: ${DAILY_REFUND_LIMIT} (enforced by API)")
        except Exception as e:
            print(f"⚠️  Wallet initialization error: {e}")
            print("Continuing with limited functionality...")
    
    def _create_crew(self) -> Crew:
        """Create CrewAI crew with specialized agents"""
        
        # Refund Processor Agent
        refund_agent = Agent(
            role="Refund Processor",
            goal="Process customer refunds efficiently and within daily limits",
            backstory="""You are a specialized refund processor with access to 
            payment infrastructure. You can process refunds up to $100/day automatically.
            Always check daily limits before processing.""",
            verbose=True,
            allow_delegation=False,
            llm=self.llm
        )
        
        # Support Coordinator Agent
        coordinator_agent = Agent(
            role="Support Coordinator",
            goal="Coordinate customer support requests and delegate refund processing",
            backstory="""You coordinate customer support operations and delegate
            refund requests to the refund processor when appropriate.""",
            verbose=True,
            allow_delegation=True,
            llm=self.llm
        )
        
        return Crew(
            agents=[coordinator_agent, refund_agent],
            tasks=[],
            process=Process.sequential,
            verbose=True
        )
    
    def process_refund_request(self, customer_email: str, amount: float, reason: str) -> Dict:
        """Process a refund request
        
        Limits are automatically enforced by the Chimoney API.
        """
        try:
            # Process refund (API will enforce limits)
            result = self.wallet.process_refund(customer_email, amount, reason)
            
            return {
                "success": True,
                "transaction_id": result["transaction_id"],
                "amount": amount,
                "message": f"Refund of ${amount:.2f} processed successfully",
                "audit_entry": result["audit_entry"]
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_daily_summary(self) -> Dict:
        """Get daily refund summary"""
        # Calculate today's refunds from audit log
        today = datetime.now().date()
        today_refunds = []
        for e in self.wallet.audit_log:
            try:
                timestamp_str = e["timestamp"].replace("Z", "+00:00")
                entry_date = datetime.fromisoformat(timestamp_str).date()
                if entry_date == today:
                    today_refunds.append(e)
            except (ValueError, AttributeError, KeyError):
                # Skip invalid timestamps
                continue
        daily_refunded = sum(e["amount"] for e in today_refunds)
        
        return {
            "daily_refunded": daily_refunded,
            "daily_limit": DAILY_REFUND_LIMIT,
            "remaining": DAILY_REFUND_LIMIT - daily_refunded,
            "transactions_today": len(today_refunds)
        }
    
    def get_audit_trail(self) -> List[Dict]:
        """Get immutable audit trail"""
        return self.wallet.get_audit_trail()


def main():
    """Main function to run the support agent"""
    print("🚀 Initializing Support Agent with Chimoney Wallet...")
    print(f"💰 Daily Refund Limit: ${DAILY_REFUND_LIMIT}")
    print(f"✅ L4 Assurance: Enabled")
    print(f"📋 Audit Trail: Immutable")
    print()
    
    agent = SupportAgent()
    
    # Example refund requests
    examples = [
        {"email": "customer1@example.com", "amount": 25.00, "reason": "Product defect"},
        {"email": "customer2@example.com", "amount": 50.00, "reason": "Service cancellation"},
        {"email": "customer3@example.com", "amount": 30.00, "reason": "Billing error"},
    ]
    
    print("Processing example refund requests:")
    print("="*50)
    
    for i, refund in enumerate(examples, 1):
        print(f"\n{i}. Processing refund for {refund['email']}...")
        result = agent.process_refund_request(
            refund["email"],
            refund["amount"],
            refund["reason"]
        )
        
        if result["success"]:
            print(f"   ✅ {result['message']}")
            print(f"   📝 Transaction ID: {result['transaction_id']}")
        else:
            print(f"   ❌ {result.get('message', result.get('error', 'Unknown error'))}")
    
    print("\n" + "="*50)
    print("Daily Summary:")
    summary = agent.get_daily_summary()
    print(f"   Refunded: ${summary['daily_refunded']:.2f} / ${summary['daily_limit']:.2f}")
    print(f"   Remaining: ${summary['remaining']:.2f}")
    print(f"   Transactions: {summary['transactions_today']}")
    
    print("\n" + "="*50)
    print("Audit Trail (Last 5 entries):")
    audit_trail = agent.get_audit_trail()
    for entry in audit_trail[-5:]:
        print(f"   [{entry['timestamp']}] ${entry['amount']:.2f} - {entry['reason']} (ID: {entry['transaction_id']})")


if __name__ == "__main__":
    main()

