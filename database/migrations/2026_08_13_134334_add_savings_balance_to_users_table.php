<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('phone')->nullable()->after('email');
            });
        }

        if (! Schema::hasColumn('users', 'account_number')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('account_number')->nullable()->unique()->after('routing_number');
            });
        }

        if (! Schema::hasColumn('users', 'balance')) {
            Schema::table('users', function (Blueprint $table) {
                $table->decimal('balance', 15, 2)
                    ->default(0.00)
                    ->after('account_number');
            });
        }

        if (! Schema::hasColumn('users', 'profile_picture')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('profile_picture')->nullable()->after('balance');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'profile_picture')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('profile_picture');
            });
        }

        if (Schema::hasColumn('users', 'balance')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('balance');
            });
        }

        if (Schema::hasColumn('users', 'account_number')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('account_number');
            });
        }

        if (Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('phone');
            });
        }
    }
};
