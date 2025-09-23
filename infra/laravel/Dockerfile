FROM composer:2.8 AS composer_stage
FROM php:8.3-fpm

# root 権限で Composer を実行しても警告を出さない
ENV COMPOSER_ALLOW_SUPERUSER=1
# Composer のキャッシュ場所を固定化して、権限問題回避＆ビルド高速化
ENV COMPOSER_HOME=/composer

# composerインストール
# multi-stage ってやつを使うほうが軽いらしい
COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update

# 必要なパッケージインストール
# [--no-install-recommends] 不要なパッケージのインストールを防止
RUN apt-get -y install --no-install-recommends \
git \
unzip \
libzip-dev \
libicu-dev \
libonig-dev \
procps 

# composer run dev で必要
RUN docker-php-ext-install pcntl 
RUN docker-php-ext-install zip


# パッケージインストールで使用したキャッシュファイルを削除
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# PHP拡張ライブラリをインストール
RUN docker-php-ext-install intl pdo_mysql zip bcmath

# Node.jsのインストール
RUN curl -sL https://deb.nodesource.com/setup_current.x  | bash - \
&& apt-get install -y nodejs \
# キャッシュ削除
&& rm -rf /var/lib/apt/lists/* 

WORKDIR /laravel

SHELL ["/bin/bash", "-c"]