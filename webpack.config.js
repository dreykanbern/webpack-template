const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + ' mode');
module.exports = {
  mode: mode,
  output: {
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  devServer: {
    open: true,
    hot: true,
    port: 'auto',
    static: {
      directory: './src',
      watch: true,
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      //options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
};
