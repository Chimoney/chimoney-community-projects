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
        $user = auth()->user();
        $balance = null;

        if (is_null($user->chi_wallet_id)) {
            $wallet = Wallet::fetchType('chi', $user->sub_account_id);

            User::find($user->id)->update([
                'chi_wallet_id' => $wallet->id
            ]);

            $balance = $wallet->balance;
        }

        return view('dashboard', [
            'balance' => $wallet->balance ?? Wallet::fetchBalance($user->chi_wallet_id, $user->sub_account_id)
        ]);
    }
}
