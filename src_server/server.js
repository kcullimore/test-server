// Express setup
const express = require("express");
const multer = require("multer");
const multipart = multer();
// const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

// Webpack setup
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfigJs = require("../webpack.config.js");
const config = webpackConfigJs();
const compiler = webpack(config);

// Websocket Server
const WebSocket = require("ws");

// const layoutRouter = require("../src_client/layoutServe");
// const imageServe = require("../src_client/imageServe");
// const pdfRouter = require("../src_client/pdfServe");

const app = express();
const PORT = 3000;

//reload=true:Enable auto reloading when changing JS files or content
//timeout=1000:Time from disconnecting from server to reconnecting
/* config.entry.app.unshift(
 *   "webpack-hot-middleware/client?reload=true&timeout=1000"
 * ); */

//Add HMR plugin
config.plugins.push(new webpack.HotModuleReplacementPlugin());

//Enable "webpack-dev-middleware"
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

//Enable "webpack-hot-middleware"
app.use(webpackHotMiddleware(compiler));

// app.use(express.static("../assets"));

//API
/* app.post("/api/add", multipart.any(), function(req, res) {
 *   //execute addition(tasizan)
 *   const firstValue = parseInt(req.body.firstValue);
 *   const secondValue = parseInt(req.body.secondValue);
 *   const sum = firstValue + secondValue;
 *
 *   //return result
 *   res.json({ sum: sum, firstValue: firstValue, secondValue: secondValue });
 * }); */

// Serve the files on port 3000.
const server = app.listen(PORT, function() {
  console.log(`WS Server listening on http://localhost:${PORT}\n`);
});

// Others
// app.use(cors());
// app.use(json());

// Routers
/* app.use("/layout", function(req, res) {
 *   layoutRouter;
 * }); */
app.use("/image", multipart.any(), function(req, res) {
  // document.body.appendChild(imageServe.component());
  element = document.body.createElement("div");
  document.body.appendChild(element);
});
// app.use("/pdf", pdfRouter);

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("open", function open() {
    console.log("Server WS connection established.");
    ws.send("something");
  });
  ws.on("message", message => {
    console.log(`Received message.`);
    fs.writeFileSync(path.join(__dirname, "test.txt"), message);
  });
  ws.send("ho!");
});
