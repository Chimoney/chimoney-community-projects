from chimoney import BaseAPI

class AI(BaseAPI):
    """
    A class that extends the BaseAPI class to handle AI-based invoice generation requests.

    Methods:
    --------
    invoice_gen(instruction: str) -> dict
        Generates an invoice based on a given instruction.
    """
    def invoice_gen(self, instruction: str):
        """
        Generates an invoice by sending a POST request with the given instruction to the AI endpoint.

        Parameters:
        -----------
        instruction : str
            A description or set of details required to generate the invoice. It should specify key elements
            like items, quantities, prices, and any additional instructions for the invoice layout.

        Returns:
        --------
        dict
            A dictionary containing the response from the invoice generation API, which includes details of the generated invoice.

        Raises:
        -------
        ValueError
            If the 'instruction' parameter is empty or None.
        """
        if not instruction:
            raise ValueError("Instruction is required")

        payload = {
            "instruction": instruction
        }

        return self._handle_request("POST", "/v0.2/ai/invoice/generate", payload)
