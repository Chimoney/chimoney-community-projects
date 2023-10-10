from chimoney import BaseAPI


class Redeem(BaseAPI):
    """
    This is a Wrapper for the Redeem API of Chimoney
    """

    def airtime(
        self, chi_ref, phone_number, country_to_send, test=False, sub_account=None
    ):
        """
        This function handles the airtime API.

        Args:
            chi_ref(str): The Chimoney reference for the transaction.
            phone_number(str): The phone number to send the airtime to.
            country_to_send(str): The country to send the airtime to.
            test(bool): A boolean to indicate if the transaction is a test.
            sub_account(str): The subaccount to be used.

        Return:
            The JSON response from the Chimoney API.
        """

        payload = {
            "chiRef": chi_ref,
            "phoneNumber": phone_number,
            "countryToSend": country_to_send,
            "meta": {"test": test},
        }
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/airtime", payload)

    def any(
        self,
        chi_ref,
        redeem_data: list,
        test=False,
        sub_account=None,
    ):
        """
        This function handles the any API.

        Args:
            chi_ref(str): The Chi Money reference for the transaction.
            redeem_data(list): A list of dictionaries containing the redeem details.
            test(bool): A boolean to indicate if the transaction is a test.
            sub_account(str): The subaccount to be used.

        example:
            redeem_data = [
                {
                    "countryCode": "NG",
                    "productId": 1,
                    "valueInLocalCurrency": 1000,
                }
            ]

        Return:
            The JSON response from the Chimoney API.
        """

        payload = {
            "chiRef": chi_ref,
            "redeemData": redeem_data,
            "meta": {"test": test},
        }
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/any", payload)

    def chimoney(self, chimoneys, sub_account=None):
        """
        This function handles the initiate chimoney API.

        Args:
            chimoneys(dict): A list of dictionaries containing the redeem details.
            sub_account(str): The subaccount to use.

        example:
            chimoneys = {
                {
                    "object": "chimoney",
                }
            }

        Return:
            The JSON response from the Chi Money API.
        """

        if not chimoneys:
            raise ValueError("chimoneys must be a list of dictionaries")

        payload = {"chimoneys": chimoneys}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/chimoney", payload)

    def giftcard(self, chi_ref, redeem_options, sub_account=None):
        """
        This function handles the giftcard API.

        Args:
            chi_ref(str): The Chi Money reference for the transaction.
            redeem_options(dict): A list of dictionaries containing the redeem details.
            sub_account(str): The subaccount to be used.

        example:
            redeem_options = {
                {
                    "object": "giftcard",
                }
            }

        Return:
            The JSON response from the Chimoney API.
        """

        payload = {"chiRef": chi_ref, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("/v0.2/redeem/gift-card", payload)

    def mobile_money(self, chi_ref, redeem_options, sub_account=None):
        """
        This function handles the mobile money API.

        Args:
            chi_ref(str): The Chi Money reference for the transaction.
            redeem_options(dict): A list of dictionaries containing the redeem details.
            sub_account(str): The subaccount to use.

        example:
            redeem_options = {
                {
                    "object": "mobile_money",
                }
            }

        Return:
            The JSON response from the Chi Money API.
        """

        payload = {"chiRef": chi_ref, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/mobile-money", payload)
