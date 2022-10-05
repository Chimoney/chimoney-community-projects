from pychimoney import BaseAPI


class Redeem(BaseAPI):
    """
    This a Wrapper for the Redeem API of Chi Money
    """

    def airtime(
        self, chiRef, phone_number, country_to_send, test=False, sub_account=None
    ):
        """
        This function handles the airtime API.

        required:
            chiRef: The Chi Money reference for the transaction.
            test: A boolean to indicate if the transaction is a test.

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param phone_number: The phone number to send the airtime to.
        :type phone_number: str
        :param country_to_send: The country to send the airtime to.
        :type country_to_send: str
        :param test: Whether to use the test environment.
        :type test: bool
        :param sub_account: The subaccount to use.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """

        payload = {
            "chiRef": chiRef,
            "phoneNumber": phone_number,
            "countryToSend": country_to_send,
            "meta": {"test": test},
        }
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/airtime", payload)

    def any(
        self,
        chiRef,
        redeem_data: list,
        test=False,
        sub_account=None,
    ):
        """
        This function handles the any API.

        required:
            chiRef: The Chi Money reference for the transaction.
            redeem_data: A list of dictionaries containing the redeem details.
            test: A boolean to indicate if the transaction is a test.

        example:
            redeem_data = [
                {
                    "countryCode": "NG",
                    "productId": 1,
                    "valueInLocalCurrency": 1000,
                }
            ]

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param redeem_data: A list of dictionaries containing the redeem details.
        :type redeem_data: list
        :param test: Whether to use the test environment.
        :type test: bool
        :param sub_account: The subaccount to use.
        :type sub_account: str
        :return: The response from the Chi Money API.
        """

        payload = {
            "chiRef": chiRef,
            "redeemData": redeem_data,
            "meta": {"test": test},
        }
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/any", payload)

    def chimoney(self, chimoneys, sub_account=None):
        """
        This function handles the initiate chimoney API.

        required:
            chimoneys: A list of dictionaries containing the redeem details.

        example:
            chimoneys = {
                {
                    "object": "chimoney",
                }
            }

        :param chimoneys: A list of dictionaries containing the redeem details.
        :type chimoneys: dict
        :param sub_account: The subaccount to use.
        :type sub_account: str
        :return: The response from the Chi Money API.
        """

        if not chimoneys:
            raise ValueError("chimoneys must be a list of dictionaries")

        payload = {"chimoneys": chimoneys}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/chimoney", payload)

    def giftcard(self, chiRef, redeem_options, sub_account=None):
        """
        This function handles the giftcard API.

        required:
            chiRef: The Chi Money reference for the transaction.
            redeem_options: A list of dictionaries containing the redeem details.

        example:
            redeem_options = {
                {
                    "object": "giftcard",
                }
            }

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param redeem_options: A list of dictionaries containing the redeem details.
        :type redeem_options: dict
        :param sub_account: The subaccount to use.
        :type sub_account: str
        :return: The response from the Chi Money API.
        """

        payload = {"chiRef": chiRef, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._post("/v0.2/redeem/gift-card", payload)

    def mobile_money(self, chiRef, redeem_options, sub_account=None):
        """
        This function handles the mobile money API.

        required:
            chiRef: The Chi Money reference for the transaction.
            redeem_options: A list of dictionaries containing the redeem details.

        example:
            redeem_options = {
                {
                    "object": "mobile_money",
                }
            }

        :param chiRef: The Chi Money reference.
        :type chiRef: str
        :param redeem_options: A list of dictionaries containing the redeem details.
        :type redeem_options: dict
        :param sub_account: The subaccount to use.
        :type sub_account: str
        :return: The response from the Chi Money API.
        """

        payload = {"chiRef": chiRef, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/mobile-money", payload)
