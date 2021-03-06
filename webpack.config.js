const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const config = {

	demo: {
		mode: 'production',
		entry: './src/demo.js',
		output: {
			filename: 'main.js',
			path: path.resolve( __dirname, 'demo' ),
		},
		resolve: {
			alias: {
				'textformer': './main'
			}
		}
	},

	dev: {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			static: {
				directory: path.resolve( __dirname, 'demo' ),
			},
			host: '192.168.1.10',
			port: 8080,
		},
		optimization: {
			minimize: false,
		},
	},

	build: {
		mode: 'production',
		entry: './src/main.js',
		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'textformer.min.js',
			library: {
				name: 'Textformer',
				type: 'umd',
				export: 'Textformer'
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: [ /node_modules/ ],
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			]
		},
		optimization: {
			minimize: true,
			minimizer: [ new TerserPlugin( {
				terserOptions:{
					mangle: {
						reserved: [
							'Textformer',
							'Textform',
							'TextformPlayer'
						]
					},
				},
				extractComments: false,
			} ) ]
		},
	}

};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) return {
		...config.demo,
		...config.dev
	};

	return [
		{
			...config.demo,
			externals: {
				...config.demo.externals,
				textformer: 'window'
			},
		},
		{
			...config.build,
			output: {
				...config.build.output,
				path: path.resolve( __dirname, 'demo/lib/' ),
			}
		},
		config.build
	];

};
