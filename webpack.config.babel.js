import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import StartServer from 'start-server-webpack-plugin';

let nodeModules = {};

fs.readdirSync('node_modules')
.filter((x) => {
    return ['.bin'].indexOf(x) === -1;
})
.forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
});

export default {
    cache: true,
    entry: [
        path.join(__dirname, './src/server.ts')
    ],
    mode:"development",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    target: 'node',
    externals: nodeModules,
    module: {
        rules: [
	      	{
	        	test: /\.ts(x?)$/,
	        	use: [
		          	{
			            loader: 'ts-loader',
			            options: {
			              	transpileOnly: true,
			              	configFile: path.resolve(__dirname, './tsconfig.json')
			            }
		          	}
	        	],
	        	exclude: /node_modules/
	      	},
		    {
		        test: /\.jsx?$/,
		        use: {
		            loader: 'babel-loader',
		            query: {
		               	plugins: ['transform-runtime'],
            			presets: ['es2015', 'stage-0'],
		            }
	          	},
		        exclude: /node_modules/
		    }
	    ]
	},
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
}