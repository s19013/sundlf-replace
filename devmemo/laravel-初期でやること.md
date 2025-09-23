* npm install
* vite.config.jsのserver設定
    * どうやらlaravel12だとhmrまで設定する必要がある

以下のコマンドはcomposerコマンドでプロジェクトを作ったら自動で実行されてたもよう
* cp .env.example .env
* composer install
* php artisan key:generate
* php artisan migrate 

---
laravel 12からは基本 composer run devでサーバーを立ち上げる  
そのために

* apt-get で"procps"をインストール  
* docker-php-ext-installで "pcntl"
* docker-php-ext-installで "zip"

をインストール

---
docker内なのでホストを付け足してブラウザで見れるように  
composer.jsonのscript.dev の`php artisan serve` あたりを `php artisan serve --host=0.0.0.0 --port=8000`に変更