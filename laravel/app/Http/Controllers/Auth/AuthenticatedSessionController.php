<?php

namespace App\Http\Controllers\Auth;

use App\Dto\Auth\LoginDto;
use App\Http\Controllers\Controller;
use App\Http\Request\Auth\LoginRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // 後でusecaseに移動
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        /** @var User $user */
        $user = $this->userRepository->findByEmail($request->email, $request->password);

        // 既存のトークンを削除し、新しいトークンを発行
        $user->tokens()->delete();
        $token = $user->createToken('browser_auth_token');

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
