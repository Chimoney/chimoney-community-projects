<?php

if (!function_exists('isAdmin')){
    function isAdmin(){
        return auth()->user()->type == 'admin' ? true : false;
    }
}