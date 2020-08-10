// React
import React from "react";
// Reach Router
import { Router } from "@reach/router";

import LayoutSeve from "./LayoutServe";

class App extends React.Component {
  render() {
    return (
      /*       <React.StrictMode> */
      <Router>
        <MainContent
          exact
          path="/"
          {...this.state}
          toggleTheme={this.toggle_theme}
        />
        <div path="/layout">
          <script />
        </div>
      </Router>
    );
  }
}

export default withAuthenticator(App);

// import "../assets/css/style.css";

//import "../assets/html/input.html";

// import makeImage from "./makeImage";

//import jpgImageUrl from "../assets/img/test.jpg";
//import pngImageUrl from "../assets/img/test.png";
// import svgImageUrl from "../assets/img/test.svg";

// import calcLayout from "./calcLayout";

// const path = require("path");

// function component() {
//  const layoutScript = document.createElement("script");
//  layoutScript.src = path.join(__dirname, "src", "layout.js");

// Add the image to our existing div.
// const newImage = makeImage(svgImageUrl);
// element.appendChild(newImage);

// calcLayout();
/* const canvas = document.createElement("canvas");
 * canvas.id = "theCanvas";
 * element.appendChild(canvas);
 * // Add the image to our existing div.
 * loadPdf(pdfImageUrl); */

//   return element;
//}
