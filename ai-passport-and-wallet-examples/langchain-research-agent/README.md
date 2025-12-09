# LangChain Research Agent with Chimoney Wallet

A LangChain agent that autonomously pays for API access to data sources (weather, stock prices, news) with spending limits and transaction approval controls.

## Features

- ✅ Autonomous API payments for data sources
- ✅ Built-in daily spending limit: $50/day (enforced by Chimoney API)
- ✅ Built-in max per transaction: $10 (enforced by Chimoney API)
- ✅ Policy-controlled wallet with automatic limit enforcement
- ✅ Full audit trail for compliance

## Overview

This example demonstrates how to integrate Chimoney's AI agent wallet infrastructure with LangChain to create a research agent that can autonomously pay for API access while maintaining spending controls and compliance.

## Prerequisites

- Python 3.8+
- Chimoney API key ([Get one free at sandbox.chimoney.io](https://sandbox.chimoney.io))
- LangChain installed
- OpenAI API key (or other LLM provider compatible with LangChain)

## Installation

```bash
# Clone the repository
git clone https://github.com/Chimoney/chimoney-community-projects.git
cd chimoney-community-projects/ai-passport-and-wallet-examples/langchain-research-agent

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
AGENT_EMAIL=research-agent@yourdomain.com
AGENT_NAME=Research Agent
DAILY_LIMIT=50
APPROVAL_THRESHOLD=10
```

## Usage

```bash
python research_agent.py
```

## How It Works

1. **Wallet Creation**: Creates an AI agent wallet with built-in limits using the agents/create endpoint
2. **Automatic Limit Enforcement**: Chimoney API automatically enforces daily spending limits ($50/day) and max per transaction ($10)
3. **API Integration**: Integrates with data APIs (weather, stocks, news)
4. **Payment Processing**: Automatically pays for API access - API rejects transactions exceeding limits
5. **No Manual Tracking**: Limits are enforced server-side, no need to manually track spending

## API Endpoints Used

- `POST /v0.2.4/agents/create` - Create AI agent wallet
- `POST /v0.2.4/accounts/issue-wallet-address` - Issue payment pointer
- `POST /v0.2.4/payouts/chimoney` - Send payments for API access
- `POST /v0.2.4/accounts/transactions` - Check transaction history

## Example Flow

```python
# Agent needs weather data
agent.query("What's the weather in New York?")

# Payment attempt: $5
# Chimoney API checks built-in limits automatically
# Transaction approved (under $10 max per tx, under $50 daily limit)
# API call made, data returned

# If limit exceeded:
# Chimoney API returns error, transaction rejected
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
- [LangChain Documentation](https://python.langchain.com/)
- [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects)
