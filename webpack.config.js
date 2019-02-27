const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: ['./src/css/app.css', './src/js/app.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'bundle.css', },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env',
            plugins: 'transform-object-assign'
          }
        }
      },
      {
        test: /\.html$/,
        use: { loader: 'raw-loader' }
      }
    ],
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        open: false
      },
      { reload: false }
    ),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};