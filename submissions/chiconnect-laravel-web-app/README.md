<p align="center">
<img src="/api/placeholder/400/100" alt="Chimoney Laravel SDK Logo" width="400">
</p>

<p align="center">
<a href="https://packagist.org/packages/chimoney/laravel-sdk"><img src="https://img.shields.io/packagist/v/chimoney/laravel-sdk" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/chimoney/laravel-sdk"><img src="https://img.shields.io/packagist/l/chimoney/laravel-sdk" alt="License"></a>
<a href="https://packagist.org/packages/chimoney/laravel-sdk"><img src="https://img.shields.io/packagist/dt/chimoney/laravel-sdk" alt="Total Downloads"></a>
</p>

## About Chimoney Laravel SDK

The Chimoney Laravel SDK provides a seamless integration of Chimoney's payment and disbursement services into your Laravel applications. With expressive syntax and robust features, this SDK makes it easy to integrate Chimoney's services into your Laravel projects.

## Installation

You can install the Chimoney Laravel SDK via Composer. Run the following command in your terminal:

```bash
composer require chimoney/laravel-sdk
```

### Laravel Version Compatibility

This package requires Laravel 8.0 or higher.

### Publishing the Configuration

After installation, publish the configuration file using:

```bash
php artisan vendor:publish --provider="Chimoney\Laravel\ChimoneyServiceProvider"
```

## Configuration

### Environment Variables

Add the following variables to your `.env` file:

```env
CHIMONEY_API_KEY=your_api_key_here
CHIMONEY_ENVIRONMENT=sandbox # or production
```

### Configuration File

The configuration file `config/chimoney.php` allows you to customize the SDK settings:

```php
return [
    'api_key' => env('CHIMONEY_API_KEY'),
    'environment' => env('CHIMONEY_ENVIRONMENT', 'sandbox'),
    'timeout' => 30,
    'debug' => false
];
```

## Basic Usage

### Initialization

```php
use Chimoney\Laravel\Facades\Chimoney;

// The SDK is automatically initialized using your configuration
```

### Making API Requests

#### Check Account Balance

```php
try {
    $response = Chimoney::getBalance();
    $balance = $response->data->balance;
} catch (ChimoneyException $e) {
    // Handle any errors
    echo $e->getMessage();
}
```

#### Initiate a Payment

```php
try {
    $payment = Chimoney::initiatePayment([
        'valueInUSD' => 100,
        'email' => 'recipient@example.com',
        'paymentType' => 'bank',
        'bankDetails' => [
            'accountNumber' => '0123456789',
            'bankCode' => 'EXAMPLE_BANK'
        ]
    ]);
    
    $transactionId = $payment->data->id;
} catch (ChimoneyException $e) {
    // Handle any errors
    echo $e->getMessage();
}
```

#### Send Airtime

```php
try {
    $airtime = Chimoney::sendAirtime([
        'phone' => '+2341234567890',
        'valueInUSD' => 10,
        'country' => 'NG'
    ]);
    
    $status = $airtime->data->status;
} catch (ChimoneyException $e) {
    // Handle any errors
    echo $e->getMessage();
}
```

## Advanced Usage

### Webhook Handling

Register the webhook handler in your `routes/web.php`:

```php
use Chimoney\Laravel\Facades\Chimoney;

Route::post('/webhooks/chimoney', function (Request $request) {
    return Chimoney::handleWebhook($request);
});
```

### Event Listening

Listen for Chimoney events in your `EventServiceProvider`:

```php
protected $listen = [
    'chimoney.payment.successful' => [
        PaymentSuccessfulListener::class,
    ],
    'chimoney.payment.failed' => [
        PaymentFailedListener::class,
    ],
];
```

## Testing

### Setting Up Tests

1. Install PHPUnit in your project if not already installed:
```bash
composer require --dev phpunit/phpunit
```

2. Create a test configuration file:
```bash
php artisan make:test ChimoneyTest
```

### Example Test Case

```php
namespace Tests\Feature;

use Tests\TestCase;
use Chimoney\Laravel\Facades\Chimoney;

class ChimoneyTest extends TestCase
{
    public function test_can_get_balance()
    {
        $response = Chimoney::getBalance();
        
        $this->assertIsObject($response);
        $this->assertObjectHasAttribute('data', $response);
        $this->assertObjectHasAttribute('balance', $response->data);
    }
}
```

### Running Tests

```bash
php artisan test
```

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - Ensure your API key is correctly set in the `.env` file
   - Verify you're using the correct environment (sandbox/production)

2. **Request Timeout**
   - Adjust the timeout in `config/chimoney.php` if needed
   - Check your network connection

3. **Invalid Response Format**
   - Enable debug mode in configuration
   - Check the API documentation for expected request formats

### Debug Mode

Enable debug mode in your configuration to get detailed error information:

```php
// config/chimoney.php
'debug' => true
```

## Contributing

Thank you for considering contributing to the Chimoney Laravel SDK! Please review our [contribution guidelines](CONTRIBUTING.md) before submitting pull requests.

## Security Vulnerabilities

If you discover a security vulnerability within the Chimoney Laravel SDK, please send an email to security@chimoney.io. All security vulnerabilities will be promptly addressed.

## License

The Chimoney Laravel SDK is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
