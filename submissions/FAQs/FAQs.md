# Chimoney Developer Toolkit - Frequently Asked Questions (FAQs)

Welcome to the Chimoney Developer Toolkit FAQ page! Here, you'll find answers to common questions, troubleshooting tips, and best practices for using the Chimoney API. Our goal is to help you integrate, secure, and use Chimoney's API efficiently.

---

## Table of Contents
- [General Questions](#general-questions)
- [Authentication and Security](#authentication-and-security)
- [Integration and Usage](#integration-and-usage)
- [Error Handling](#error-handling)
- [Support and Community](#support-and-community)
- [Other Common Questions](#other-common-questions)

---

## General Questions

### What is Chimoney API?

The **Chimoney API** allows developers to integrate payment and reward services into their applications. You can send payments globally, exchange rewards, and facilitate financial transactions via a unified platform.

For more details, refer to our [API Overview](https://chimoney.readme.io/reference/introduction).

### How do I get started with Chimoney API?

To get started with Chimoney API:
1. **Sign up** on [Chimoney's Developer Portal](https://dash.chimoney.io/auth/signin).
2. Review the [API Documentation](https://chimoney.readme.io/reference/introduction) to understand the available endpoints.
3. Obtain an API key and begin integrating with your platform using our SDKs or direct API calls.

For a detailed guide, check the [Getting Started Guide](https://chimoney.readme.io/reference/getting-started-with-your-api).

### Where can I find the API documentation?

You can find the full API documentation, including endpoints, SDKs, and integration examples, on our [API Documentation Page](https://chimoney.readme.io/reference/introduction).

---

## Authentication and Security

### How to obtain an API key?

To obtain an API key:
1. Log in to your [Chimoney account](https://dash.chimoney.io/auth/signin).
2. Navigate to the **API keys** section in your dashboard.
3. Generate a new API key.

For step-by-step instructions, refer to [API Key Setup](https://chimoney.readme.io/reference/authentication).

### How to manage and rotate API keys?

It's important to rotate your API keys periodically for security purposes. To manage your API keys:
1. Go to the **API keys** section in your account dashboard.
2. You can revoke, regenerate, or create new keys as needed.

### Best practices for securing API keys

Here are a few best practices for securing your API keys:
- **Never hard-code API keys** into your source code.
- **Use environment variables** to store API keys.
- **Rotate API keys** regularly and remove unused keys.
- **Monitor usage** to detect any suspicious activity.

---

## Integration and Usage

### What are the SDKs available for Chimoney API?

Chimoney provides SDKs in multiple programming languages to simplify the integration process:
- **Javascript(NPM) SDK**
- **Python SDK**
- **PHP-Laravel**
- **Flutter**
- **DotNet**
- **Java**
- **Rust**

You can find the full list of SDKs and their usage instructions on the [Libraries & Plugins](https://chimoney.readme.io/reference/libraries-plugins).

### How to integrate Chimoney API with different platforms?

You can integrate Chimoney API with various platforms like **web apps**, **mobile apps**, and **backend services** by following our platform-specific guides:
- **Web**: Use our JavaScript SDK or REST API.
- **Mobile**: Integrate via REST API with backend services.
- **Backend**: Use our server-side SDKs or directly call our API.

For detailed platform integration examples, visit our [Integration Guides](https://chimoney.readme.io/reference/integration-guides).

---

## Error Handling

### How to handle common API errors?

Chimoney API uses standard HTTP response codes to indicate errors. Here are some common errors and their resolutions:
- **400 Bad Request**: Invalid request. Check your request parameters.
- **401 Unauthorized**: Authentication failed. Verify your API key.
- **403 Forbidden**: You don't have permission to access this resource.
- **404 Not Found**: The requested resource doesn't exist.
- **500 Internal Server Error**: Something went wrong on our end. Try again later.

---

## Support and Community

### How can I get support if I encounter issues?

If you encounter any issues while using the Chimoney API, you can:
- Contact [support@chimoney.io](mailto:support@chimoney.io) to ask questions.
- Join our developer community on [Discord](https://discord.com/invite/Q3peDrPG95) to get support if you encounter issues.

You can also reach out to us via email at [support@chimoney.io](mailto:support@chimoney.io).

### How can I contribute to the Chimoney community?

We welcome contributions to improve Chimoney! You can contribute by:
- Reporting issues or suggesting features on our [GitHub Repository](https://github.com/chimoney).
- Sharing your integration stories and code samples with the community.
- Joining our developer community on [Discord](https://discord.com/invite/Q3peDrPG95) to collaborate and discuss new ideas.

---

## Other Common Questions

### What are the rate limits for Chimoney API?

Chimoney API has rate limits to ensure fair usage and stability. The rate limits depend on your subscription plan. For details on rate limits, check the [Pricing and benefits](https://chimoney.io/pricing/).

### How can I test Chimoney API without sending real transactions?

You can test the Chimoney API using our **sandbox environment**, which simulates real transactions without affecting actual accounts. To access the sandbox environment, follow the instructions in our [Testing Guide](https://chimoney.readme.io/reference/sandbox-environment).

---

Have more questions? Feel free to explore our [documentation](https://chimoney.readme.io/reference/introduction) or reach out to our support team for personalized assistance.
