<?php

namespace App\Http\Controllers;

use App\Models\Payout;
use App\Support\Chiconnect\Wallet;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    public function history()
    {
        return view('payout.history', [
            'payouts' => Payout::where('issuer', auth()->user()->sub_account_id)->latest()->paginate(10)
        ]);
    }

    public function createAirtime()
    {
        $user = auth()->user();

        return view('payout.airtime', [
            'balance' => Wallet::fetchBalance($user->chi_wallet_id, $user->sub_account_id)
        ]);
    }

    public function createBank()
    {
        $user = auth()->user();

        return view('payout.bank', [
            'balance' => Wallet::fetchBalance($user->chi_wallet_id, $user->sub_account_id)
        ]);
    }
}
