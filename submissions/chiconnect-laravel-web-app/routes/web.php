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
    /**
     * 
     *  ADMIN ROUTES
     * 
     * 
     */
    Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
        /* Profiles */
        Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
        Route::get('profile/{user:uuid}', [ProfileController::class, 'show'])->name('profile.show');

        /* Account */
        Route::get('{user:uuid}/top-up', [AccountController::class, 'topUpForm'])->name('account.top-up-form');
        Route::post('top-up', [AccountController::class, 'topUp'])->name('account.top-up');
    });

    /**
     * 
     *  USER ROUTES
     * 
     */
    /* Payments */
    Route::group(['prefix' => 'payment', 'as' => 'payment.'], function () {
        /* Transfer */
        Route::group(['prefix' => 'transfer', 'as' => 'transfer.'], function () {
            Route::get('create', [AccountController::class, 'createTransfer'])->name('create');
            Route::post('process', [AccountController::class, 'processTransfer'])->name('process');
            Route::get('history', [AccountController::class, 'transferHistory'])->name('history');
        });

        /* Payout */
        Route::group(['prefix' => 'payout', 'as' => 'payout.'], function () {
            Route::get('history', [PayoutController::class, 'history'])->name('history');
            Route::get('airtime', [PayoutController::class, 'createAirtime'])->name('airtime.create');
            Route::get('bank', [PayoutController::class, 'createBank'])->name('bank.create');
        });
    });
});

require __DIR__ . '/auth.php';
