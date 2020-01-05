const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/main.js")
    // landing: path.resolve(__dirname, './src/components/LandingPage.js')
    // maps: path.resolve(__dirname, './src/components/Maps.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new Dotenv(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: "H A C K A T H O N",
      template: "./template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      },
      {
        test: /\.s?(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          { loader: "css-loader", options: { url: false } },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
