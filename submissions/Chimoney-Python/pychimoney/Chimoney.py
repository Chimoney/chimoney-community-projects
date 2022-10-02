import requests
from .Info import Info
from .Account import Account


class Chimoney(Account, Info):
    """ """

    def ping(self):
        """
        Ping the API to check if it is up and running.
        """
        return self._handle_request("GET", "")
