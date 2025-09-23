<?php
namespace App\Models\Sanctum;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

// ぶっちゃけ私もよくわかってないけど､laravel公式がやれって言ってるからやる
// sanctumで必要
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    // ...
}
