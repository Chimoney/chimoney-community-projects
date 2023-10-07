from chimoney import BaseAPI


class Info(BaseAPI):
    """
    This class handles the Info API
    """

    def airtime_countries(self):
        """
        This function returns a list of countries that supports airtime.

        Returns:
            The response from the Chimoney API.
        """
        return self._handle_request("GET", "/v0.2/info/airtime-countries")

    def assets(self):
        """
        This function returns a list of supported assets.

        Return:
            The response from the Chi Money API.
        """
        return self._handle_request("GET", "/v0.2/info/assets")

    def banks(self, country="NG"):
        """
        This function returns a list of supported banks and banks code.

        Args:
            country(str): The country Code.
                Default Country is Nigeria(NG).

        Return:
            The response from the Chi Money API.
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
            The response from the Chi Money API.
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
            destination_currency(str): The destination currency.
            ammount_in_usd(int): The ammount in USD.

        Return:
            The response from the Chi Money API.
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
