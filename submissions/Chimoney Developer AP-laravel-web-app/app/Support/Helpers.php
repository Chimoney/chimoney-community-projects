<?php

if (!function_exists('isAdmin')) {
    function isAdmin()
    {
        return auth()->user()->type == 'admin' ? true : false;
    }
}

if (!function_exists('getCountryCodes')) {
    function getCountryCodes()
    {
        return config('country_code');
    }
}
