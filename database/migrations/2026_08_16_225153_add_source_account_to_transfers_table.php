<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('transfers', 'source_account')) {
            Schema::table('transfers', function (Blueprint $table) {
                $table->string('source_account')
                    ->default('checking')
                    ->after('amount');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('transfers', 'source_account')) {
            Schema::table('transfers', function (Blueprint $table) {
                $table->dropColumn('source_account');
            });
        }
    }
};