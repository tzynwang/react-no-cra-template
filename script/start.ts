/* Packages */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

/* Data */
import webpackDevelopmentConfig, {
  webpackDevServerConfig,
} from '../config/webpack.config.development';

const compiler = webpack(webpackDevelopmentConfig);
const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);

/* Functions */
async function startSylvie() {
  try {
    await devServer.start();
  } catch (error) {
    return console.log(error);
  }
}

/* Main */
startSylvie();
