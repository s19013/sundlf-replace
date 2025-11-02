#!/bin/bash

set -euo pipefail
# -e: コマンドが失敗したら即終了
# -u: 未定義変数を使用したらエラー
# -o pipefail: パイプラインの中で失敗があれば全体をエラーにする

# .envファイルが存在しない場合は.env.exampleからコピー
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
fi


# 初回実行フラグファイルのパス
INIT_FLAG="./scripts/.init_done"

# フラグファイルが存在しない場合にのみ初期化処理を実行
if [ ! -f "$INIT_FLAG" ];then
    echo "initialization"

    # セットアップスクリプトの存在確認
    if [ ! -f "./scripts/setup_laravel.sh" ]; then
        echo "Error: setup_laravel.sh not found"
        exit 1
    fi

    bash "./scripts/setup_laravel.sh"

    # 初回実行後にフラグファイルを作成
    touch "$INIT_FLAG"
    echo "もう一度初期化したい場合は、このファイルを消してください" >> "$INIT_FLAG"

    echo "Initialization completed"
else
    echo "Initial setup already completed."
fi
