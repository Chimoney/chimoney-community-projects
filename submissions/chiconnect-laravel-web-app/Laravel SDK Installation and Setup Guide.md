# Chimoney Laravel SDK Installation and Setup Guide

## Installation
Installation Instructions:

 ### Prerequisites:
- **PHP**: Ensure your Laravel project is using PHP version 7.4 or higher.
- **Composer**: Make sure Composer is installed. You can verify by running `composer -v` in your terminal.
- **Laravel Framework**: Your project should be using Laravel version 8.x or higher.

### Step 1: Install via Composer
In your Laravel project directory, run the following command to install the Chimoney SDK:

`composer require chimoney/laravel-sdk`

### Step 2: Publish Configuration
After installing the package, you need to publish the configuration file. This will allow you to customize the SDK settings (such as API keys) for your application:
Publish the package configuration file:

`php artisan vendor:publish --provider="Chimoney\Laravel\ChimoneyServiceProvider"`

This command creates a `chimoney.php` `config` file in your config directory.

### Update Environment Variables
You need to add your Chimoney API keys to the `.env `file of your Laravel project. Here's how you should configure it:

```
CHIMONEY_API_KEY=your-chimoney-api-key
CHIMONEY_BASE_URL=https://api.chimoney.io
```
> Replace `your-chimoney-api-key` with the actual API key provided by Chimoney, and ensure the base URL is correct for the environment you're working with.

## Configuration

**Configuration File**
- The configuration file will be published at `config/chimoney.php.`
- You can modify the default settings here:

```
return [
    'api_key' => env('CHIMONEY_API_KEY'),
    'environment' => env('CHIMONEY_ENVIRONMENT', 'sandbox'),
    'timeout' => 30,
    'verify_ssl' => true,
];
```

## Usage Guide

### Authentication

Once the SDK is installed and configured, you can start making requests to the Chimoney API. First, you need to authenticate your API requests using the API key set in your `.env`file.

### Sending Requests
Here’s a simple example to make a request:

1. Initialize the Chimoney Client

In your Laravel controller or service class, you can initialize the Chimoney client like this:

```
use Chimoney\Laravel\Chimoney;

class ChimoneyController extends Controller
{
    protected $chimoney;

    public function __construct(Chimoney $chimoney)
    {
        $this->chimoney = $chimoney;
    }

    public function getBalance()
    {
        // Example: Get account balance
        $response = $this->chimoney->getBalance();

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Failed to retrieve balance.'], 500);
        }
    }
}
```
2. Example of Sending a Payment Request
Example of Sending a Payment Request:

```
public function sendPayment()
{
    $paymentData = [
        'amount' => 100,
        'currency' => 'USD',
        'recipient' => 'recipient@example.com',
    ];

    $response = $this->chimoney->sendPayment($paymentData);

    if ($response->successful()) {
        return response()->json($response->json());
    } else {
        return response()->json(['error' => 'Payment failed.'], 500);
    }
}
```

### Handling Responses
The SDK returns a standard Laravel `Response` object, so you can handle responses as you normally would in Laravel:

```
if ($response->successful()) {
    // Process successful response
} else {
    // Handle error
    $error = $response->json('message');
}
```

## Configuration Details
You can manage the API keys and other configurations in your `.env` file. Below are the configurations that the Chimoney Laravel SDK expects:
- `.env` File Configuration:
```
CHIMONEY_API_KEY=your-chimoney-api-key
CHIMONEY_BASE_URL=https://api.chimoney.io
```
- **Customizing Configurations**
If you need to change the API base URL or other settings, you can update them in the `config/chimoney.php` file:

```
return [
    'api_key' => env('CHIMONEY_API_KEY'),
    'base_url' => env('CHIMONEY_BASE_URL', 'https://api.chimoney.io'),
];
```


## Testing Instructions

To ensure that the Chimoney SDK is installed and configured correctly, follow these steps:

1. Run Basic Tests
After installation, ensure the SDK is functioning by testing the connection to the API. Add a test route in your `routes/web.php` file:

```
use App\Http\Controllers\ChimoneyController;

Route::get('/test-chimoney', [ChimoneyController::class, 'getBalance']);
```
> Visit http://your-app-url/test-chimoney. If the SDK is working, it should return your Chimoney account balance or other test data.

2. Unit Tests
You can write unit tests to check specific SDK functionalities. Here’s an example of how to test the `getBalance` method:

```
public function testChimoneyBalance()
{
    $response = $this->chimoney->getBalance();

    $this->assertTrue($response->successful());
}
```

3. Artisan Command for Testing

If you want to run tests through the CLI, you can use `php artisan test` to run your Laravel test suite and verify that everything is working as expected.

### Sandbox Testing
1. Create a sandbox account at Chimoney Developer Portal.
2. Use the sandbox API key in your `.env file`.
3. Test transactions will not result in actual money movement.

## Troubleshooting
## Common Issues and Solutions

- **API Key Issues**
```
// Verify your API key is properly set
echo config('chimoney.api_key');
```

- **SSL Certificate Issues**
If you encounter SSL verification issues, you can disable SSL verification in the config file (not recommended for production):

```
// config/chimoney.php
return [
    // ...
    'verify_ssl' => false,
];
```
- **Request Timeout**
Adjust the timeout in the configuration if requests are timing out:

```
// config/chimoney.php
return [
    // ...
    'timeout' => 60, // Increase timeout to 60 seconds
];
```

## Error Handling
The SDK throws `ChimoneyException` for API-related errors. Always wrap API calls in try-catch blocks:

```
try {
    $result = Chimoney::someMethod();
} catch (\Chimoney\Laravel\Exceptions\ChimoneyException $e) {
    // Log the error
    \Log::error('Chimoney API Error: ' . $e->getMessage());

    // Get error details
    $statusCode = $e->getCode();
    $errorMessage = $e->getMessage();
    $errorResponse = $e->getResponse();
}
```
By following these steps, you should be able to successfully install, configure, troubleshoot and use the Chimoney Laravel SDK within your Laravel project. For more advanced usage and further API details, refer to the official Chimoney [API documentation](https://chimoney.readme.io/reference/introduction).

*For any additional support, please refer to the official Chimoney documentation or create an issue in the GitHub repository.*






