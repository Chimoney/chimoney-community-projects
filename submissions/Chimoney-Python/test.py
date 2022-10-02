import requests
import json

BASE_URL = "https://api.chimoney.io/"

response = requests.request("GET", BASE_URL, headers={"Content-Type": "application/json", "Accept": "application/json", "Authorization": "Bearer YOUR_API_KEY"})
print(response.json())
