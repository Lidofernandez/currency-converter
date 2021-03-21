const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "sw.js",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.exchangeratesapi\.*/,
          handler: "CacheFirst",

          options: {
            cacheName: "APIs",

            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
      clientsClaim: true,
      skipWaiting: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /.css$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",

            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",

            options: {
              plugins() {
                return [precss, autoprefixer];
              },
            },
          },
        ],
      },
    ],
  },

  devServer: {
    open: true,
    host: "localhost",
  },
};
