<?php

namespace App\Models\Sanctum;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * アプリ側で将来的に拡張する可能性に備えたラッパーモデル。
 * 現状は Laravel\Sanctum\PersonalAccessToken をそのまま継承します。
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
    // ...
}
