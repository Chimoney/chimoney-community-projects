from chimoney import BaseAPI

class AI(BaseAPI):
    def invoice_gen(self, instruction: str):
        if not instruction:
            raise ValueError("Instruction is required")

        payload = {
            "instruction": instruction
        }

        return self._handle_request("POST", "/v0.2/ai/invoice/generate", payload)
