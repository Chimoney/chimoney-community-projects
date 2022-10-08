import requests

url = "https://api.chimoney.io/v0.2/collections/mobile-money/verify"

payload = {"id": "934557832q349043i4"}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
