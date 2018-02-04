const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { NoEmitOnErrorsPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

const root = process.cwd();

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['es2015', 'module', 'main'],
  },
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(root, 'dist'),
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@ngtools/webpack',
            options: { tsConfigPath: path.resolve(root, 'tsconfig.json') },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        include: [path.resolve(root, 'src', 'app')],
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),

    new CopyWebpackPlugin([
      {
        from: 'src/assets/favicon.ico',
        to: 'assets',
      },
      {
        from: 'src/assets/home-1.png',
        to: 'assets',
      },
      {
        from: 'src/manifest.json',
        to: '',
      },
      { from: 'src/_redirects', to: '' },
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),

    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: (module: any) => /node_modules/.test(module.resource),
    }),

    new AngularCompilerPlugin({
      mainPath: 'src/main.ts',
      tsConfigPath: 'tsconfig.json',
      sourceMap: true,
    }),
  ],
};
