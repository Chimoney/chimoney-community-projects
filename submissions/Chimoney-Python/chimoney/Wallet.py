from chimoney import BaseAPI


class Wallet(BaseAPI):
    """
    This class handles the Wallet API of Chimoney
    """

    def list(self, subaccount=None):
        """
        This functions returns all associated wallets

        Args:
            subaccount(str): The subaccount to be used.

        Return:
            JSON response from Chimoney API
        """
        payload = {}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallet", payload)

    def detials(self, wallet_id, subaccount=None):
        """
        The function returns single wallet details

        Args:
            wallet_id(str): The wallet id(required)
            subaccount(str): The subaccount to be used

        Returns:
            JSON response form the Chimoney API
        """
        if not id:
            raise ValueError("id is required")

        payload = {"id": wallet_id}
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallet", payload)

    def transfer(self, receiver_id, wallet_type, amount, subaccount=None):
        """
        This function handles transfers between wallets

        Args:
            reciever_id(str): Valid Chimoney User or Organization ID.(required)
            wallet_type: Wallet type[chi, momo, airtime]
            amount(str): Amount in USD(required)
            subaccount(str): The subaccount to be used

        Returns:
            JSON response from Chimoney API
        """
        if not receiver_id:
            raise ValueError("reciver_id is required")

        if not wallet_type:
            raise ValueError("wallet_type is required")

        if not amount:
            raise ValueError("amount is required")

        payload = {
            "reciver_id": receiver_id,
            "wallet_type": wallet_type,
            "amount": amount,
        }
        if subaccount:
            payload["subaccount"] = subaccount

        return self._handle_request("POST", "/v0.2/wallets/transfer", payload)
