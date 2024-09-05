<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public $set_schema_table = 'payouts';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE " . $this->set_schema_table . " MODIFY COLUMN type ENUM('airtime', 'chimoney', 'giftcard', 'momo', 'bank') NOT NULL");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE " . $this->set_schema_table . " MODIFY COLUMN type ENUM('airtime', 'chimoney', 'giftcard', 'momo') NOT NULL");
    }
};
