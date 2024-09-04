<?php

namespace App\Support\Chiconnect;

use Illuminate\Support\Facades\Http;

class Info
{
    public static function AirtimeCountries()
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->get('https://api.chimoney.io/v0.2/info/airtime-countries');

        if ($response->status() == 200) {
            return json_decode($response)->data;
        }

        return [];
    }

    public static function CountryBanks(string $country_code)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->get('https://api.chimoney.io/v0.2/info/country-banks', [
            'countryCode' => $country_code
        ]);

        if ($response->status() == 200) {
            return json_decode($response)->data;
        }

        return [];
    }

    public static function VerifyAccountNumber(string $country_code, string $bank_code, string $account)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/info/verify-bank-account-number', [
            'verifyAccountNumbers' => [
                [
                    'countryCode' => $country_code,
                    'account_bank' => $bank_code,
                    'account_number' => $account
                ]
            ]
        ]);

        if ($response->status() == 200) {
            return json_decode($response);
        }

        return false;
    }
}
