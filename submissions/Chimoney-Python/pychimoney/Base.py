import json
import os
import requests
from requests.exceptions import ConnectTimeout, ConnectionError
from pychimoney.Errors import MissingAuthKeyError


class BaseAPI(object):
    """
    This function handles the requests to the API.
    """

    _BASE_URL = "https://api.chimoney.io"
    _CONTENT_TYPE = "application/json"
    _ACCEPT = "application/json"

    def __init__(self):
        self._CHIMONEY_AUTH_KEY = os.getenv("CHIMONEY_AUTH_KEY")
        if self._CHIMONEY_AUTH_KEY is None:
            raise MissingAuthKeyError("Missing CHIMONEY_AUTH_KEY environment variable.")

    def headers(self):
        """
        This function returns the headers for the API request.

        :return: The headers for the API request.
        """
        return {
            "Content-Type": self._CONTENT_TYPE,
            "Accept": self._ACCEPT,
            "X-API-KEY": self._CHIMONEY_AUTH_KEY,
        }

    def parse_json(self, response):
        """
        This function parses the JSON response from the API.

        :param response: The response from the API.
        :type response: dict
        :return: The parsed JSON response.
        """

        data = response.json()
        return data, response.status_code

    def _url(self, path):
        """
        This function returns the URL for the API request.

        :param path: The path for the API request.
        :type path: str
        :return: The URL for the API request.
        """
        return self._BASE_URL + path

    def _handle_request(self, method_type, path, data=None, params=None):
        """
        This function handles the requests to the API.

        :param method_type: The type of request to make.
        :type method_type: str
        :param path: The path to the API endpoint.
        :type path: str
        :param data: The data to send to the API.
        :type data: dict
        :param params: The parameters to send to the API
        :type params: dict
        :return: The response from the Chi Money API.
        """

        if data:
            payload = json.dumps(data)
        else:
            payload = None

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
            elif response.status_code == 404:
                response = {"error": "BUG FIX ME", "status": 404}
                return response
            else:
                return self.parse_json(response)
        except ConnectTimeout:
            raise ConnectTimeout("Connection timed out.")
        except ConnectionError:
            raise ConnectionError("Connection error.")
