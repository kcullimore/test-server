import { calculateLayout } from "./rUtils.js";
import inputHTML from "../assets/html/input.html";

export default function getLayout() {
  let element = document.createElement("div");
  element.innerHTML = inputHTML;
  document.body.appendChild(element);

  let output = calculateLayout(document);
  let ws = new WebSocket("ws://localhost:3000");

  ws.onopen = function(e) {
    console.log("Client WS connection established.");
    ws.send(output);
  };

  ws.onmessage = function(message) {
    console.log(message);
  };
}
