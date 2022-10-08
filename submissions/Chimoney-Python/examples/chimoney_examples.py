import os
from chimoney import Chimoney

os.environ["CHIMONEY_AUTH_KEY"] = "API_KEY"

chimoney = Chimoney()


def test():
    (data, status) = chimoney.ping()
    return data


def avaliable_countries():
    return chimoney.airtime_countries()


if __name__ == "__main__":
    print(test())
    print(avaliable_countries())
