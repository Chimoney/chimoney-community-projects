from chimoney import BaseAPI


class SubAccount(BaseAPI):
    """"""

    def create(self, email, name):
        """"""
        if not email:
            raise ValueError("email is required")

        if not name:
            raise ValueError("name is required")

        payload = {"email": email, "name": name}

        return self._handle_request("POST", "/v0.2/subaccount", payload)

    def delete(self, id):
        if not id:
            raise ValueError("id is required")

        payload = {"id": id}

        return self._handle_request("DELETE", "/v0.2/subaccount", payload)

    def get_detials(self, id):
        if not id:
            raise ValueError("id is required")

        payload = {"id": id}

        return self._handle_request("GET", "/v0.2/subaccount", payload)

    def list(self):
        return self._handle_request("GET", "/v0.2/subaccount/list")
