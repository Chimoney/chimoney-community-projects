import requests

url = "https://api.chimoney.io/v0.2/accounts/delete-unpaid-transaction?chiRef=9ae90e01-6609-453c-b4af-8ae230fafc5a&subAccount=123456789"

headers = {
    "accept": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.delete(url, headers=headers)