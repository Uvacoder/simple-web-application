const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const MODE = argv.mode;

    return {
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: MODE === 'development' ? 'eval-source-map' : 'none',
        devServer: {
            contentBase: 'dist',
            port: 1234,
            hot: true,
            historyApiFallback: true,
            overlay: {
                errors: true,
            },
            stats: 'errors-warnings',
            clientLogLevel: 'silent',
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        MODE === 'development' ?
                        'vue-style-loader' :
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,
                                importLoaders: 1
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    ctx: {
                                        mode: MODE,
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                      outputPath: 'assets',
                    },
                }
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                publicPath: '/'
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin()
        ],
    };
};









// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const { VueLoaderPlugin } = require("vue-loader");
// const autoprefixer = require("autoprefixer");


// const path = require('path');

// module.exports = {
//     target: "web",
//     entry: './src/main.js',
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: '[name].bundle.js',
//         publicPath: '/'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: "babel-loader",
//                 },
//             },
//             {
//                 test: /\.vue$/,
//                 loader: "vue-loader",
//             },
//             {
//                 test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
//                 loader: "file-loader",
//                 options: {
//                   name: "[name][contenthash:8].[ext]",
//                 },
//             },
//             {
//                 test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
//                 loader: "file-loader",
//                 options: {
//                   outputPath: "assets",
//                   esModule: false,
//                 },
//             },  
//             {
//                 test: /\.s?css$/,
//                 use: [
//                   "style-loader",
//                   MiniCssExtractPlugin.loader,
//                   "css-loader",
//                   {
//                     loader: "postcss-loader",
//                     options: {
//                       plugins: () => [autoprefixer()],
//                     },
//                   },
//                   "sass-loader",
//                 ],
//             }
//         ],
//     },
//     plugins: [
//         new VueLoaderPlugin(),
//         new MiniCssExtractPlugin(),
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, "public", "index.html"),
//             // favicon: "./public/favicon.ico",
//         }),
//     ],
//     resolve: {
//         alias: {
//             vue$: "vue/dist/vue.runtime.esm.js",
//         },
//         extensions: ["*", ".js", ".vue", ".json"],
//     },
//     stats: 'errors-only',
//     devtool: 'inline-source-map',
//     optimization: {
//         minimizer: [new UglifyJsPlugin()],
//     },
// }