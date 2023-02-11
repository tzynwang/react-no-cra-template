/* Packages */
import fs from 'fs-extra';
import webpack from 'webpack';

/* Tool */
import { resolvePath } from '../tool/resolvePath';

/* Data */
import webpackProductionConfig from '../config/webpack.config.production';
import env from '../config/data/env';
const compiler = webpack(webpackProductionConfig);

/* Functions */
/** 呼叫 webpack 以 src/index.tsx 作為入口開始執行打包 */
function webpackBuild() {
  compiler.run((error, stats) => {
    console.info('build start.');
    if (error) {
      console.error(error);
    }
    if (stats) {
      console.info('build time: ', (stats.endTime - stats.startTime) / 1000); // 將毫秒轉回秒
    }
    compiler.close((closeError) => {
      if (closeError) {
        console.error(closeError);
      } else {
        console.info('build end.');
      }
    });
  });
}

/** 將 public 中 index.html 以外的靜態檔案複製到 webpack 打包產出的資料夾中 */
function copyPublicAsset() {
  fs.copySync(
    resolvePath('public'),
    resolvePath(JSON.parse(env['process.env'].BUILD_DESTINATION)),
    {
      dereference: true,
      filter: (file) => file !== resolvePath('public/index.html'),
    }
  );
}

function buildSylvie() {
  webpackBuild();
  copyPublicAsset();
}

/* Main */
buildSylvie();
