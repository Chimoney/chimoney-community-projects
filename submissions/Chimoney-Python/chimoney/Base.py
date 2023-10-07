import json
import os
import requests
from requests.exceptions import ConnectTimeout, ConnectionError
from chimoney.Errors import MissingAuthKeyError


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

        Return:
            The headers for the API request.
        """
        return {
            "Content-Type": self._CONTENT_TYPE,
            "Accept": self._ACCEPT,
            "X-API-KEY": self._CHIMONEY_AUTH_KEY,
        }

    def parse_json(self, response):
        """
        This function parses the JSON response from the API.

        Args:
            respnse(str): The response from the API.

        Returns:
            The parsed JSON response.
        """

        data = response.json()
        return data, response.status_code

    def _url(self, path):
        """
        This function returns the URL for the API request.

        Args:
            path(str): The path for the API request.

        Returns:
            The URL for the API request.
        """
        return self._BASE_URL + path

    def _handle_request(self, method_type, path, data=None, params=None):
        """
        This function handles the requests to the API.

        Args:
            method_type(str): The type of request to make.
            path(str): The path to the API endpoint.
            data(dict): The data to send to the API.
            params(dict): The parameters to send to the API

        Returns:
            The response from the Chi Money API.
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
        except (ConnectTimeout, ConnectionError) as exc:
            raise ConnectTimeout("There was a connection timeout.") or ConnectionError(
                "There was a connection error"
            ) from exc
