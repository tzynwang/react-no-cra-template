/* Packages */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Webpack from 'webpack';

/* Tools */
import { resolvePath } from '../tool/resolvePath';

/* Data */
import alias from './data/alias';
import env from './data/env';
import type { WebpackConfiguration } from './data/types';

/* Main */
const webpackProductionConfig: WebpackConfiguration = {
  mode: 'production',
  entry: resolvePath('src/index'),
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: resolvePath(JSON.parse(env['process.env'].BUILD_DESTINATION)),
  },
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
        /* load svg as React component if not *.svg?url */
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '/' },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
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
              sourceMap: false,
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
        sideEffects: true,
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '/' },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64]',
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
              sourceMap: false,
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
      publicPath: './',
    }),
    new Webpack.DefinePlugin({ ...env }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias,
  },
};

export default webpackProductionConfig;
