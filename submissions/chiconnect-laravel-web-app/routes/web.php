<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Support\Chiconnect\Account;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        /**
         * Profiles
         */
        Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
        Route::get('profile/{user:uuid}', [ProfileController::class, 'show'])->name('profile.show');

        /**
         * Account
         */
        Route::get('{user:uuid}/top-up', [AccountController::class, 'topUpForm'])->name('account.top-up-form');
        Route::post('top-up', [AccountController::class, 'topUp'])->name('account.top-up');
        Route::get('send/money', [AccountController::class, 'sendMoneyForm'])->name('account.send-money-form');
        Route::post('send/money', [AccountController::class, 'sendMoney'])->name('account.send-money');
    });
});

require __DIR__.'/auth.php';
