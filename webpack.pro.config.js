
var path = require('path');
var webpack = require('webpack');
var babelpolyfill = require("babel-polyfill");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


//配置文档参考 https://doc.webpack-china.org/concepts/
//新手参考 https://segmentfault.com/a/1190000014112145?utm_source=channel-newest
const webpackConfig = {
    mode: 'production', //打包模式，文档参考 https://webpack.js.org/concepts/mode/#mode-none
    //devtool: 'eval-source-map',
    entry:{
        app:'./client/index.js',
        vendor:['react','react-dom','react-router','react-redux','dva','history'],
     },
    output:{
        path:path.resolve(__dirname,'./lib'),
        filename:'script.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json",".jsx"]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        //loaders加载器
        rules: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader',//loader的名称（必须）
                // options: {
                //         plugins: [  
                //         ['import', { libraryName: 'antd', style: 'css' }]  // `style: true` 会加载 less 文件  
                //         ],
                //         compact: true,
                // },
                query: {presets: ['es2015','stage-0','react'] }
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {test:/\.less$/,loader:'less-loader'},
            {test:/\.sass$/,loader:'sass-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ],   
    },
    //webpack-dev-server配置
    devServer: {
        host:'127.0.0.1',
        contentBase:'./lib',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        hot:true,
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 5060,//设置默认监听端口，如果省略，默认为"8080"
        "proxy": {
            "/snatch-manager": {
                "target":"http://118.190.91.212:2388", //192.168.1.21
                "changeOrigin": true,
                'secure':true,
                //"pathRewrite": { "^/webservice" : "" }
            }
        }
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//模块热替换插件  
        //new BundleAnalyzerPlugin(),//查看模块体积
        //"analyzPro": "NODE_ENV=production npm_config_report=true npm run builtPro",
        new UglifyJsPlugin({
            parallel: 4,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false
                },
            },
            cache: true,
          })
    ],
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM",
    //     'react-router': 'ReactRouter',
    //     'redux': 'Redux',
    //     'history': 'History'
    // }  //结合CDN推送方式
}

module.exports  = webpackConfig;