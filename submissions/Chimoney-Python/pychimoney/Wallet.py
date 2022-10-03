from pychimoney import BaseAPI


class Wallet(BaseAPI):
    """"""

    def list(self, subaccount=None):
        """"""
        payload = {}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallet", payload)

    def detials(self, id, subaccount=None):
        """"""
        if not id:
            raise ValueError("id is required")

        payload = {"id": id}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallet", payload)

    def transfer(self, reciver_id, wallet_type, amount, subaccount=None):
        """"""
        if not reciver_id:
            raise ValueError("reciver_id is required")

        if not wallet_type:
            raise ValueError("wallet_type is required")

        if not amount:
            raise ValueError("amount is required")

        payload = {
            "reciver_id": reciver_id,
            "wallet_type": wallet_type,
            "amount": amount,
        }
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallets/transfer", payload)
