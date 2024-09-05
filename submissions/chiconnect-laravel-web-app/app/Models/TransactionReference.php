<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionReference extends Model
{
    use HasFactory;

    protected $table = 'transaction_references';

    protected $fillable = [
        'chiRef', 'uuid'
    ];
}
