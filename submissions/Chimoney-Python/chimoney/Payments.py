# from Base import APIResponse
from chimoney import BaseAPI

class Payments(BaseAPI):
    """
    Chimoney's Payment Wrapper
    """

    def initiate_payment(
            self,
            value_in_usd,
            payer_email,
            currency,
            amount,
            redirect_url,
            wallet_id,
            narration,
            sub_account,
            meta: dict,
            turn_off_notification: bool
            ) -> dict:
        """
        This endpoint allows you to request for funds from another party 
        by initiating a payment request via Chimoney.
        """

        payload = {
            "value_in_usd": value_in_usd,
            "payer_email": payer_email,
            "currency": currency,
            "amount": amount,
            "redirectURL": redirect_url,
            "WalletID": wallet_id,
            "narration": narration,
            "subAccount": sub_account,
            "meta": meta,
            "turnOffNotification": turn_off_notification
        }

        return self._handle_request("POST", "/v0.2/payment/initiate", payload)

    def verify_payment(self, sub_account, payment_id):

        payload = {}
        if not payment_id:
            raise ValueError("id is required")

        payload = {"id": payment_id}
        if sub_account:
            payload["subAccount"] = sub_account


        return self._handle_request("POST", "/v0.2/payment/verify", payload)

    def simulate_transaction(self, issue_id, status, sub_account):
        if not issue_id and status:
            raise ValueError("IssueID and Status are required")
        
        payload = {
            "issueID": issue_id,
            "status": status,
            "subAccount": sub_account
        }

        return self._handle_request("POST", "/v0.2/payment/simulate", payload)