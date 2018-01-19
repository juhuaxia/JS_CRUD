var webpack = require('webpack');
var path = require('path');
var ROOT_PATH =path.resolve(__dirname);
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ClearDistPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        index:path.resolve(ROOT_PATH,'src/app.js')
    },
    output:{
        path:path.resolve(ROOT_PATH,'dist'),
        filename:"[name].[chunkhash:8].js",
        publicPath:'./'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:'css-loader'
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
              test: /\.(sass|scss)$/,
              use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader : 'css-loader?importLoaders=1',
                        },
                        {
                          loader: "sass-loader",
                          options: {
                              sourceMap:false,
                              outputStyle : 'compact'
                          }
                      }
                    ]
              })
          }
        ]
    },
    plugins:[
        new ExtractTextPlugin("index.css",{allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ClearDistPlugin(['./dist/*.*']),
        new HtmlWebpackPlugin({
            title:'react-demo',
            filename:'index.html',
            template:'./tpl/index.html',
            inject:'body'
        })
    ]
}