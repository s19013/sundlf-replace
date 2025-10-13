<?php

namespace App\Http\Request;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as BaseFromRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/** エラーが起きた時にjsonを返すformRequestの基礎クラスを作成
 *  formRequestを継承するときはこっちを継承するように
 */
class FormRequest extends BaseFromRequest
{
    /**
     * バリデーションエラー時のレスポンス
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'バリデーションエラーが発生しました。',
                'errors' => $validator->errors(),
                'error_code' => 'VALIDATION_ERROR',
            ], 422)
        );
    }

    /**
     * 認可エラー時のレスポンス
     */
    protected function failedAuthorization()
    {
        throw new HttpResponseException(
            response()->json([
                'status' => 'error',
                'message' => 'この操作を実行する権限がありません。',
                'error_code' => 'UNAUTHORIZED',
            ], 403)
        );
    }
}
