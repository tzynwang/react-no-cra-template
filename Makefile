include .env

.PHONY: i
i:
	rm -rf node_modules
	yarn install --frozen-lockfile

# 開啟本機伺服器來運行此前端專案
.PHONY: start
start:
	node -r esbuild-runner/register ./script/start.ts

# 移除打包檔案
.PHONY: remove-build
remove-build:
	rm -f -r $(BUILD_DESTINATION)

# 執行打包作業 (ts)
.PHONY: build
build: remove-build
	node -r esbuild-runner/register ./script/build.ts

# 執行打包作業 (js)
.PHONY: build-js
build-js: remove-build
	node ./script/build.js

# 執行打包作業 (webpack-cli)
.PHONY: npx-build
npx-build: remove-build
	npx webpack --config ./config/webpack.config.production.js

# 預覽打包後的結果
.PHONY: preview
preview:
	npx http-server $(BUILD_DESTINATION)

.PHONY: deploy
deploy: build-js
	cd $(BUILD_DESTINATION) && \
	git init && \
	git remote -v | grep -w origin || git remote add origin git@github.com:tzynwang/react-no-cra-template.git && \
	git branch -m gh-pages && \
	git add -A && \
	git commit -m "[feat] deploy as gh-pages `date +'%Y-%m-%d %H:%M:%S'`" && \
	git push -u origin gh-pages -f