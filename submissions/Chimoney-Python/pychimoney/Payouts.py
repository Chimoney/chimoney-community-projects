from pychimoney import BaseAPI


class Payouts(BaseAPI):
    """ """
    def airtime(self, airtimes=[], subaccount=None):
        """ """

        if not airtimes:
            raise ValueError("airtime must be a list of dictionaries")

        payload = {"airtime": airtimes}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/airtime", payload)

    def bank(self, banks=[], subaccount=None):
        """ """

        if not bank:
            raise ValueError("bank must be a list of dictionaries")

        payload = {"bank": banks}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/bank", payload)

    def chimoney(self, chimoneys=[], subaccount=None):
        """ """

        if not chimoneys:
            raise ValueError("chimoney must be a list of dictionaries")

        payload = {"chimoney": chimoneys}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/chimoney", payload)

    def mobile_money(self, momos=[], subaccount=None):
        """ """

        if not momos:
            raise ValueError("mobile_money must be a list of dictionaries")

        payload = {"mobile_money": momos}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/mobile_money", payload)

    def gift_card(self, gift_cards=[], subaccount=None):
        """ """

        if not gift_cards:
            raise ValueError("gift_card must be a list of dictionaries")

        payload = {"gift_card": gift_cards}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/gift_card", payload)

    def status(self, chiRef, subaccount=None):
        """ """

        if not chiRef:
            raise ValueError("chiRef is required")

        payload = {"chiRef": chiRef}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/status", payload)

    def initiate_chimoney(self, chimoneys=[], crypto_payments=[], subaccount=None):
        """ """

        if not chimoneys:
            raise ValueError("chimoneys must be a list of dictionaries")

        payload = {"chimoney": chimoneys}
        if crypto_payments:
            payload["crypto_payments"] = crypto_payments
        if subaccount:
            payload["subaccount"] = subaccount

        return self._post("/v0.2/payouts/initiate_chimoney", payload)