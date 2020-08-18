const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const HotModuleReplacementPlugin = require("webpack-hot-middleware");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "src")],
    host: "localhost",
    port: 9000,
    hot: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log(`Webpack-dev-server up at http://localhost:${port}`);
    },
    proxy: {
      "/layout": "http://localhost:3000"
    }
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/img/favicon.ico.png"
    })
    //    new HotModuleReplacementPlugin()
  ],
  //  target: "node",
  //  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(pdf|png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        ]
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  }
};
