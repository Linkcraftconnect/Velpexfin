<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransferController extends Controller
{
    public function index()
    {
        $query = Transfer::with(['sender', 'recipient'])
            ->latest();

        // Super administrators see all transfers.
        // Administrators see any transfer involving one of their customers.
        if (auth()->user()->role !== 'super_admin') {
            $adminId = auth()->id();

            $query->where(function ($q) use ($adminId) {
                $q->whereHas('sender', function ($senderQuery) use ($adminId) {
                    $senderQuery->where('admin_id', $adminId);
                })
                ->orWhereHas('recipient', function ($recipientQuery) use ($adminId) {
                    $recipientQuery->where('admin_id', $adminId);
                });
            });
        }

        $transfers = $query->get();

        return Inertia::render('Admin/Transactions', [
            'transfers' => $transfers,
        ]);
    }
}
