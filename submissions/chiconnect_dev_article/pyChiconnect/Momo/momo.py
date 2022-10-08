import requests

url = "https://api.chimoney.io/v0.2/collections/mobile-money/collect"

payload = {
    "tx_ref": "9ae90e01-6609-453c-b4af-8ae230fafc5a",
    "country": "Nigeria",
    "fullname": "John Doe",
    "phone_number": "+234 808 888 8888",
    "currency": "NGN",
    "amount": 100000
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "API_KEY"
}

response = requests.post(url, json=payload, headers=headers)
