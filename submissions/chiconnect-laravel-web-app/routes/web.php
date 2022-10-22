<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\ProfileController;
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
    return redirect()->route('login');
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    /* Admin Routes*/
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
    });

    /* USER ROUTES */
    /**
     * Payments
     */
    Route::get('payment/transfer/create', [AccountController::class, 'createTransfer'])->name('payment.transfer.create');
    Route::post('payment/transfer/process', [AccountController::class, 'processTransfer'])->name('payment.transfer.process');
    Route::get('payment/transfer/history', [AccountController::class, 'transferHistory'])->name('payment.transfer.history');
    Route::get('payment/payout/history', [PayoutController::class, 'history'])->name('payment.payout.history');
    Route::get('payment/payout/airtime/create', [PayoutController::class, 'createAirtime'])->name('payment.payout.airtime.create');
});

require __DIR__ . '/auth.php';
