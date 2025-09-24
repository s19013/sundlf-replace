<?php

namespace App\Providers;

use App\Models\Sanctum\PersonalAccessToken;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

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
        // Sanctumが提供している、usePersonalAccessTokenModelメソッドを利用し、カスタムモデルを使用するようにSanctumへ指示します
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
