<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'sender', 'wallet', 'amount', 'tnxID', 'receiver'
    ];

    public function recipient()
    {
        return $this->belongsTo(User::class, 'receiver', 'sub_account_id');
    }
}
