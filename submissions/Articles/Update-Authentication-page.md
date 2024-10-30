# Authentication

This guide explains how to authenticate your requests to the Chimoney API. Follow these steps to get started with integrating Chimoney's payment solutions into your applications.

## Getting Started

### For Businesses

1. **Create an Account**
   - Sign up at [dash.chimoney.io](https://dash.chimoney.io)
   - Complete the registration process

2. **Request API Access**
   - Email support@chimoney.io to request "Verification and API Access"
   - Include:
     - Links to your website
     - Description of your use case
   - Alternatively, you can [book a demo](https://chimoney.io/book-a-demo/)

3. **Choose a Plan**
   - Review available plans at [chimoney.io/pricing](https://chimoney.io/pricing/)
   - Select an appropriate subscription tier
   - Complete the payment process

### For Developers (Testing)

If you're just testing the API, you can use our sandbox environment. Visit our [Sandbox Environment Guide](https://chimoney.readme.io/reference/sandbox-environment) to get started.

## API Key Authentication

### Obtaining Your API Key

Once your account is approved, you can find your API key in the Chimoney developer dashboard. Two types of keys are provided:
- **Test API Key**: For development and testing
- **Live API Key**: For production use

### Using Your API Key

Include your API key in the `Authorization` header of all requests:

```bash
# Example curl request
curl -X POST https://api.chimoney.io/v0.2/payment/initiate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "USD"
  }'
```

### Sample Response

```json
{
  "status": 200,
  "data": {
    "id": "pay_123xyz",
    "status": "pending"
  }
}
```

## Security Best Practices

1. **Protect Your API Keys**
   - Never expose API keys in client-side code
   - Store keys in environment variables
   - Don't commit API keys to version control

2. **Key Management**
   - Rotate API keys periodically
   - Use different keys for development and production
   - Revoke compromised keys immediately

3. **Environment Variables Example**
   ```bash
   # .env file
   CHIMONEY_API_KEY=your_api_key_here
   ```

## Error Handling

### Common Authentication Errors

1. **401 Unauthorized**
   ```json
   {
     "status": 401,
     "error": "Invalid API key provided"
   }
   ```
   *Solution*: Verify your API key is correct and properly formatted in the Authorization header

2. **403 Forbidden**
   ```json
   {
     "status": 403,
     "error": "Insufficient permissions"
   }
   ```
   *Solution*: Ensure your account has the necessary permissions for the requested operation

## Code Examples

### Node.js
```javascript
const axios = require('axios');

const chimoneyAPI = axios.create({
  baseURL: 'https://api.chimoney.io/v0.2/',
  headers: {
    'Authorization': `Bearer ${process.env.CHIMONEY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function initiatePayment() {
  try {
    const response = await chimoneyAPI.post('/payment/initiate', {
      amount: 100,
      currency: 'USD'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Authentication error:', error.response.data);
  }
}
```

### Python
```python
import requests
import os

CHIMONEY_API_KEY = os.getenv('CHIMONEY_API_KEY')

headers = {
    'Authorization': f'Bearer {CHIMONEY_API_KEY}',
    'Content-Type': 'application/json'
}

def initiate_payment():
    try:
        response = requests.post(
            'https://api.chimoney.io/v0.2/payment/initiate',
            headers=headers,
            json={
                'amount': 100,
                'currency': 'USD'
            }
        )
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Authentication error: {e}")
```

## Additional Resources

- [API Reference](https://chimoney.readme.io/reference/knowing-the-api)
- [Sandbox Environment](https://chimoney.readme.io/reference/sandbox-environment)
- [Pricing Plans](https://chimoney.io/pricing/)
- [Book a Demo](https://chimoney.io/book-a-demo/)

For additional support or questions, contact support@chimoney.io