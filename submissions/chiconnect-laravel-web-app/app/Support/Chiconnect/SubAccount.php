<?php

namespace App\Support\Chimoney Developer API;

use Illuminate\Support\Facades\Http;

class SubAccount
{
    public static function create(string $name, string $email)
    {
        $response =  Http::withHeaders([
            'X-API-KEY' => config('chimoney.api_key'),
            'accept' => 'application/json',
            'content-type' => 'application/json',
        ])->post('https://api.chimoney.io/v0.2/sub-account/create', [
            'name' => $name,
            'email' => $email
        ]);

        if($response->status() == 200){
            return json_decode($response)->data->uid;
        }

        return null;
    }
}