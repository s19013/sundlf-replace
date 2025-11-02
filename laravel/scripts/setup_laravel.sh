#!/bin/bash
set -euo pipefail
# -e: コマンドが失敗したら即終了
# -u: 未定義変数を使用したらエラー
# -o pipefail: パイプラインの中で失敗があれば全体をエラーにする

echo "setup laravel"

composer install
# pnpm i
# pnpm は一部環境では正しく動かないのでnpmに変更

npm ci

php artisan key:generate
php artisan migrate
php artisan db:seed

echo "setup laravel completed"
