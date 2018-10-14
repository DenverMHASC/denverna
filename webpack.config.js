module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	devServer: {
		publicPath: '/dist/'
	},
	devtool: 'source-map'
};
