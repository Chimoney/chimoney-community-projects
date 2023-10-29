from chimoney import BaseAPI


class SubAccount(BaseAPI):
    """
    This is a Wrapper for the SubAccount API of Chimoney
    """

    def create(self, email, name):
        """
        The function creates the user for the subaccount

        Args:
            email(str): The email of the user
            name(str): The name of the user

        Return:
            The JSON response from the Chimoney API
        """
        if not email:
            raise ValueError("email is required")

        if not name:
            raise ValueError("name is required")

        payload = {"email": email, "name": name}

        return self._handle_request("POST", "/v0.2/subaccount", payload)

    def delete(self, user_id):
        """
        The function deletes the user via it's id

        Args:
            user_id(str): The user's id

        Return:
            The JSON response from the Chimoney API
        """
        if not id:
            raise ValueError("id is required")

        payload = {"id": user_id}

        return self._handle_request("DELETE", "/v0.2/subaccount", payload)

    def get_detials(self, user_id):
        """
        The function gets the user details

        Args:
            user_id(str): The user's id

        Return:
            The JSON response from the Chimoney API
        """
        if not id:
            raise ValueError("id is required")

        payload = {"id": user_id}

        return self._handle_request("GET", "/v0.2/subaccount", payload)

    def list(self):
        """
        This function lists out all the subaccounts
        """
        return self._handle_request("GET", "/v0.2/subaccount/list")
