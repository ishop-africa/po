const path = require('path')
const {version} = require('./package.json')
module.exports = {
  entry: './main/index.ts',
  mode: 'production',
  output: {
    path: `${__dirname}/dist`,
    filename: `yc-store.${version}.mini.js`,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'css'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, 'css'),
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader'],
      // },
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3900,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

};