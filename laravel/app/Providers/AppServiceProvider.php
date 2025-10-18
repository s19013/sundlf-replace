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
     *
     * PHPMD の StaticAccess 警告（Sanctum の公式静的 API 呼び出しに対する誤検知）を抑制します。
     *
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function boot(): void
    {
        // Sanctumが提供している、usePersonalAccessTokenModelメソッドを利用し、カスタムモデルを使用するようにSanctumへ指示します
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
