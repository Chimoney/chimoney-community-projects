import requests

url = "https://api.chimoney.io/v0.2/info/airtime-countries"

headers = {
    "accept": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.get(url, headers=headers)