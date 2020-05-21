var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
	entry : './client/Index.js',
	output : {
		path : path.resolve(__dirname , 'public'),
		filename: 'index_bundle.js'
	},
	module : {
		rules : [
			{test : /\.(js)$/, use:'babel-loader'},
			{
				test: /\.(sass|css)$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		]
	},
	mode:'development',
	plugins : [
		new HtmlWebpackPlugin ({
			template : 'client/template/index.html'
		})
	]
	
}