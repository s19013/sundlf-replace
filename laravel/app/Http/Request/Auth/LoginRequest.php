<?php

namespace App\Http\Request\Auth;

use App\Http\Request\FormRequest;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required','string','email'],
            'password' => ['required','string'],
        ];
    }

    /**
     * メアドとパスワードを使ってuserテーブルを参照して認証する
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate()
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw new HttpResponseException(
                response()->json([
                    'success' => false,
                    'message' => 'メールアドレスかパスワードが間違っています',
                    'error_code' => 'Unauthorized',
                ], 401)
            );
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * ログイン要求がレート制限されていないことを確認
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw new HttpResponseException(
            response()->json(
                [
                    'success' => false,
                    'message' => trans(
                        'auth.throttle',
                        ['seconds' => $seconds,
                            'minutes' => ceil($seconds / 60),
                        ]
                    ),
                    'error_code' => 'TOO_MANY_REQUESTS',
                ],
            429)
        );
    }

    /**
     * リクエストのレート制限スロットル キーを取得
     *
     * @return string
     */
    public function throttleKey()
    {
        return Str::lower($this->input('email')).'|'.$this->ip();
    }
}
