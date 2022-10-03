from pychimoney import Info, Account, Payouts, SubAccount, Wallet, Redeem, BaseAPI


class Chimoney(BaseAPI):
    """
    Root API

    This is the root API for the Chi Money API.
    """

    def __init__(self):
        super().__init__()
        self.info = Info()
        self.account = Account()
        self.payouts = Payouts()
        self.subaccount = SubAccount()
        self.wallet = Wallet()
        self.redeem = Redeem()

    def ping(self):
        """
        Ping the API to check if it is up and running.

        :return: The response from the Chi Money API.
        :rtype: dict
        """
        return self._handle_request("GET", "")
