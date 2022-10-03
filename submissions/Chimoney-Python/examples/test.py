import os
import pychimoney

os.environ[
    "CHIMONEY_AUTH_KEY"
] = "API_KEY"

chimoney = pychimoney.Chimoney()

chimoneys = [
    {"email": "sammyboy.as@gmail.com", "valueInUSD": 1, "twitter": "@thelimeskies"}
]

if __name__ == "__main__":
    print(chimoney.ping())
    print(chimoney.payouts.initiate_chimoney(chimoneys=chimoneys))
