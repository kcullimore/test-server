const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
  entry: "./src_client/index.js",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "assets")],
    host: "localhost",
    port: 9000,
    hot: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log(`Webpack-dev-server up at http://localhost:${port}`);
    }
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Node Backend",
      favicon: path.join(__dirname, "assets", "img", "favicon.ico.png")
    }),
    new MiniCssExtractPlugin(),
    new LiveReloadPlugin()
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    targets: "> 0.25%, not dead",
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
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
      }
    ]
  },
  resolve: {
    alias: {}
  }
};
