# AI Passport and Wallet Examples

Working integrations demonstrating how to create AI agents with Chimoney wallets, policy controls, and autonomous payment capabilities.

## Examples

### 1. LangChain Research Agent
**Location**: `langchain-research-agent/`

A LangChain agent that autonomously pays for API access to data sources (weather, stock prices, news) with spending limits and transaction approval controls.

- Daily spending limit: $50/day
- Auto-approval for transactions ≤$10
- Manual approval required for transactions >$10

[View Example →](./langchain-research-agent/)

### 2. CrewAI Support Agent
**Location**: `crewai-support-agent/`

A CrewAI multi-agent system for customer support that autonomously issues refunds up to $100/day with L4 assurance for compliance and immutable audit trail.

- Daily refund limit: $100/day
- L4 assurance for compliance
- Immutable audit trail

[View Example →](./crewai-support-agent/)

### 3. Data Processing Agent
**Location**: `data-processing-agent/`

A custom Python agent that pays other agents for specialized analysis. Demonstrates agent-to-agent transactions with policy enforcement.

- Agent-to-agent payments
- Policy-controlled transactions
- Specialized analysis delegation

[View Example →](./data-processing-agent/)

## Getting Started

Each example includes:
- ✅ Full source code
- ✅ README with setup instructions
- ✅ Requirements/dependencies
- ✅ Environment configuration

Navigate to any example directory and follow its README for setup instructions.

## Prerequisites

- Python 3.8+
- Chimoney API key ([Get one here](https://sandbox.chimoney.io))
- Framework-specific dependencies (see individual example READMEs)

## API Documentation

- [Chimoney API v0.2.4 Documentation](https://api.chimoney.io/v0.2.4/api-docs)
- [Swagger JSON](https://api-v2-sandbox.chimoney.io/swagger.json)

## Contributing

Contributions are welcome! Please read the [Contributing Guide](../CONTRIBUTING.md) first.

## License

MIT License

## Resources

- [Chimoney Community Projects](https://github.com/Chimoney/chimoney-community-projects)
- [Chimoney Documentation](https://chimoney.readme.io)
- [Join Discord](https://discord.gg/TsyKnzT4qV)

