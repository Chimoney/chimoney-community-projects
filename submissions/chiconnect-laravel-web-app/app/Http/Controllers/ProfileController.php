<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        return view('profile.index', [
            'users' => User::Latest()->paginate(20)
        ]);
    }

    public function show(User $user)
    {
        return view('profile.show', [
            'user' => $user
        ]);
    }
}
