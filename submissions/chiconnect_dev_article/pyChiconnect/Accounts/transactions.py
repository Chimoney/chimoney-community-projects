import requests

url = "https://api.chimoney.io/v0.2/accounts/transactions?id=(transaction_id)"

headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.post(url, headers=headers)