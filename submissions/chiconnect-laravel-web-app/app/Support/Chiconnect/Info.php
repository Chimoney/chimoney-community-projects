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

        if($response->status() == 200){
            return json_decode($response)->data;
        }

        return [];
    }
}