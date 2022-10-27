<?php

namespace App\Support\Chiconnect;

use Illuminate\Support\Facades\Http;

class Account
{
    public static function transfer(string $from = null, string $to, string $amount, string $wallet = 'chi')
    {
        $payload = [
            'receiver' => $to,
            'amount' => $amount,
            'wallet' => $wallet
        ];

        if ($from) {
            $payload['subAccount'] = $from;
        }

        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/accounts/transfer', $payload);

        if ($response->status() == 200) {
            return json_decode($response)->data;
        }

        return false;
    }

    public static function getWallets(string $sub_account)
    {
        $payload = ['id' => $sub_account];

        $response = Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->get('https://api.chimoney.io/v0.2/sub-account/get', $payload);

        if ($response->status() == 200) {
            return json_decode($response)->data->wallets;
        }

        return false;
    }

    public static function getWalletByType(string $type, string $sub_account)
    {
        if (!in_array($type, ['chi', 'airtime', 'momo'])) {
            return false;
        }

        return collect(self::getWallets($sub_account))->where('type', $type)->first() ?? false;
    }
}
