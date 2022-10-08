import requests

url = "https://api.chimoney.io/v0.2/info/usd-amount-in-local?destinationCurrency=NGN&amountInUSD=50000"

headers = {
    "accept": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.get(url, headers=headers)