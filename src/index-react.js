import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import Image from "./img/test.jpg";
const Index = () => {
  return (
    <div>
      Welcome to React!
      <img image={Image} />
    </div>
  );
};
ReactDOM.render(<Index />, document.getElementById("app"));
