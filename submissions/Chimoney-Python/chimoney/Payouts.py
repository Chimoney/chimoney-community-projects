from chimoney import BaseAPI


class Payouts(BaseAPI):
    """
    This Wraps the Payouts API of Chi Money
    """

    def airtime(self, airtimes=[], subaccount=None):
        """
        This function handles the airtime API.

        example:
            airtime = [
                {
                   countryToSend: "Nigeria",
                   phoneNumber: "+2348123456789",
                }
            ]

        :param airtimes: A list of dictionaries containing the airtime details.
        :type airtimes: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not airtimes:
            raise ValueError("airtime must be a list of dictionaries")

        payload = {"airtime": airtimes}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/airtime", data=payload)

    def bank(self, banks=[], subaccount=None):
        """
        This function handles the bank API.

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

        :param banks: A list of dictionaries containing the bank details.
        :type banks: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not banks:
            raise ValueError("bank must be a list of dictionaries")

        payload = {"bank": banks}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/bank", data=payload)

    def chimoney(self, chimoneys=[], subaccount=None):
        """
        This function handles the chimoney API.

        example:
            chimoneys = [
                {
                    "valueInUSD": 1,
                    "email": "test@example.com",
                    "twitter": "@test",
                }
            ]

        :param chimoneys: A list of dictionaries containing the chimoney details.
        :type chimoneys: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not chimoneys:
            raise ValueError("chimoney must be a list of dictionaries")

        payload = {"chimoney": chimoneys}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/chimoney", data=payload)

    def mobile_money(self, momos=[], subaccount=None):
        """
        This function handles the mobile money API.

        example:
            momos = [
                {
                    "countryToSend": "Nigeria",
                    "phoneNumber": "+2348123456789",
                    "valueInUSD": 1,
                    "reference": "1234567890"
                }
            ]

        :param momos: A list of dictionaries containing the mobile money details.
        :type momos: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not momos:
            raise ValueError("mobile_money must be a list of dictionaries")

        payload = {"mobile_money": momos}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/mobile-money", data=payload)

    def gift_card(self, gift_cards=[], subaccount=None):
        """
        This function handles the gift card API.

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

        :param gift_cards: A list of dictionaries containing the gift card details.
        :type gift_cards: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not gift_cards:
            raise ValueError("gift_card must be a list of dictionaries")

        payload = {"gift_card": gift_cards}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/gift-card", data=payload)

    def status(self, chiRef, subaccount=None):
        """
        This function handles the status API.

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        if not chiRef:
            raise ValueError("chiRef is required")

        payload = {"chiRef": chiRef}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/status", data=payload)

    def initiate_chimoney(self, chimoneys=[], crypto_payments=[], subaccount=None):
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

        :param chimoneys: A list of dictionaries containing the chimoney details.
        :type chimoneys: list
        :param crypto_payments: A list of dictionaries containing the crypto payment details.
        :type crypto_payments: list
        :param subaccount: The subaccount to use.
        :type subaccount: str
        :return: The response from the Chi Money API.
        """

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
