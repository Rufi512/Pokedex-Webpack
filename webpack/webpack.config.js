const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const minicssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: ['@babel/polyfill','./src/index.js'],
  mode:'development',
  output:{
    path:path.resolve(__dirname, '../build'),
    filename:'js/bundle.js',
    publicPath:'/'
  },

  devServer:{
    host: 'localhost',
    port:4000,
    disableHostCheck:true,
    historyApiFallback:true
  },

  resolve:{
     extensions:['.js','.jsx']
  },

  module:{
    rules:[
      {
        test: /\.(js|jsx)$/,
        use:['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/, 
        use: [      
          minicssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use:[{
          loader: 'file-loader',
          options:{
            name:'[name].[ext]',
            outputPath:'static/img',
            useRelativePath:true
          }
        }]
      },
      {
        test: /\.svg$/,
        use:['@svgr/webpack']
      }
    ]
  },

  //devtool: 'eval-source-map',

  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    new minicssExtractPlugin({
      filename: 'css/style.css'
    })
  ]
}
