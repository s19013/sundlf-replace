<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Sanctum\PersonalAccessToken;
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
        // ぶっちゃけ私もよくわかってないけど､laravel公式がやれって言ってるからやる

        // sanctumで必要
        // Sanctumが提供している、usePersonalAccessTokenModelメソッドを利用し、カスタムモデルを使用するようにSanctumへ指示します
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
