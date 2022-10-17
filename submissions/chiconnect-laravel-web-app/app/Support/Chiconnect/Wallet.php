<?php

namespace App\Support\Chiconnect;

use Illuminate\Support\Facades\Http;

class Wallet
{
    public static function fetchAll(string $sub_account)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/wallets/list', [
            'subAccount' => $sub_account,
        ]);

        if($response->status() == 200){
            return json_decode($response)->data;
        }

        return [];
    }
}