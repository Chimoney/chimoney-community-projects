from chimoney import BaseAPI


class Payouts(BaseAPI):
    """
    This Wraps the Payouts API of Chi Money
    """

    def airtime(self, airtimes=None, subaccount=None):
        """
        This function handles the airtime API.

        Args:
            airtimes(list): A list of dictionaries containing the airtime details.
            subaccount(str): The subaccount to use.

        example:
            airtime = [
                {
                   countryToSend: "Nigeria",
                   phoneNumber: "+2348123456789",
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if airtimes is None:
            airtimes = []

        if not airtimes:
            raise ValueError("airtime must be a list of dictionaries")

        payload = {"airtime": airtimes}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/airtime", data=payload)

    def bank(self, banks=None, subaccount=None):
        """
        This function handles the bank API.

        Args:
            banks(list): A list of dictionaries containing the bank details.
            subaccount(str): The subaccount to use.

        example:
            banks = [
                {
                    "countryToSend": "Nigeria",
                    "account_bank": "044",
                    "account_number": "0690000031",
                    "valueInUSD": 1,
                    reference: "1234567890"
                }
            ]

        Returns:
            The JSON response from the Chi Money API.
        """

        if banks is None:
            banks = []

        if not banks:
            raise ValueError("bank must be a list of dictionaries")

        payload = {"bank": banks}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/bank", data=payload)

    def chimoney(self, chimoneys=None, subaccount=None):
        """
        This function handles the chimoney API.

        Args:
            chimoneys(list): A list of dictionaries containing the chimoney details.
            subaccount(str): The subaccount to use.

        example:
            chimoneys = [
                {
                    "valueInUSD": 1,
                    "email": "test@example.com",
                    "twitter": "@test",
                }
            ]

        Return:
        The response from the Chi Money API.
        """

        if chimoneys is None:
            chimoneys = []

        if not chimoneys:
            raise ValueError("chimoney must be a list of dictionaries")

        payload = {"chimoney": chimoneys}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/chimoney", data=payload)

    def mobile_money(self, momos=None, subaccount=None):
        """
        This function handles the mobile money API.

        Args:
            momos(list): A list of dictionaries containing the mobile money details.
            subaccount(str): The subaccount to be used.

        example:
            momos = [
                {
                    "countryToSend": "Nigeria",
                    "phoneNumber": "+2348123456789",
                    "valueInUSD": 1,
                    "reference": "1234567890"
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if momos is None:
            momos = []

        if not momos:
            raise ValueError("mobile_money must be a list of dictionaries")

        payload = {"mobile_money": momos}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/mobile-money", data=payload)

    def gift_card(self, gift_cards=None, subaccount=None):
        """
        This function handles the gift card API.

        Args:
            gift_cards(list): A list of dictionaries containing the gift card details.
            subaccount(str): The subaccount to use.

        example:
            gift_cards = [
                {
                    "email": "test@example.com",
                    "valueInUSD": 1,
                    "redeemData": {
                        "productId": "5",
                        "countryCode": "NG"
                        "valueInLocalCurrency": 1000
                    }
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if gift_cards is None:
            gift_cards = []

        if not gift_cards:
            raise ValueError("gift_card must be a list of dictionaries")

        payload = {"gift_card": gift_cards}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/gift-card", data=payload)

    def status(self, chi_ref, subaccount=None):
        """
        This function handles the status API.

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not chi_ref:
            raise ValueError("chi_ref is required")

        payload = {"chiRef": chi_ref}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/status", data=payload)

    def initiate_chimoney(self, chimoneys=None, crypto_payments=None, subaccount=None):
        """
        This function handles the initiate chimoney API.

        example:
            chimoneys = [
                {
                    "email": "test@example",
                    "valueInUSD": 1,
                    "twitter": "@test"
                }
            ]

            crypto_payments = [
                {
                    "xrpl": {
                        "address": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
                        "issuer": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
                        "currency": "XRP"
                    }
                }
            ]

        Args:
            chimoneys(list): A list of dictionaries containing the chimoney details.
            crypto_payments(list): A list of dictionaries containing the crypto payment details.
            subaccount(str): The subaccount to be used.

        Return:
            The response from the Chi Money API.
        """

        if chimoneys is None:
            chimoneys = []

        if crypto_payments is None:
            crypto_payments = []

        if not chimoneys:
            raise ValueError("chimoneys must be a list of dictionaries")

        payload = {"chimoneys": chimoneys}
        if crypto_payments:
            payload["crypto_payments"] = crypto_payments
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request(
            "POST", "/v0.2/payouts/initiate-chimoney", data=payload
        )
