from chimoney import BaseAPI


class Payouts(BaseAPI):
    """
    This Wraps the Payouts API of Chi Money
    """

    def airtime(self, airtimes, subaccount=None, turn_off_notification=None):
        """
        This function handles the airtime API.

        Args:
            airtimes(list, required): A list of dictionaries containing the airtime details.
            subaccount(str): The subaccount to use.
            turn_off_notificaiton(bool): None by default

        example:
            airtime = [
                {
                   countryToSend: "Nigeria",
                   phoneNumber: "+2348123456789",
                   valueInUSD: 123
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if not isinstance(airtimes, list):
            raise ValueError("airtimes must be a list of dictionaries")

        payload = {"airtimes": airtimes}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification

        return self._handle_request("POST", "/v0.2/payouts/airtime", data=payload)

    def bank(self, banks, subaccount=None, turn_off_notification=None):
        """
        This function handles the bank API.

        Args:
            banks(list, required): A list of dictionaries containing the bank details.
            subaccount(str): The subaccount to use.
            turn_off_notificaiton(bool): None by default

        example:
            banks = [
                {
                    "countryToSend": "Nigeria",
                    "account_bank": "044",
                    "account_number": "0690000031",
                    "valueInUSD": 1,
                    "reference": "1234567890",
                    "fullname": "James John",
                    "branch_code": "GH190101"
                }
            ]

        Returns:
            The JSON response from the Chi Money API.
        """

        if not isinstance(banks, list):
            raise ValueError("banks must be a list of dictionaries")

        payload = {"banks": banks}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification

        return self._handle_request("POST", "/v0.2/payouts/bank", data=payload)

    def chimoney(self, chimoneys, subaccount=None, turn_off_notification=None):
        """
        This function handles the chimoney API.

        Args:
            chimoneys(list, required): A list of dictionaries containing the chimoney details.
            subaccount(str): The subaccount to use.
            turn_off_notification(bool): None by Default

        example:
            chimoneys = [
                {
                    "valueInUSD": 1,
                    "email": "test@example.com",
                    "phone": "+2341234567890",
                }
            ]

        Return:
        The response from the Chi Money API.
        """

        if not isinstance(chimoneys, list):
            raise ValueError("chimoney must be a list of dictionaries")

        payload = {"chimoneys": chimoneys}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification

        return self._handle_request("POST", "/v0.2/payouts/chimoney", data=payload)

    def mobile_money(self, momos, subaccount=None, turn_off_notification=None):
        """
        This function handles the mobile money API.

        Args:
            momos(list): A list of dictionaries containing the mobile money details.
            subaccount(str): The subaccount to be used.
            turn_off_notification(bool): None by Default

        example:
            momos = [
                {
                    "countryToSend": "Nigeria",
                    "phoneNumber": "+2348123456789",
                    "valueInUSD": 1,
                    "reference": "1234567890",
                    "momoCode": "MPS"
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if not isinstance(momos, list):
            raise ValueError("mobile_money must be a list of dictionaries")

        payload = {"momos": momos}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification

        return self._handle_request("POST", "/v0.2/payouts/mobile-money", data=payload)

    def gift_card(self, gift_cards, subaccount=None, turn_off_notification=None):
        """
        This function handles the gift card API.

        Args:
            gift_cards(list): A list of dictionaries containing the gift card details.
            subaccount(str): The subaccount to use.
            turn_off_notification(bool): None by Default.

        example:
            gift_cards = [
                {
                    "email": "test@example.com",
                    "valueInUSD": 1,
                    "redeemData": {
                        "productId": 5,
                        "countryCode": "NG"
                        "valueInLocalCurrency": 1000
                    }
                }
            ]

        Return:
            The JSON response from the Chi Money API.
        """

        if not isinstance(gift_cards, list):
            raise ValueError("gift_cards must be a list of dictionaries")

        payload = {"giftcards": gift_cards}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification

        return self._handle_request("POST", "/v0.2/payouts/gift-card", data=payload)

    def status(self, chi_ref, subaccount=None):
        """
        This function handles the status API.

        Args:
            chi_ref(str): The Chi Money reference.
            subaccount(str): The subaccount to use.

        Return:
            dict: The response from the Chimoney API.
        """

        if not chi_ref:
            raise ValueError("chi_ref is required")

        payload = {"chiRef": chi_ref}
        if subaccount:
            payload["subAccount"] = subaccount

        return self._handle_request("POST", "/v0.2/payouts/status", data=payload)

    def initiate_chimoney(
        self,
        chimoneys,
        crypto_payments=None,
        subaccount=None,
        turn_off_notification=None,
        redirect_url=None,
        enable_xumm_payment=None,
        enable_interledger_payment=None,
    ):
        """
        This function handles the initiate chimoney API.

        example:
            chimoneys = [
                {
                    "email": "test@example",
                    "phone": "+16471112222",
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
            chimoneys(list, required): A list of dictionaries containing the chimoney details.
            crypto_payments(list): A list of dictionaries containing the crypto payment details.
            subaccount(str): The subaccount to be used.
            turn_off_notification(bool): None by Default.
            redirect_url(str): The URL to redirect to after payment is confirmed.
            enable_xumm_payment(bool): To generate a XUMM transaction sign link.
            enable_interledger_payment(bool): To generate an Open Payment
              payment request to pay with Interledger.

        Return:
            dict: The response from the Chi Money API.
        """

        if not isinstance(chimoneys, list):
            raise ValueError("chimoneys must be a list of dictionaries")

        if not isinstance(crypto_payments, list):
            raise ValueError("crypto_payments must be a list of dictionaries")

        payload = {"chimoneys": chimoneys, "cryptoPayment": crypto_payments}
        if subaccount:
            payload["subAccount"] = subaccount
        if turn_off_notification is not None:
            payload["turnOffNotification"] = turn_off_notification
        if redirect_url:
            payload["redirect_url"] = redirect_url
        if enable_xumm_payment:
            payload["enableXUMMPayment"] = enable_xumm_payment
        if enable_interledger_payment:
            payload["enableInterledgerPayment"] = enable_interledger_payment

        return self._handle_request(
            "POST", "/v0.2/payouts/initiate-chimoney", data=payload
        )

    def wallet(self, subaccount=None, turn_off_notifications=None, wallets=None):
        """
        The function handles the payout to Chimoney Wallet

        Args:
            subaccount(str): The subaccount to be used.
            turn_off_notification(bool): None by default
            wallets(list, required): A list of dictionaries containing wallet details

        Returns:
            dict: The response from Chimoney API
        """

        if not isinstance(wallets, list):
            return ValueError("wallets must be a list of dictionaries")

        payload = {"wallets": wallets}
        if subaccount:
            payload["subAccount"] = subaccount

        if turn_off_notifications is not None:
            payload["turnOffNotifications"] = turn_off_notifications

        return self._handle_request("POST", "/v0.2/payouts/wallet", data=payload)
