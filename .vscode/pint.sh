#!/bin/bash
# 参考: https://github.com/open-southeners/vscode-laravel-pint/issues/49#issuecomment-2577891768

# ホストでは Pint を動かさず、コンテナ内にインストールされた Pint を呼び出すための中継ぎするためのスクリプト
# VSCode から渡されるパスをコンテナ内パスに変換して Pint を実行するスクリプト
TARGET_FILE="$1"

# 相対パスを取得
RELATIVE_PATH=$(realpath --relative-to="$(pwd)" "$TARGET_FILE")

# 先頭にある "laravel/" を削除しコンテナ内パスを作成
CONTAINER_PATH=${RELATIVE_PATH#laravel/}

# コンテナ内で Pint 実行
# 人間が作業するわけじゃないから非対話モード(-T)で実行
docker compose exec -T backend composer run pint "$CONTAINER_PATH"