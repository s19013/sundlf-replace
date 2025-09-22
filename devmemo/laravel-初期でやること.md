* npm install
* vite.config.jsのserver設定
    * どうやらlaravel12だとhmrまで設定する必要がある

以下のコマンドはcomposerコマンドでプロジェクトを作ったら自動で実行されてたもよう
* cp .env.example .env
* composer install
* php artisan key:generate
* php artisan migrate 