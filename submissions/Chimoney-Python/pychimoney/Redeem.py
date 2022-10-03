from pychimoney import BaseAPI


class Redeem(BaseAPI):
    """ """

    def airtime(
        self, chiRef, phone_number, country_to_send, test=False, sub_account=None
    ):
        """ """

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
        country_code,
        product_id,
        value_in_local_currency,
        test=False,
        sub_account=None,
    ):
        """ """

        payload = {
            "chiRef": chiRef,
            "redeemData": {
                "countryCode": country_code,
                "productId": product_id,
                "valueInLocalCurrency": value_in_local_currency,
            },
            "meta": {"test": test},
        }
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/any", payload)

    def chimoney(self, chimoneys=[], sub_account=None):
        """ """

        if not chimoneys:
            raise ValueError("chimoneys must be a list of dictionaries")

        payload = {"chimoneys": chimoneys}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/chimoney", payload)

    def giftcard(self, chiRef, redeem_options={}, sub_account=None):
        """ """

        payload = {"chiRef": chiRef, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._post("/v0.2/redeem/giftcard", payload)

    def mobile_money(self, chiRef, redeem_options={}, sub_account=None):
        """ """

        payload = {"chiRef": chiRef, "redeemOptions": redeem_options}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request("POST", "/v0.2/redeem/mobile_money", payload)
