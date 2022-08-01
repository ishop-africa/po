const path = require('path')
module.exports = {
  entry: './src/js/app.js',
  mode: 'production',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src/css'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
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