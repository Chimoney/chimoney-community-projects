from pychimoney import BaseAPI


class Account(BaseAPI):
    """ """

    def trasactions_by_issue_id(self, issue_id, sub_account=None):
        """
        This function returns a list of transactions by issue ID.
        """
        if not isinstance(issue_id, str):
            raise TypeError("Issue ID must be a string.")

        if not issue_id:
            raise ValueError("Issue ID is required.")

        payload = {"subAccount": sub_account}
        if issue_id:
            params = {"issueID": issue_id}

        return self._handle_request(
            "GET", "/v0.2/account/transactions", params=params, data=payload
        )

    def all_transaction(self, sub_account=None):
        """
        This function returns a list of transactions by account.
        """
        payload = {"subAccount": sub_account}

        return self._handle_request(
            "GET",
            "/v0.2/account/transactions",
            data=payload,
        )

    def transaction_by_id(self, transaction_id, sub_account=None):
        """
        This function returns a transaction by ID.
        """
        if not isinstance(transaction_id, str):
            raise TypeError("Transaction ID must be a string.")

        if not transaction_id:
            raise ValueError("Transaction ID is required.")

        payload = {"subAccount": sub_account}
        if transaction_id:
            params = {"id": transaction_id}

        return self._handle_request(
            "GET", "/v0.2/accounts/transaction", params=params, data=payload
        )

    def account_transfer(self, reciver, amount, wallet, sub_account=None):
        """
        This function transfers funds from one account to another.
        """
        if not isinstance(reciver, str):
            raise TypeError("Reciver must be a string.")

        if not isinstance(amount, int):
            raise TypeError("Amount must be an integer.")

        if not isinstance(wallet, str):
            raise TypeError("Wallet must be a string.")

        if not reciver and amount and wallet:
            raise ValueError("Reciver, amount and wallet are required.")

        payload = {
            "subAccount": sub_account,
            "reciver": reciver,
            "amount": amount,
            "wallet": wallet,
        }

        return self._handle_request(
            "POST",
            "/v0.2/accounts/transfer",
            data=payload,
        )

    def delete_unpaid_transaction(self, transaction_id, sub_account=None):
        """
        This function deletes an unpaid transaction.
        """
        if not isinstance(transaction_id, str):
            raise TypeError("Transaction ID must be a string.")

        if not transaction_id:
            raise ValueError("Transaction ID is required.")

        params = {"chiRef": transaction_id, "subAccount": sub_account}
        return self._handle_request(
            "DELETE", "/v0.2/accounts/delete-unpaid-transaction", params=params
        )
