FROM node:20

# npm installとかする前にworkdirを設定しないといけない
WORKDIR /vue

# 依存関係をインストール
# RUN npm install

# 初期からbashで動くように(イメージの作り直しが必要)
SHELL ["/bin/bash", "-c"]