import requests

url = "https://api.chimoney.io/v0.2/accounts/issue-id-transactions?issueID=9ae90e01-6609-453c-b4af-8ae230fafc5a"

payload = {"subAccount": "1234567"}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
