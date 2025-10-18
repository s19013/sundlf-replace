<?php

namespace App\Http\Controllers\Auth;

use App\Dto\Auth\LoginDto;
use App\Http\Controllers\Controller;
use App\Http\Request\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    // 後でusecaseに移動
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        // LoginRequest::authenticate() 内で Auth::attempt() が呼ばれた後、
        // 既に認証されたユーザーは Auth::user() で取得できる
        /** @var User $user */
        $user = Auth::user();

        // トークン発行
        $token = $user->createToken('auth_token');

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => LoginDto::fromModel($user),
        ]);
    }

    // 後でusecaseに移動
    public function logout(Request $request)
    {
        // 現在のアクセストークンを削除（＝無効化）
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'ログアウトしました｡',
        ]);
    }
}
