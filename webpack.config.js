const path = require( 'path' );

let config = {

	entry: './src/main.js',

	output: {
		filename: 'main.js',
		path: path.resolve( __dirname, './dist' ),
	}

};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) {

		config.mode = 'development';

		config.devtool = 'inline-source-map';

		config.devServer = {
			contentBase: './dist',
			host: '192.168.1.10',
			port: 8080,
			disableHostCheck: true,
		};

	} else {

		config.mode = 'production';

		config.module = {
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
		};

		config.externals = {
			'dat.gui': 'dat.gui',
		};

		config.output = {
			filename: 'main.js',
			path: path.resolve( __dirname, './dist/' ),
		};

	}

	return config;

};
