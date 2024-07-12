<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Support\Chiconnect\Account;
use App\Support\Chiconnect\Wallet;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function topUpForm(User $user)
    {
        return view('account.topup-user', [
            'user' => $user
        ]);
    }

    public function topUp(Request $request)
    {
        $request->validate([
            'amount' => ['required', 'numeric'],
        ]);

        $top_up_user = Account::transfer('', $request->receiver, $request->amount);

        if ($top_up_user) {
            $data = $top_up_user->data;
            Transaction::create([
                'receiver' => $data->receiver,
                'sender' => $data->sender,
                'wallet' => $data->wallet,
                'tnxID' => $data->tnxID,
                'amount' => $data->amount,
            ]);

            return redirect()->back()->with('status', 'Transaction successful');
        }

        return redirect()->back()->with('error', 'Oops, something went wrong')->withInput($request->input());
    }

    public function createTransfer()
    {
        $user = auth()->user();

        return view('transfer.create', [
            'balance' => Wallet::fetchBalance($user->chi_wallet_id, $user->sub_account_id)
        ]);
    }

    public function processTransfer(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'exists:users'],
            'amount' => ['required', 'numeric'],
        ]);

        $receiver = User::where('username', $request->username)->first();

        $send_money = Account::transfer(auth()->user()->sub_account_id, $receiver->sub_account_id, $request->amount);

        if ($send_money) {
            $data = $send_money->data;
            Transaction::create([
                'receiver' => $data->receiver,
                'sender' => $data->sender,
                'wallet' => $data->wallet,
                'tnxID' => $data->tnxID,
                'amount' => $data->amount,
            ]);

            return redirect()->back()->with('status', 'Transaction successful');
        }

        return redirect()->back()->with('error', 'Oops, something went wrong')->withInput($request->input());
    }

    public function transferHistory()
    {
        $user = auth()->user();

        $transfers = Transaction::query()
            ->where('wallet', 'chi')
            ->where(function ($query) use ($user) {
                $query->where('receiver', $user->sub_account_id)
                    ->orWhere('sender', $user->sub_account_id);
            })
            ->with(['from', 'to'])
            ->latest()
            ->paginate(10);

        return view('transfer.history', [
            'transfers' => $transfers
        ]);
    }
}
