const HTMLWebpackPlugin    = require("html-webpack-plugin");
const path                 = require("path");
const Dotenv               = require('dotenv-webpack');
const CopyWebpackPlugin    = require("copy-webpack-plugin");


const config = (env) =>
{
	const mode = "production";

	return {
		devServer: {
			static  : { directory: path.join(__dirname, "doc") },
			compress: true,
			port    : 8080,
		},
		entry : "./src/index.tsx",
		mode  : mode,
		cache : true,
		output:
		{
			filename: 'bundle.js',
			path: path.resolve(__dirname, "doc"),
		},
		plugins:
		[
			new HTMLWebpackPlugin({ template: "./public/index.html" }),
			new Dotenv(),
			new CopyWebpackPlugin(
				{
					patterns:
					[
						{
							from: path.resolve(__dirname, "public/favicon.ico"),
							to  : path.resolve(__dirname, "doc")
						}
					]
			  	}
			),
		],
		performance: { hints: false },
		resolve:
		{
			extensions: [".ts", ".tsx", ".js", ".jsx", ".gif", ".jpg"],
			fallback:
			{
				"path": false,
			}
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


