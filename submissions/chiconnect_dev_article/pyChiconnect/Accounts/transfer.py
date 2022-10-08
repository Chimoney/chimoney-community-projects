import requests

url = "https://api.chimoney.io/v0.2/accounts/transfer"

payload = {
    "receiver": "92769",
    "amount": 200000,
    "wallet": "chiWallet",
    "subAccount": "1234567"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
