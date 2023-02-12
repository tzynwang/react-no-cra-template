include .env

# 從打包檔資料夾中讀取根目錄 package.json GitHub repository 的值
GIT_REPO_URL=`node -p "require('../package.json').repository.url"`

# 在不改動 yarn.lock 的情況下安裝專案套件
.PHONY: i
i:
	rm -rf node_modules
	yarn install --frozen-lockfile

# 在本機伺服器運行此前端專案，埠號透過 .env 中的 APP_PORT 指定
.PHONY: start
start:
	node -r esbuild-runner/register ./script/start.ts

# 移除打包檔案
.PHONY: remove-build
remove-build:
	rm -f -r $(BUILD_DESTINATION)

# 執行打包作業，產出目的地根據 .env 中的 BUILD_DESTINATION 決定
.PHONY: build
build: remove-build
	node -r esbuild-runner/register ./script/build.ts

# 預覽打包後的結果
.PHONY: preview
preview:
	npx http-server $(BUILD_DESTINATION)

# 將打包後的靜態內容部署為 gh-pages
.PHONY: deploy
deploy: build
	cd $(BUILD_DESTINATION) && \
	git init && \
	git remote -v | grep -w origin || git remote add origin $(GIT_REPO_URL) && \
	git branch -m gh-pages && \
	git add -A && \
	git commit -m "[feat] deploy as gh-pages `date +'%Y-%m-%d %H:%M:%S'`" && \
	git push -u origin gh-pages -f