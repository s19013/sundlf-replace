#!/bin/bash
# 参考: https://github.com/open-southeners/vscode-laravel-pint/issues/49#issuecomment-2577891768

# ホストでは Pint を動かさず、コンテナ内にインストールされた Pint を呼び出すための中継ぎするためのスクリプト
# VSCode から渡されるパスをコンテナ内パスに変換して Pint を実行するスクリプト
TARGET_FILE="$1"

if [[ -z "$TARGET_FILE" ]]; then
  echo "エラー: ファイルパスを指定してください" >&2
  echo "使用方法: $0 <ファイルパス>" >&2
  exit 1
fi

# 相対パスを取得 (realpath の非対応環境への対応)
if ! command -v realpath &> /dev/null; then
  # realpath が利用できない場合は cd + pwd で相対パスを取得
  RELATIVE_PATH=$(cd "$(dirname "$TARGET_FILE")" && pwd)
  RELATIVE_PATH="${RELATIVE_PATH#$(pwd)/}$(basename "$TARGET_FILE")"
else
  RELATIVE_PATH=$(realpath --relative-to="$(pwd)" "$TARGET_FILE")
fi

# 先頭にある "laravel/" を削除しコンテナ内パスを作成
CONTAINER_PATH=${RELATIVE_PATH#laravel/}

# コンテナ内で Pint 実行
# 人間が作業するわけじゃないから非対話モード(-T)で実行
if ! docker compose exec -T backend composer run pint "$CONTAINER_PATH"; then
  echo "エラー: Pint の実行に失敗しました。コンテナが起動していることを確認してください。" >&2
  exit 1
fi