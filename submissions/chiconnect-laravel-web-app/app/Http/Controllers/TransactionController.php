<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function wallet($wallet)
    {
        $user = auth()->user();
        $wallet_type = $this->wallet_type($wallet);

        $transactions = Transaction::query()
            ->where('wallet', $wallet_type)
            ->where(function ($query) use ($user) {
                $query->where('receiver', $user->sub_account_id)
                    ->orWhere('sender', $user->sub_account_id);
            })
            ->with(['from', 'to'])
            ->latest()
            ->paginate(10);

        return view('transaction.wallet', [
            'wallet' => $wallet,
            'transactions' => $transactions
        ]);
    }

    private function wallet_type($type)
    {
        $wallets = [
            'flexible' => 'chi',
            'momo' => 'momo',
            'airtime' => 'airtime'
        ];

        return key_exists($type, $wallets) ? $wallets[$type] : 'chi';
    }
}
