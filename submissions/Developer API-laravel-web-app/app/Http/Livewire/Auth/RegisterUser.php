<?php

namespace App\Http\Livewire\Auth;

use App\Models\User;
use Livewire\Component;

class RegisterUser extends Component
{
    public $username;

    public function mount()
    {
        $this->username = old('username') ?? '';
    }

    public function updatedUsername()
    {
        $this->validate([
            'username' => ['unique:users']
        ]);
    }

    public function render()
    {
        return view('livewire.auth.register-user');
    }
}
