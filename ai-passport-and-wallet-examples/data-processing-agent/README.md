# Data Processing Agent with Chimoney Wallet

A custom Python agent that pays other agents for specialized analysis. Demonstrates agent-to-agent transactions with policy enforcement.

## Features

- ✅ Agent-to-agent payments
- ✅ Built-in transaction limits (enforced by Chimoney API)
- ✅ Policy-controlled transactions with automatic enforcement
- ✅ Specialized analysis delegation
- ✅ Transaction tracking and audit

## Overview

This example demonstrates how to create a data processing agent that can delegate specialized analysis tasks to other agents and pay them using Chimoney's wallet infrastructure. This enables a multi-agent economy where agents can transact with each other.

## Prerequisites

- Python 3.8+
- Chimoney API key ([Get one free at sandbox.chimoney.io](https://sandbox.chimoney.io))

## Installation

```bash
# Clone the repository
git clone https://github.com/Chimoney/chimoney-community-projects.git
cd chimoney-community-projects/ai-passport-and-wallet-examples/data-processing-agent

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API key (CHIMONEY_API_KEY is required)
```

## Environment Variables

Create a `.env` file with the following:

```env
CHIMONEY_API_KEY=your_chimoney_api_key
CHIMONEY_SANDBOX_URL=https://api-v2-sandbox.chimoney.io
AGENT_EMAIL=data-agent@yourdomain.com
AGENT_NAME=Data Processing Agent
```

## Usage

```bash
python data_agent.py
```

## How It Works

1. **Wallet Creation**: Creates AI agent wallets with built-in limits for the main agent ($1000/day, $100/tx) and worker agents ($500/day, $50/tx) using agents/create
2. **Task Delegation**: Delegates specialized analysis tasks to worker agents
3. **Payment Processing**: Pays worker agents for completed tasks - API automatically enforces limits
4. **Automatic Policy Enforcement**: Chimoney API enforces spending policies and transaction limits server-side
5. **Result Aggregation**: Aggregates results from multiple worker agents
6. **No Manual Tracking**: Limits are enforced server-side, no need to manually track spending

## API Endpoints Used

- `POST /v0.2.4/agents/create` - Create AI agent wallets
- `POST /v0.2.4/multicurrency-wallets/transfer` - Transfer funds between agents
- `POST /v0.2.4/payouts/chimoney` - Pay worker agents via email
- `POST /v0.2.4/payouts/interledger-wallet-address` - Pay worker agents via Interledger
- `POST /v0.2.4/accounts/transactions` - Track transactions

## Example Flow

```python
# Main agent needs specialized analysis
task = "Analyze sales data for Q4"

# Delegate to specialized agent
result = agent.delegate_task(
    task=task,
    worker_agent="analytics-agent",
    payment_amount=15.00
)

# Chimoney API checks built-in limits automatically
# Payment approved (under $100 max per tx, under $1000 daily limit)
# Worker agent completes task
# Payment processed automatically
# Results returned to main agent

# If limit exceeded:
# Chimoney API returns error, payment rejected
# Agent receives clear error message
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](../../CONTRIBUTING.md) first.

## License

MIT License

## Resources

- [Chimoney API Documentation](https://api.chimoney.io/v0.2.4/api-docs)
- [Chimoney API Swagger (Interactive)](https://api-v2-sandbox.chimoney.io/swagger.json)
- [Get Chimoney API Key](https://sandbox.chimoney.io)
- [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects)
