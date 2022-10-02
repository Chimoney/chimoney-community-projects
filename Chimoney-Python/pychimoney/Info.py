from pychimoney import BaseAPI


class Info(BaseAPI):
    """
    This class handles the Info API
    """

    def airtime_countries(self):
        """
        This function returns a list of countries that supports airtime.
        """
        return self._handle_request("GET", "/v0.2/info/airtime-countries")

    def assets(self):
        """
        This function returns a list of supported assets.
        """
        return self._handle_request("GET", "/v0.2/info/assets")

    def banks(self, country="NG"):
        """
        This function returns a list of supported banks and banks code.
        """
        if not isinstance(country, str):
            raise TypeError("Country must be a string.")

        if not country:
            raise ValueError("Country is required.")

        return self._handle_request(
            "GET", "/v0.2/info/banks", params={"countryCode": country}
        )

    def currencies(self):
        """
        This function returns a list of supported currencies.
        """
        return self._handle_request("GET", "/v0.2/info/currencies")

    def mobile_money_codes(self):
        """
        This function returns a list of supported mobile money codes.
        """
        return self._handle_request("GET", "/v0.2/info/mobile-money-codes")

    def usd_to_local(self, destination_currency, ammount_in_usd):
        """
        This function returns the equivalent of USD in the destination
        currency.
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
