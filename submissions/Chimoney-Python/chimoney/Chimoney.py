import os
from chimoney import Info, Account, Payouts, SubAccount, Wallet, Redeem


class Chimoney:
    """
    Root API

    This is the root API for the Chi Money API.
    """

    def __init__(self):
        self.info = Info()
        self.account = Account()
        self.payouts = Payouts()
        self.subaccount = SubAccount()
        self.wallet = Wallet()
        self.redeem = Redeem()

    @classmethod
    def set_api_key(cls, auth_key):
        """
        This function sets the API key for the Chi Money API.

        Args:
            auth_key(str): The API key for the Chi Money API.

        Return:
            The Chi Money API object.
        """
        os.environ["CHIMONEY_AUTH_KEY"] = auth_key
        # return an instance of the Chimoney class
        return Chimoney()

    # def ping(self):
    #     """
    #     Ping the API to check if it is up and running.

    #     :return: The response from the Chi Money API.
    #     :rtype: dict
    #     """
    #     return self._handle_request("GET", "")
