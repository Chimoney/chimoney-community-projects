import json
import os

import requests
from requests.exceptions import ConnectTimeout, ConnectionError, ReadTimeout

from pychimoney.Errors import MissingAuthKeyError


class BaseAPI(object):
    _BASE_URL = "https://api.chimoney.io/v0.2/"
    _CONTENT_TYPE = "application/json"

    def __init__(self):
        self._CHIMONEY_AUTH_KEY = os.environ.get("CHIMONEY_AUTH_KEY")
        if self._CHIMONEY_AUTH_KEY is None:
            raise MissingAuthKeyError("CHIMONEY_AUTH_KEY is not set.")

    def headers(self):
        return {
            "Content-Type": self._CONTENT_TYPE,
            "Authorization": self._CHIMONEY_AUTH_KEY,
        }

    def parse_json(self, response):
        """
        This function parses the JSON response from the API.
        """

        data = response.json()
        return data, response.status_code

    def _url(self, path):
        return self._BASE_URL + path

    def _handle_request(self, method_type, path, data=None, params=None):
        """
        This function handles the requests to the API.
        """

        payload = json.dumps({"code": data})

        try:
            response = requests.request(
                method=method_type,
                url=self._url(path),
                headers=self.headers(),
                data=payload,
                params=params,
            )

            if response.status_code == 400:
                return self.parse_json(response)
            elif response.status_code in [200, 201]:
                return self.parse_json(response)
            else:
                return self.parse_json(response)
        except ConnectTimeout:
            raise ConnectTimeout("Connection timed out.")
        except ConnectionError:
            raise ConnectionError("Connection error.")
