"""
Data Processing Agent with Chimoney Wallet Integration

This agent pays other agents for specialized analysis, demonstrating
agent-to-agent transactions with policy enforcement.
"""

import os
import requests
from datetime import datetime
from typing import Dict, List
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
CHIMONEY_API_KEY = os.getenv("CHIMONEY_API_KEY")
CHIMONEY_BASE_URL = os.getenv("CHIMONEY_SANDBOX_URL", "https://api-v2-sandbox.chimoney.io")
AGENT_EMAIL = os.getenv("AGENT_EMAIL", "data-agent@example.com")
AGENT_NAME = os.getenv("AGENT_NAME", "Data Processing Agent")

# Validate required API key
if not CHIMONEY_API_KEY:
    raise ValueError("CHIMONEY_API_KEY environment variable is required. Get your API key at https://sandbox.chimoney.io")


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
    
    def create_wallet(self, name: str, email: str, daily_limit: float = 1000.0, max_per_tx: float = 100.0) -> Dict:
        """Create an AI agent wallet with built-in limits
        
        Limits are enforced by the Chimoney API automatically:
        - dailyCap: Maximum spending per day (in USD cents)
        - maxPerTx: Maximum per transaction (in USD cents)
        """
        url = f"{self.base_url}/v0.2.4/agents/create"
        payload = {
            "name": name,
            "email": email,
            "limits": {
                "USD": {
                    "maxPerTx": int(max_per_tx * 100),  # Convert to cents
                    "dailyCap": int(daily_limit * 100)  # Convert to cents
                }
            },
            "capabilities": ["finance.payment.payout", "wallet.transfer"]
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
    
    def transfer_to_agent(self, destination_wallet_id: str, amount: float, currency: str = "USD", narration: str = "") -> Dict:
        """Transfer funds to another agent's wallet"""
        if not self.wallet_id:
            raise Exception("Source wallet not initialized")
        
        url = f"{self.base_url}/v0.2.4/multicurrency-wallets/transfer"
        payload = {
            "sourceWalletID": self.wallet_id,
            "destinationWalletID": destination_wallet_id,
            "amount": amount,
            "currency": currency,
            "narration": narration or f"Payment for agent service"
        }
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data["data"]
        raise Exception(f"Transfer failed: {data}")
    
    def pay_agent_via_chimoney(self, amount: float, agent_email: str, task_description: str) -> Dict:
        """Pay an agent via Chimoney payout
        
        Limits are automatically enforced by the Chimoney API.
        If limits are exceeded, the API will return an error.
        """
        url = f"{self.base_url}/v0.2.4/payouts/chimoney"
        payload = {
            "chimoneys": [{
                "email": agent_email,
                "valueInUSD": amount,
                "reason": f"Agent payment: {task_description}"
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
    
    def pay_agent_via_interledger(self, amount: float, interledger_address: str, task_description: str) -> Dict:
        """Pay an agent via Interledger wallet address"""
        url = f"{self.base_url}/v0.2.4/payouts/interledger-wallet-address"
        payload = {
            "payments": [{
                "interledgerWalletAddress": interledger_address,
                "valueInUSD": amount,
                "metadata": {"task": task_description}
            }]
        }
        
        # Include subAccount if wallet_id is available
        if self.wallet_id:
            payload["subAccount"] = self.wallet_id
        
        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data.get("data", {})
        raise Exception(f"Interledger payment failed: {data}")
    
    def get_transactions(self, limit: int = 10) -> List[Dict]:
        """Get transaction history"""
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


class WorkerAgent:
    """Represents a specialized worker agent"""
    
    def __init__(self, name: str, email: str, specialization: str, wallet: ChimoneyWallet):
        self.name = name
        self.email = email
        self.specialization = specialization
        self.wallet = wallet
        self.wallet_id = None
    
    def initialize(self):
        """Initialize the worker agent's wallet with built-in limits"""
        wallet_data = self.wallet.create_wallet(
            self.name, 
            self.email,
            daily_limit=500.0,  # $500 daily limit for worker agents
            max_per_tx=50.0  # $50 max per transaction
        )
        self.wallet_id = wallet_data.get("id")
        return wallet_data
    
    def process_task(self, task: str) -> Dict:
        """Process a specialized task"""
        # In production, this would perform actual analysis
        return {
            "agent": self.name,
            "specialization": self.specialization,
            "task": task,
            "result": f"Analysis completed by {self.name} specializing in {self.specialization}",
            "timestamp": datetime.now().isoformat()
        }


class DataProcessingAgent:
    """Main data processing agent that delegates to worker agents"""
    
    def __init__(self):
        self.wallet = ChimoneyWallet(CHIMONEY_API_KEY, CHIMONEY_BASE_URL)
        self.initialize_wallet()
        self.worker_agents = {}
        self.transaction_log = []
    
    def initialize_wallet(self):
        """Initialize the main agent's wallet with built-in limits"""
        try:
            wallet_data = self.wallet.create_wallet(
                AGENT_NAME, 
                AGENT_EMAIL,
                daily_limit=1000.0,  # $1000 daily limit
                max_per_tx=100.0  # $100 max per transaction
            )
            print(f"✅ Main agent wallet created: {wallet_data.get('id')}")
            print(f"   Daily limit: $1000 (enforced by API)")
            print(f"   Max per transaction: $100 (enforced by API)")
        except Exception as e:
            print(f"⚠️  Wallet initialization error: {e}")
    
    def register_worker_agent(self, name: str, email: str, specialization: str):
        """Register a worker agent"""
        worker_wallet = ChimoneyWallet(CHIMONEY_API_KEY, CHIMONEY_BASE_URL)
        worker = WorkerAgent(name, email, specialization, worker_wallet)
        worker.initialize()
        self.worker_agents[name] = worker
        print(f"✅ Worker agent registered: {name} ({specialization})")
        return worker
    
    def delegate_task(self, task: str, worker_agent_name: str, payment_amount: float) -> Dict:
        """Delegate a task to a worker agent and pay them"""
        if worker_agent_name not in self.worker_agents:
            raise Exception(f"Worker agent '{worker_agent_name}' not found")
        
        worker = self.worker_agents[worker_agent_name]
        
        # Process the task
        result = worker.process_task(task)
        
        # Pay the worker agent
        try:
            payment_result = self.wallet.pay_agent_via_chimoney(
                payment_amount,
                worker.email,
                task
            )
            # Extract issueID from response
            chimoneys = payment_result.get("chimoneys", [])
            transaction_id = chimoneys[0].get("issueID", "unknown") if chimoneys else payment_result.get("issueID", "unknown")
            
            # Log the transaction
            transaction_log_entry = {
                "timestamp": datetime.now().isoformat(),
                "worker_agent": worker_agent_name,
                "task": task,
                "payment_amount": payment_amount,
                "transaction_id": transaction_id,
                "result": result
            }
            self.transaction_log.append(transaction_log_entry)
            
            return {
                "success": True,
                "result": result,
                "payment": {
                    "amount": payment_amount,
                    "transaction_id": transaction_id
                },
                "transaction_log": transaction_log_entry
            }
        except Exception as e:
            return {
                "success": False,
                "result": result,
                "error": str(e)
            }
    
    def get_transaction_history(self) -> List[Dict]:
        """Get transaction history"""
        return self.transaction_log.copy()


def main():
    """Main function to demonstrate agent-to-agent transactions"""
    print("🚀 Initializing Data Processing Agent...")
    print()
    
    agent = DataProcessingAgent()
    
    # Register worker agents
    print("Registering worker agents:")
    print("="*50)
    agent.register_worker_agent(
        "analytics-agent",
        "analytics@example.com",
        "Data Analytics"
    )
    agent.register_worker_agent(
        "ml-agent",
        "ml@example.com",
        "Machine Learning"
    )
    agent.register_worker_agent(
        "stats-agent",
        "stats@example.com",
        "Statistical Analysis"
    )
    
    print("\n" + "="*50)
    print("Delegating tasks to worker agents:")
    print("="*50)
    
    # Delegate tasks
    tasks = [
        {
            "task": "Analyze sales data for Q4 2024",
            "worker": "analytics-agent",
            "payment": 20.00
        },
        {
            "task": "Build predictive model for customer churn",
            "worker": "ml-agent",
            "payment": 35.00
        },
        {
            "task": "Perform statistical significance testing",
            "worker": "stats-agent",
            "payment": 15.00
        }
    ]
    
    for i, task_info in enumerate(tasks, 1):
        print(f"\n{i}. Task: {task_info['task']}")
        print(f"   Worker: {task_info['worker']}")
        print(f"   Payment: ${task_info['payment']:.2f}")
        
        result = agent.delegate_task(
            task_info["task"],
            task_info["worker"],
            task_info["payment"]
        )
        
        if result["success"]:
            print(f"   ✅ Task completed")
            print(f"   💰 Payment processed: ${result['payment']['amount']:.2f}")
            print(f"   📝 Transaction ID: {result['payment']['transaction_id']}")
        else:
            print(f"   ❌ Error: {result.get('error', 'Unknown error')}")
    
    print("\n" + "="*50)
    print("Transaction History:")
    print("="*50)
    history = agent.get_transaction_history()
    for entry in history:
        print(f"\n[{entry['timestamp']}]")
        print(f"  Worker: {entry['worker_agent']}")
        print(f"  Task: {entry['task']}")
        print(f"  Payment: ${entry['payment_amount']:.2f}")
        print(f"  Transaction ID: {entry['transaction_id']}")


if __name__ == "__main__":
    main()

