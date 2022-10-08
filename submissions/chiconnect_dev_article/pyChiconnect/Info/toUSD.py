import requests

url = "https://api.chimoney.io/v0.2/info/local-amount-in-usd?originCurrency=NGN&amountInOriginCurrency=200000"

headers = {
    "accept": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.get(url, headers=headers)