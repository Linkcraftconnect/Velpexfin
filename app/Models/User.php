<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'status',
    'admin_id',
    'phone',
    'account_number',
    'routing_number',
    'balance',
    'savings_balance',
    'profile_picture',
    'transfer_pin',
    'can_manage_document_access',
    'statement_access',
    'statement_pdf_access',
    'statement_png_access',
    'receipt_pdf_access',
    'receipt_png_access',
])]
#[Hidden([
    'password',
    'remember_token',
    'transfer_pin',
])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }

    public function isAdministrator()
    {
        return $this->role === 'administrator';
    }

    public function isCustomer()
    {
        return $this->role === 'customer';
    }

    public function sentTransfers()
    {
        return $this->hasMany(
            \App\Models\Transfer::class,
            'sender_id'
        );
    }

    public function receivedTransfers()
    {
        return $this->hasMany(
            \App\Models\Transfer::class,
            'recipient_id'
        );
    }
}
