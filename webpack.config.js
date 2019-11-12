const path = require('path');

const webpack = require('webpack');

const {VueLoaderPlugin} = require('vue-loader');


module.exports = {
	entry: path.join(__dirname, "./js/main.js" ),
	output: {
		path: path.join(__dirname, "./dist/"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{test:/\.css$/, use:['style-loader', 'css-loader']},
			{test:/\.(gif|jpg|bmp|png|svg|ttf|woff2|woff|eot)$/, use:['url-loader']},
			{test:/\.vue$/, use:['vue-loader']}  
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery"
		}),
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	}
};




