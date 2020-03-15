const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  output: {
    publicPath: 'dist/',
    filename: 'bundlev2.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    publicPath: '/dist/',
    historyApiFallback: true,
  },
  devtool: 'source-map',
  optimization: {
    usedExports: true
  }
};
