import os
from pychimoney import Chimoney

chimoney = Chimoney.set_api_key("API_KEY")

chimoneys = [
    {
        "email": "test@email.com",
        "valueInUSD": 1,
        "twitter": "@thelimeskies"
    }
]

if __name__ == "__main__":
    # print(chimoney.ping()) # TODO: Add ping function to pychimoney
    print(chimoney.payouts.initiate_chimoney(chimoneys=chimoneys))
