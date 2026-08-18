<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Force HTTPS in production
        |--------------------------------------------------------------------------
        |
        | Railway serves the application through HTTPS. This makes Laravel
        | generate HTTPS URLs for Vite assets, routes, links, and other
        | generated URLs instead of HTTP URLs.
        |
        */

        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}