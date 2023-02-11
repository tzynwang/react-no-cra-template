# react-no-create-react-app-template

## 概括

此 react 專案不透過 create-react-app 建立，並手寫 webpack 打包設定。

## Quick start

1. 設定 `.env` 檔案中的 `NODE_ENV` 為 `development`
2. 設定 `.env` 檔案中的 `APP_PORT` 內容，可填 `8080` 或留白讓 webpack dev server 自動安排
3. 接著在終端執行以下指令

```makefile
nvm use
make i
make start
```

## 基礎設施

Node.js: `lts/gallium`

## 啟動流程

### 啟動

```makefile
# 透過 nvm 切換至指定 node 版本
nvm use

# 安裝套件
make i

# 在本機伺服器運行此前端專案，埠號透過 .env 中的 APP_PORT 指定
make start
```

### 打包

1. 設定 `.env` 檔案中的 `NODE_ENV` 為 `production`
2. 設定 `.env` 檔案中的 `BUILD_DESTINATION` 內容
3. 接著在終端執行以下指令

```makefile
# 打包此專案，產出目的地根據 .env 中的 BUILD_DESTINATION 決定
make build
```
