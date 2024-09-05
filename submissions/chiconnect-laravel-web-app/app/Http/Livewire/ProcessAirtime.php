<?php

namespace App\Http\Livewire;

use App\Models\Payout as ModelsPayout;
use App\Support\Chiconnect\Info;
use App\Support\Chiconnect\Payout;
use App\Support\Chiconnect\Wallet;
use Livewire\Component;

class ProcessAirtime extends Component
{
    public $balance;
    public $country;
    public $countries = [];
    public $amount;
    public $phone;

    public function mount()
    {
        $this->countries = Info::AirtimeCountries();
    }

    public function submit()
    {
        $this->validate([
            'phone' => ['required'],
            'amount' => ['required', 'min:1', 'max:' . $this->balance, 'numeric'],
            'country' => ['required']
        ]);


        $process_airtime = Payout::Airtime(auth()->user()->sub_account_id, $this->country, $this->phone, $this->amount);

        if ($process_airtime && $data = $process_airtime[0]) {
            ModelsPayout::create([
                'issuer' => $data->issuer,
                'chiRef' => $data->chiRef,
                'type' => $data->type,
                'amount' => $data->valueInUSD,
                'recipient' => $data->phoneNumber
            ]);
            $this->balance = Wallet::fetchBalance(auth()->user()->chi_wallet_id, auth()->user()->sub_account_id) ?? 0;
            $this->reset(['country', 'amount', 'phone']);
            session()->flash('status', 'Payout was successful');
        } else {
            session()->flash('error', 'Oops, something went wrong');
        }
    }

    public function render()
    {
        return view('livewire.process-airtime');
    }
}
