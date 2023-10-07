from chimoney import BaseAPI


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

        Args:
            issue_id (str): The issue ID of the transaction.
            sub_account (str):  The sub account of the transaction.

        Returns:
            The JSON response fron the Chimoney API
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

        Args:
            sub_account(str): The sub account of the transaction.

        Returns:
            The JSON response from the Chimoney API
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

        Args:
            transaction_id(str): The ID of the transaction.
            sub_account(str): The sub account of the transaction.

        Returns:
            The JSON response from the Chimoney API
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

        Args:
            reciever(str): The receiver of the funds.
            amount(float): The amount of the funds.
            wallet(str): The wallet of the funds.
            sub_aacount(str): The sub account of the transaction.

        Returns:
            The JSON response from Chimoney API
        """
        if not isinstance(receiver, str):
            raise TypeError("Receiver must be a string.")

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

        Args:
            transaction_id(str): The ID of the transaction.
            sub_account(str): The sub account of the transaction

        Returns:
            The JSOn response from the Chimoney API
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
