Find the newest file ending in:

ensure_routing_number_exists_on_users_table.php

Replace its contents with:

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'routing_number')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('routing_number', 9)
                    ->nullable()
                    ->after('phone');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'routing_number')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('routing_number');
            });
        }
    }
};

