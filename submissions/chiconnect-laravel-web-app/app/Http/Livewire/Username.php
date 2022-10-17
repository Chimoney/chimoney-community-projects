<?php

namespace App\Http\Livewire;

use App\Models\User;
use Livewire\Component;

class Username extends Component
{
    public $search;
    public $username;
    public $users = [];

    public function mount()
    {
        $this->search = $this->username = old('username') ?? '';
    }

    public function selectUser($username)
    {
        $this->username = $username;
        $this->search = $username;
        $this->users = [];
    }

    public function updatedSearch()
    {
        $this->users = User::query()
            ->where('username', 'LIKE', '%' . $this->search . '%')
            ->where('id', '!=', auth()->id())
            ->get();
    }

    public function render()
    {
        return view('livewire.username');
    }
}
