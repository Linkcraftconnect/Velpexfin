<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            /*
             * Administrator permission:
             * Allows a regular administrator to manage
             * document access for their own customers.
             */
            $table->boolean('can_manage_document_access')
                ->default(false)
                ->after('status');

            /*
             * Customer document permissions.
             */
            $table->boolean('statement_access')
                ->default(false)
                ->after('can_manage_document_access');

            $table->boolean('statement_pdf_access')
                ->default(false)
                ->after('statement_access');

            $table->boolean('statement_png_access')
                ->default(false)
                ->after('statement_pdf_access');

            $table->boolean('receipt_pdf_access')
                ->default(false)
                ->after('statement_png_access');

            $table->boolean('receipt_png_access')
                ->default(false)
                ->after('receipt_pdf_access');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'can_manage_document_access',
                'statement_access',
                'statement_pdf_access',
                'statement_png_access',
                'receipt_pdf_access',
                'receipt_png_access',
            ]);
        });
    }
};