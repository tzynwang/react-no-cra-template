/* Packages */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpack from 'webpack';

/* Tools */
import { resolvePath } from '../tool/resolvePath';
import PrintToConsolePlugin from '../tool/PrintToConsolePlugin';

/* Data */
import alias from './data/alias';
import env from './data/env';
import type {
  WebPackDevServerConfiguration,
  WebpackConfiguration,
} from './data/types';

const appPortString = JSON.parse(env['process.env'].APP_PORT);
const port = appPortString ? Number(appPortString) : 'auto';

/* Main */
const webpackDevelopmentConfig: WebpackConfiguration = {
  mode: 'development',
  entry: resolvePath('src/index'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(png|svg|jpg)$/i,
        type: 'asset',
        /* file path format: *.(png|svg|jpg)?url */
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        /* exclude react component if *.svg?url */
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                mode: 'icss',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[file]_[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolvePath('public/index.html'),
      publicPath: '/',
    }),
    new Webpack.DefinePlugin({ ...env }),
    new PrintToConsolePlugin({
      message: [
        '-----------------',
        `Run dev server with NODE env: ${process.env.NODE_ENV}`,
        `Run dev server with API Url: ${process.env.APP_API_URL}`,
        `Run dev server on: http://localhost:${process.env.APP_PORT}`,
        '-----------------',
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias,
  },
};

export const webpackDevServerConfig: WebPackDevServerConfiguration = {
  static: {
    directory: resolvePath('public'),
  },
  port,
  open: true,
  historyApiFallback: true,
};

export default webpackDevelopmentConfig;
