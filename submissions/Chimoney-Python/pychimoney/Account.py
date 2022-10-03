from pychimoney import BaseAPI


class Account(BaseAPI):
    """
    Account Endpoints Wrapper

    This class wraps the Account endpoints of the Chi Money API.

    list of endpoints:
        - transactions_by_issue_id
        - all_transaction
        - transaction_by_id
        - account_transfer
        - delete_unpaid_transaction
    """

    def trasactions_by_issue_id(self, issue_id, sub_account=None) -> dict:
        """
        This function returns a list of transactions by issue ID.

        :param issue_id: The issue ID of the transaction.
        :type issue_id: str
        :param sub_account: The sub account of the transaction.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """
        if not isinstance(issue_id, str):
            raise TypeError("Issue ID must be a string.")

        if not issue_id:
            raise ValueError("Issue ID is required.")

        params = {"issueId": issue_id}
        payload = {}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request(
            "POST", "/v0.2/accounts/issue-id-transactions", params=params, data=payload
        )

    def all_transaction(self, sub_account=None) -> dict:
        """
        This function returns a list of transactions by account.

        :param sub_account: The sub account of the transaction.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """
        payload = {}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request(
            "POST",
            "/v0.2/accounts/transactions",
            data=payload,
        )

    def transaction_by_id(self, transaction_id, sub_account=None) -> dict:
        """
        This function returns a transaction by ID.

        :param transaction_id: The ID of the transaction.
        :type transaction_id: str
        :param sub_account: The sub account of the transaction.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """
        if not isinstance(transaction_id, str):
            raise TypeError("Transaction ID must be a string.")

        if not transaction_id:
            raise ValueError("Transaction ID is required.")

        params = {"id": transaction_id}
        payload = {}
        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request(
            "GET", "/v0.2/accounts/transaction", params=params, data=payload
        )

    def account_transfer(self, receiver, amount, wallet, sub_account=None) -> dict:
        """
        This function transfers funds from one account to another.

        :param receiver: The receiver of the funds.
        :type receiver: str
        :param amount: The amount of the funds.
        :type amount: float
        :param wallet: The wallet of the funds.
        :type wallet: str
        :param sub_account: The sub account of the transaction.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """
        if not isinstance(reciver, str):
            raise TypeError("Reciver must be a string.")

        if not isinstance(amount, int):
            raise TypeError("Amount must be an integer.")

        if not isinstance(wallet, str):
            raise TypeError("Wallet must be a string.")

        if not receiver and amount and wallet:
            raise ValueError("Reciver, amount and wallet are required.")

        payload = {
            "receiver": receiver,
            "amount": amount,
            "wallet": wallet,
        }

        if sub_account:
            payload["subAccount"] = sub_account

        return self._handle_request(
            "POST",
            "/v0.2/accounts/transfer",
            data=payload,
        )

    def delete_unpaid_transaction(self, transaction_id, sub_account=None):
        """
        This function deletes an unpaid transaction.

        :param transaction_id: The ID of the transaction.
        :type transaction_id: str
        :param sub_account: The sub account of the transaction.
        :type sub_account: str
        :return: The response from the Chi Money API.
        :rtype: dict
        """
        if not isinstance(transaction_id, str):
            raise TypeError("Transaction ID must be a string.")

        if not transaction_id:
            raise ValueError("Transaction ID is required.")

        params = {"chiRef": transaction_id}

        if sub_account:
            params["subAccount"] = sub_account
        return self._handle_request(
            "DELETE", "/v0.2/accounts/delete-unpaid-transaction", params=params
        )
