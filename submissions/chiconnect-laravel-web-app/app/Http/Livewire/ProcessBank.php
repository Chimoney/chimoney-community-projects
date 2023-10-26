<?php

namespace App\Http\Livewire;

use App\Models\Payout as ModelsPayout;
use App\Models\TransactionReference;
use App\Support\Chiconnect\Info;
use App\Support\Chiconnect\Payout;
use App\Support\Chiconnect\Wallet;
use Livewire\Component;
use Illuminate\Support\Str;

class ProcessBank extends Component
{
    public $balance;
    public $country;
    public $countries = [];
    public $bank;
    public $country_banks = [];
    public $account;
    public $account_holder;
    public $amount;

    public function mount()
    {
        $this->countries = getCountryCodes();
    }

    public function updatedCountry()
    {
        $this->resetErrorBag('country');
        $this->reset(['country_banks', 'bank', 'account_holder']);

        $banks = collect(Info::CountryBanks($this->country));

        if ($banks->has('data')) {
            return $this->addError('country', 'This country is not supported');
        }

        $this->country_banks = $banks;
    }

    public function updatedBank()
    {
        $this->reset(['amount', 'account', 'account_holder']);
    }

    public function updatedAccount()
    {
        $this->reset('account_holder');
        $this->confirmAccount();
    }

    public function confirmAccount()
    {
        $account_info = Info::VerifyAccountNumber($this->country, $this->bank, $this->account);

        if ($account_info && $account_info->status == 'success') {
            $this->account_holder = $account_info->data[0]->account_name;
            return $this->resetErrorBag('account');
        }

        return $this->addError('account', 'Invalid account number');
    }

    public function submit()
    {
        $this->validate([
            'country' => ['required'],
            'amount' => ['required', 'min:1', 'max:' . $this->balance, 'numeric'],
            'account' => ['required'],
            'bank' => ['required']
        ]);

        $this->confirmAccount();

        // Generate transaction reference
        $tnxRef = TransactionReference::create([
            'uuid' => Str::orderedUuid()
        ]);

        $process_bank = Payout::Bank(auth()->user()->sub_account_id, getCountryCodes()[$this->country], $this->bank, $this->account, $this->amount, $tnxRef->uuid);

        if ($process_bank && $data = $process_bank[0]) {
            ModelsPayout::create([
                'issuer' => $data->issuer,
                'chiRef' => $data->chiRef,
                'type' => $data->type,
                'amount' => $data->valueInUSD,
                'recipient' => $data->account_number
            ]);

            $tnxRef->chiRef = $data->chiRef;
            $tnxRef->save();

            $this->balance = Wallet::fetchBalance(auth()->user()->chi_wallet_id, auth()->user()->sub_account_id) ?? 0;
            $this->reset(['country_banks', 'bank', 'account_holder', 'amount']);
            session()->flash('status', 'Bank payout was successful');
        } else {
            session()->flash('error', 'Oops, something went wrong');
        }
    }

    public function render()
    {
        return view('livewire.process-bank');
    }
}
