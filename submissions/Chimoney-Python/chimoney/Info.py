from chimoney import BaseAPI


class Info(BaseAPI):
    """
    This class handles the Info API
    """

    def airtime_countries(self) -> dict:
        """
        This function returns a list of countries that supports airtime.

        Returns:
            dict: The response from the Chimoney API.
        """
        return self._handle_request("GET", "/v0.2/info/airtime-countries")

    def assets(self, country_code: str = None) -> dict:
        """
        This function returns a list of supported assets.

        Args:
            country_code(str, optional): Country Code Symbol e.g. NG, GH

        Return:
            dict: The response from the Chimoney API.
        """
        params = {}

        if country_code:
            params["CountryCode"] = country_code

        return self._handle_request("GET", "/v0.2/info/assets", params=params)

    def banks(self, country="NG") -> dict:
        """
        This function returns a list of supported banks and banks code.

        Args:
            country(str): The country Code.
                Default Country is Nigeria(NG).

        Return:
            dict: The response from the Chi Money API.
        """
        if not isinstance(country, str):
            raise TypeError("Country must be a string.")

        if not country:
            raise ValueError("Country is required.")

        return self._handle_request(
            "GET", "/v0.2/info/country-banks", params={"countryCode": country}
        )

    def local_ammount_in_usd(self, source_currency, ammount_in_local):
        """
        This function returns the equivalent of local currency in USD.

        Args:
            source_currency(str): The source currency.
            ammount_in_local(int): The ammount in local currency.

        Returns:
            dict: The response from the Chi Money API.
        """

        if not isinstance(ammount_in_local, float):
            raise TypeError("Ammount must be an integer.")

        if not isinstance(source_currency, str):
            raise TypeError("Source currency must be a string.")

        if not source_currency and ammount_in_local:
            raise ValueError("Source currency and ammount are required.")

        return self._handle_request(
            "GET",
            "/v0.2/info/local-to-usd",
            params={
                "originCurrency": source_currency,
                "amountInOriginCurrency": ammount_in_local,
            },
        )

    def mobile_money_codes(self):
        """
        This function returns a list of supported mobile money codes.
        """
        return self._handle_request("GET", "/v0.2/info/mobile-money-codes")

    def usd_to_local(self, destination_currency, ammount_in_usd):
        """
        This function returns the equivalent of USD in the destination
        currency.

        Args:
            destination_currency(str): The destination currency e.g. NGN, KES
            ammount_in_usd(int): The ammount in USD.

        Return:
            dict: The response from the Chi Money API.
        """

        if not isinstance(ammount_in_usd, int):
            raise TypeError("Ammount must be an integer.")

        if not isinstance(destination_currency, str):
            raise TypeError("Destination currency must be a string.")

        if not destination_currency and ammount_in_usd:
            raise ValueError("Destination currency and ammount are required.")

        return self._handle_request(
            "GET",
            "/v0.2/info/usd-to-local",
            params={
                "destinationCurrency": destination_currency,
                "amountInUSD": ammount_in_usd,
            },
        )

    def get_exchange_rates(self) -> dict:
        """
        This function returns all the exchanges rates

        Returns:
            dict: The respnse from the Chimoney API
        """
        return self._handle_request("GET", "/v0.2/info/exchange-rates")

    def get_bank_branches(self, bank_code: str) -> dict:
        """
        This function gets a list of branches for a specific bank.

        Args:
            bank_code (str): The code identifying the bank.

        Returns:
            dict: The response from the Chimoney API
        """
        params = {}
        if bank_code:
            params["bankCode"] = bank_code

        return self._handle_request("GET", "/v0.2/info/bank-branches", params=params)

    def verify_bank_account_number(self, account_number: list) -> dict:
        """
        This function verifies bank account numbers.

        Args:
            account_number (list): A list of bank account numbers to be verified.

        Returns:
            dict: The response from the Chimoney API
        """
        params = {}
        if account_number:
            params["verifyAccountNumbers"] = account_number

        return self._handle_request(
            "POST", "/v0.2/info/verify-bank-account-number", params=params
        )
