<?php

namespace App\Support\Chimoney Developer API;

use Illuminate\Support\Facades\Http;

class Payout
{
    public static function Airtime(string $sub_account, string $country, string $phone, string $valueInUSD)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/payouts/airtime', [
            'subAccount' => $sub_account,           // alaklsjfal-asdfl-asdf-asf
            'airtimes' => [
                [
                    'countryToSend' => $country,    // Nigeria
                    'phoneNumber' => $phone,        // +2345678909876
                    'valueInUSD' => $valueInUSD,    // >= 1
                ]
            ]
        ]);

        if ($response->status() == 200) {
            return json_decode($response)->data->data;
        }

        return false;
    }

    public static function Bank(string $sub_account, string $country, string $bank_code, string $account_number, string $valueInUSD, string $reference)
    {
        // dd($sub_account, $country, $bank_code, $account_number, $valueInUSD, $reference);
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/payouts/bank', [
            'subAccount' => $sub_account,
            'banks' => [
                [
                    'countryToSend' => $country,             // Nigeria
                    'account_bank' => $bank_code,            // 058 for Guaranty Trust Bank
                    'account_number' => $account_number,     // 0234567890
                    'valueInUSD' => $valueInUSD,             // >= 1
                    'reference' => $reference                //{generated uuid}

                ]
            ]
        ]);

        if ($response->status() == 200) {
            return json_decode($response)->data->chimoneys;
        }

        return false;
    }

    public static function Status(string $sub_account, string $chiRef)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/payouts/status', [
            'subAccount' => $sub_account,
            'chiRef' => $chiRef
        ]);

        if ($response->status() == 200) {
            return json_decode($response)->data;
        }

        return false;

        // SAMPLE RESPONSE

        // AIRTIME
        // {
        //     "status": "success",
        //     "data": {
        //       "id": "hPbvs2CICyWpArWCxJba",
        //       "chimoney": 1000,
        //       "payout": {
        //         "phoneNumber": "+234567890343",
        //         "errorMessage": "None",
        //         "status": "Sent",
        //         "amount": "NGN 550.0000",
        //         "requestId": "ATQid_2222f6beff1d2f4c5cd99e9f2d9f17c6"
        //       },
        //       "enabledToRedeem": [
        //         "airtime"
        //       ],
        //       "valueInUSD": 1,
        //       "chiRef": "84cacc48-1da9-4d89-b93a-e89705d946c5",
        //       "integration": {
        //         "appID": "pIsRyLXuKHBVlWzdVAYb"
        //       },
        //       "type": "airtime",
        //       "countryToSend": "Nigeria",
        //       "issueID": "d6e267f7-c4c5-435a-8f2a-0ee413026dfc_1_1666296502376",
        //       "phoneNumber": "+23456789086",
        //       "issuer": "d6e267f7-c4c5-435a-8f2a-0ee413026dfc",
        //       "status": "redeemed",
        //       "issueDate": "2022-10-20T20:08:26.280Z"
        //     }
        //   }
        //
        // BANK
        // {
        //     "status": "success",
        //     "data": {
        //       "id": "asdfasfadfaf",
        //       "status": "redeemed",
        //       "valueInUSD": 1,
        //       "chimoney": 1000,
        //       "countryToSend": "Nigeria",
        //       "account_bank": "058",
        //       "payout": {
        //         "account_number": "02423423424",
        //         "is_approved": 1,
        //         "currency": "NGN",
        //         "bank_name": "GTBANK PLC",
        //         "status": "SUCCESSFUL",
        //         "complete_message": "Transaction was successful",
        //         "amount": 550,
        //         "created_at": "2022-10-20T20:16:50.000Z",
        //         "id": 35627209,
        //         "meta": {
        //           "valueInUSD": 1,
        //           "type": "bank",
        //           "chiRef": "b7f64d59-c521-4fe3-a756-26ac83d55002",
        //           "country": "NG",
        //           "currency": "NGN"
        //         },
        //         "fullname": "LAST_NAME, FIRST_NAME OTHER_NAMES",
        //         "reference": "b7f64d59-c521-4fe3-a756-26ac83d55002_1666297009694",
        //         "bank_code": "058",
        //         "requires_approval": 0
        //       },
        //       "integration": {
        //         "appID": "pIsRyLXuKHBVlWzdVAYb"
        //       },
        //       "issueID": "d6e267f7-c4c5-435a-8f2a-0ee413026dfc_1_1666297006803",
        //       "type": "bank",
        //       "enabledToRedeem": [
        //         "bank"
        //       ],
        //       "fee": 0,
        //       "account_number": "20040439434",
        //       "issuer": "d6e267f7-c4c5-435a-8f2a-0ee413026dfc",
        //       "chiRef": "b7f64d59-c521-4fe3-a756-26ac83d55002",
        //       "issueDate": "2022-10-20T20:16:51.359Z"
        //     }
        //   }
    }
}
