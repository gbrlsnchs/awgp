'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const isDev = process.env.NODE_ENV !== 'production';
const tsLoaders = [
    {
        loader: isDev ? 'awesome-typescript-loader' : '@ngtools/webpack'
    }
];

if (isDev) {
    tsLoaders.push({ loader: 'angular2-template-loader' });
}

const plugins = [
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.join(__dirname, 'src'),
        {}
    ),
    // new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
        $: 'jquery',
        Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        Button: 'exports-loader?Button!bootstrap/js/dist/button',
        Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        Tether: 'tether',
        Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
        Util: 'exports-loader?Util!bootstrap/js/dist/util',
        jQuery: 'jquery',
        'window.Tether': 'tether',
        'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        filename: 'commons.js',
        minChunks: Infinity,
        name: 'commons'
    }),
    new HtmlWebpackPlugin({
        minify: {
            quoteCharacter: '"',
            removeComments: !isDev
        },
        title: process.env.APP_TITLE || "AGWP"
    }),
    new BaseHrefWebpackPlugin({ baseHref: '/' })
];

if (!isDev) {
    plugins.push(
        new AotPlugin({
            tsConfigPath: path.join(__dirname, 'tsconfig-aot.json')
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
}

const logo = path.join(__dirname, 'src', 'assets', 'logo.png');

if (fs.existsSync(logo)) {
    plugins.push(
        new FaviconWebpackPlugin(logo)
    );
}

const compiler = webpack({
    context: path.join(__dirname, 'src'),
    devtool: isDev ? 'eval-source-map' : 'nosources-source-map',
    entry: [
        'bootstrap-loader',
        'font-awesome-sass-loader',
        'reflect-metadata',
        'zone.js',
        `main${isDev ? '' : '-aot'}.ts`
    ],
    module: {
        rules: [
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                exclude: /index\.html$/,
                test: /\.html?$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(svg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: isDev,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'to-string-loader'
                    },
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.join(__dirname, 'src', 'styles/resources/**/*.scss')
                            ]
                        }
                    }
                ]
            },
            {
                exclude: new RegExp(`^main${isDev ? '-aot' : ''}\.tsx?$`),
                test: /\.tsx?$/,
                use: tsLoaders
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
        publicPath: process.env.PUBLIC_PATH || '/'
    },
    plugins,
    resolve: {
        alias: {
            components: 'app/components',
            directives: 'app/directives',
            modules: 'app/modules',
            pipes: 'app/pipes',
            services: 'app/services'
        },
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
        ],
        modules: [
            'node_modules',
            'src'
        ]
    }
});

if (isDev) {
   new WebpackDevServer(compiler, {
        contentBase: path.join(__dirname, 'build'),
        hot: true,
        publicPath: process.env.PUBLIC_PATH || '/'
    }).listen(process.env.PORT || 3000, process.env.HOST || 'localhost');
} else {
    compiler.run((err) => {
        if (err) {
            throw new Error(err.message);
        }
    });
}
