const HTMLWebpackPlugin = require("html-webpack-plugin");
const path              = require("path");

const config = (env) =>
{
	const mode = "development"; //"production"

	return {
		devServer: {
			static  : { directory: path.join(__dirname, 'build') },
			compress: true,
			port    : 8080,
		},
		entry : "./src/index.tsx",
		mode  : mode,
		cache : true,
		output:
		{
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'build'),
		},
		plugins:
		[
			new HTMLWebpackPlugin({ template: "./public/index.html" }),
		],
		resolve:
		{
			extensions: [".ts", ".tsx", ".js", ".jsx", ".gif", "jpg"],
		},
		module:
		{
			rules:
			[
				{
					test   : /\.(ts|tsx)$/,
					exclude: /node_modules\/(?!eraz-lib)/,
					use    : "ts-loader",
				},
				{
					test  : /\.worker\.js$/,
					loader: "worker-loader"
				},
				{
					test: /\.scss$/,
					use:
					[
						{ loader: "style-loader" },
						{
							loader : "css-loader",
							options:
							{
								modules: { localIdentName: "[name]__[local]--[hash:base64:5]" },
							},
						},
						{ loader: "sass-loader"  },
					],
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use    : ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
			],
		},
	};
};

module.exports = config;


