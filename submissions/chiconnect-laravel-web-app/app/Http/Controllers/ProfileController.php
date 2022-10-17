<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\Chiconnect\Wallet;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        return view('profile.index', [
            'users' => User::Latest()->paginate(10)
        ]);
    }

    public function show(User $user)
    {
        return view('profile.show', [
            'user' => $user,
            'wallets' => Wallet::fetchAll($user->sub_account_id),
            'wallet_type' => [
                'airtime' => 'Airtime balance',
                'chi' => 'Flexible balance',
                'momo' => 'Mobile money'
            ]
        ]);
    }

    public function dashboard()
    {
        return view('dashboard', [
            'wallets' => Wallet::fetchAll(auth()->user()->sub_account_id),
            'wallet_type' => [
                'airtime' => 'Airtime balance',
                'chi' => 'Flexible balance',
                'momo' => 'Mobile money'
            ]
        ]);
    }
}
