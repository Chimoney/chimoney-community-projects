"""
Chimoney API Integration

This module provides a Python wrapper for the Chi Money API, enabling access to 
various functionalities such as retrieving account information, handling payouts, 
managing wallets, and redeeming rewards. The module also includes support for both 
production and sandbox environments, making it suitable for testing and live deployments.

Classes:
    Chimoney: This is the root API class that provides access to different services
                (Info, Account, Payouts, SubAccount, Wallet, Redeem) of the Chimoney API.

Functions:
    set_api_key(cls, auth_key): 
        A class method of Chimoney that sets the API key needed for authentication
          with the Chi Money API.

Modules used:
    os: Used for managing environment variables to set the API key and enable sandbox mode.
    chimoney.Info, chimoney.Account, chimoney.Payouts, chimoney.SubAccount,
      chimoney.Wallet, chimoney.Redeem: 
        These are specific modules that interact with the corresponding endpoints
          of the Chi Money API.
    
Environment Variables:
    CHIMONEY_AUTH_KEY: The API key required to authenticate requests to the Chi Money API.
    CHIMONEY_SANDBOX: An optional variable that, when set to "True", directs the 
                        API requests to the sandbox environment.
    
Example usage:
    # Initialize the Chimoney API in production mode
    chi_api = Chimoney()
    
    # Set the API key
    Chimoney.set_api_key('your_api_key')

    # Initialize the Chimoney API in sandbox mode
    chi_api_sandbox = Chimoney(sandbox=True)
"""

import os
from chimoney import Info, Account, Payouts, SubAccount, Wallet, Redeem


class Chimoney:
    """
    The root API class for interacting with the Chi Money API.

    This class serves as the entry point to access various API functionalities such as 
    retrieving information, managing accounts, processing payouts, handling subaccounts,
    managing wallets, and redeeming rewards.It initializes and exposes instances of the 
    respective API modules (Info, Account, Payouts, SubAccount, Wallet, Redeem).

    Attributes:
        info (Info): Provides access to information-related API operations.
        account (Account): Manages account-related operations.
        payouts (Payouts): Handles payout-related operations.
        subaccount (SubAccount): Manages subaccount-related operations.
        wallet (Wallet): Manages wallet operations.
        redeem (Redeem): Manages reward redemption-related operations.

    Args:
        sandbox (bool): Determines whether to use the sandbox environment.
                        If True, it sets the CHIMONEY_SANDBOX
                        environment variable to True, directing API requests 
                        to the sandbox environment. The default is False.

    Methods:
        set_api_key(cls, auth_key):
            Class method that sets the API key for authenticating requests to the Chi Money API.

            Args:
                auth_key (str): The API key for authenticating requests.

            Returns:
                Chimoney: An instance of the Chimoney class with the specified API key.
    """

    def __init__(self, sandbox=False):
        self.info = Info()
        self.account = Account()
        self.payouts = Payouts()
        self.subaccount = SubAccount()
        self.wallet = Wallet()
        self.redeem = Redeem()

        if sandbox:
            os.environ["CHIMONEY_SANDBOX"] = "True"

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
