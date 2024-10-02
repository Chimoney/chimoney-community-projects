import json
import os
import logging
import time
import requests
from requests.exceptions import ConnectTimeout, HTTPError
from requests.adapters import HTTPAdapter
from urllib3 import Retry
from chimoney.Errors import MissingAuthKeyError

logging.basicConfig(level=logging.INFO)

class APIResponse:
    """
    A class to represent the response from the API.

    This class is used to encapsulate the data returned from the API request,
    along with its status code, success status, and any potential error messages.

    Attributes:
        data (dict or None): The data returned from the API, typically in JSON format.
        status_code (int): The HTTP status code of the API response.
        success (bool): A flag indicating whether the API request was successful (default is True).
        error (str or None): An optional error message, populated if the request failed.

    Args:
        data (dict or None): The data returned from the API.
        status_code (int): The HTTP status code of the response.
        success (bool): A flag indicating whether the request was successful (default is True).
        error (str or None): An error message if the request failed (default is None).
    """
    def __init__(self, data, status_code, success=True, error=None):
        self.data = data
        self.status_code = status_code
        self.success = success
        self.error = error

class BaseAPI(object):
    """
    This class handles the requests to the API.
    """

    _PRODUCTION_BASE_URL = "https://api.chimoney.io"
    _SANDBOX_BASE_URL = "https://api-v2-sandbox.chimoney.io"
    _CONTENT_TYPE = "application/json"
    _ACCEPT = "application/json"

    def __init__(self):
        """
        Initialize the BaseAPI object.

        Args:
            sandbox (bool): Set to True to use the sandbox environment.
        """
        self._sandbox = os.getenv("CHIMONEY_SANDBOX", "").lower() == "true"
        self.base_url = (
            self._SANDBOX_BASE_URL if self._sandbox else self._PRODUCTION_BASE_URL
        )

        self._chimoney_auth_key = os.getenv("CHIMONEY_AUTH_KEY")
        if self._chimoney_auth_key is None:
            raise MissingAuthKeyError("Missing CHIMONEY_AUTH_KEY environment variable.")
        self._default_timeout = 10

        self.session = requests.Session()
        retries = Retry(total=3, backoff_factor=0.3, status_forcelist=[500, 502, 503, 504])
        self.session.mount("https://", HTTPAdapter(max_retries=retries))

    def headers(self):
        """
        This function returns the headers for the API request.

        Return:
            The headers for the API request.
        """
        return {
            "Content-Type": self._CONTENT_TYPE,
            "Accept": self._ACCEPT,
            "X-API-KEY": self._chimoney_auth_key,
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
        return self.base_url + path

    def _handle_request(self, method_type, path, data=None, params=None, timeout=None):
        """
        Handle requests to the API.

        Args:
            method_type (str): The type of request to make.
            path (str): The path to the API endpoint.
            data (dict): The data to send to the API.
            params (dict): The parameters to send to the API.

        Returns:
            dict: The response from the Chi Money API.
        """

        # if data:
        #     payload = json.dumps(data)
        # else:
        #     payload = None

        logging.info("Request: %s %s | Data: %s | Params: %s",
                      method_type, self._url(path), data, params)


        payload = json.dumps(data) if data else None
        timeout = timeout or self._default_timeout

        try:
            response = requests.request(
                method=method_type,
                url=self._url(path),
                headers=self.headers(),
                data=payload,
                params=params,
                timeout=timeout
            )
            response.raise_for_status()

            # if response.status_code == 400:
            #     return self.parse_json(response)
            # elif response.status_code in [200, 201]:
            #     return self.parse_json(response)
            # elif response.status_code == 404:
            #     response = {"error": "BUG FIX ME", "status": 404}
            #     return response
            # else:
            #     return self.parse_json(response)

            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 60))
                logging.warning("Rate limit exceeded. Retrying after %d seconds.", retry_after)
                time.sleep(retry_after)
                return self._handle_request(method_type, path, data, params, timeout)

            logging.info("Response: %d | %s", response.status_code, response.json())
            return APIResponse(data=response.json(), status_code=response.status_code)
        except HTTPError as http_err:
            logging.error("HTTP error occurred: %s", http_err)
            return APIResponse(data=None,
                               status_code=response.status_code, success=False, error=str(http_err))
        except (ConnectTimeout, ConnectionError) as exc:
            raise ConnectTimeout("There was a connection timeout.") or ConnectionError(
                "There was a connection error"
            ) from exc
        except Exception as err:
            logging.error("Other error occurred: %s", err)
            raise
