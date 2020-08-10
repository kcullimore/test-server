// Express setup
const express = require("express");
const body = require("body-parser");
const fs = require("fs");
const path = require("path");

// Webpack setup
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../webpack.config.js");
const compiler = webpack(config);

// Websocket Server
const WebSocket = require("ws");

const app = express();
const PORT = 3000;

//Enable "webpack-dev-middleware"
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use(body());

// Serve the files on port 3000.
const server = app.listen(PORT, function() {
  console.log(`WS Server listening on http://localhost:${PORT}\n`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("open", function open() {
    console.log("Server WS connection established.");
  });
  ws.on("message", message => {
    console.log(`Received message.`);
    fs.writeFileSync(path.join(__dirname, "test.txt"), message);
  });
  ws.send("ho!");
});
