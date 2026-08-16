<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@comericafin.com'],
            [
                'name' => 'Super Administrator',
                'password' => Hash::make('Admin@12345'),
                'role' => 'super_admin',
            ]
        );
    }
}