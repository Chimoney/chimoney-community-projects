# CrewAI Support Agent with Chimoney Wallet

A CrewAI multi-agent system for customer support that autonomously issues refunds up to $100/day with L4 assurance for compliance and immutable audit trail.

## Features

- ✅ Autonomous refund processing
- ✅ Built-in daily refund limit: $100/day (enforced by Chimoney API)
- ✅ Built-in max refund per transaction: $100 (enforced by Chimoney API)
- ✅ L4 assurance for compliance
- ✅ Immutable audit trail
- ✅ Multi-agent coordination with CrewAI

## Overview

This example demonstrates how to integrate Chimoney's AI agent wallet infrastructure with CrewAI to create a customer support system that can autonomously process refunds while maintaining compliance and audit requirements.

## Prerequisites

- Python 3.8+
- Chimoney API key ([Get one free at sandbox.chimoney.io](https://sandbox.chimoney.io))
- CrewAI installed
- OpenAI API key (or other LLM provider compatible with CrewAI)

## Installation

```bash
# Clone the repository
git clone https://github.com/Chimoney/chimoney-community-projects.git
cd chimoney-community-projects/ai-passport-and-wallet-examples/crewai-support-agent

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys (CHIMONEY_API_KEY and OPENAI_API_KEY are required)
```

## Environment Variables

Create a `.env` file with the following:

```env
CHIMONEY_API_KEY=your_chimoney_api_key
CHIMONEY_SANDBOX_URL=https://api-v2-sandbox.chimoney.io
OPENAI_API_KEY=your_openai_api_key
AGENT_EMAIL=support-agent@yourdomain.com
AGENT_NAME=Support Agent
DAILY_REFUND_LIMIT=100
```

## Usage

```bash
python support_agent.py
```

## How It Works

1. **Wallet Creation**: Creates an AI agent wallet with built-in refund limits using the agents/create endpoint
2. **Automatic Limit Enforcement**: Chimoney API automatically enforces daily refund limits ($100/day) and max per transaction ($100)
3. **Refund Processing**: Processes refunds automatically - API rejects refunds exceeding limits
4. **Audit Trail**: Records all transactions with immutable audit logs
5. **Multi-Agent Coordination**: Uses CrewAI for task distribution and coordination
6. **No Manual Tracking**: Limits are enforced server-side, no need to manually track refunds

## API Endpoints Used

- `POST /v0.2.4/agents/create` - Create AI agent wallet
- `POST /v0.2.4/payouts/chimoney` - Issue refunds
- `POST /v0.2.4/accounts/transactions` - Get audit trail
- `POST /v0.2.4/accounts/issue-id-transactions` - Get transaction by ID

## Example Flow

```python
# Customer requests refund
customer_email = "customer@example.com"
refund_amount = 25.00

# Agent processes refund
agent.process_refund(customer_email, refund_amount)

# Chimoney API checks built-in limits automatically
# Refund approved (under $100/day limit, under $100 max per tx)
# Payment processed
# Audit log created

# If limit exceeded:
# Chimoney API returns error, refund rejected
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
- [CrewAI Documentation](https://docs.crewai.com/)
- [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects)

