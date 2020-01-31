const path = require('path');

module.exports = {
    entry: {
        alajs_api: './src/alajs-api.ts',
        alajs_jsonrpc: './src/rpc-web.ts',
        alajs_jssig: './src/alajs-jssig.ts',
        alajs_numeric: './src/alajs-numeric.ts',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.web.json'
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: x => x.chunk.name.replace('_', '-') + '-debug.js',
        library: '[name]',
        path: path.resolve(__dirname, 'dist-web', 'debug'),
    }
};
