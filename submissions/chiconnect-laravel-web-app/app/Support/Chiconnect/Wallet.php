<?php

namespace App\Support\Chimoney Developer API;

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

    public static function fetchType(string $type, string $sub_account)
    {
        $wallets = self::fetchAll($sub_account);
        
        return collect($wallets)->where('type', $type)->first();
    }

    public static function fetchBalance(string $wallet_id, string $sub_account)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/wallets/lookup', [
            'subAccount' => $sub_account,
            'walletID' => $wallet_id
        ]);

        return json_decode($response)->data->balance ?? 0;
    }
}