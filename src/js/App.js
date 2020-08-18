// Import components --------------------------------------------------------
// React
import React from "react";

// Reach Router

// Modules
import Image from "../img/test.jpg";
import Layout from "./Layout";
// CSS

const TARGET_DIV = "app";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.state = {
      screenSize: {
        width: 1000,
        height: 500
      },
      screenMargin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      loadedImage: null
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    this.onResize();
    this.setState({ loadedImage: Image });
  }

  onResize() {
    let divWidth = document.getElementById(TARGET_DIV).offsetWidth;
    let divHeight = document.getElementById(TARGET_DIV).offsetHeight;
    this.setState({
      screenSize: {
        width: divWidth,
        height: divHeight
      },
      screenMargin: {
        top: divHeight * 0.05,
        bottom: divHeight * 0.1,
        left: divWidth * 0.05,
        right: divWidth * 0.025
      }
    });
  }

  render() {
    let { loadedImage } = this.state;

    function refreshPage() {
      window.location.reload(false);
    }

    return (
      <div>
        <img src={loadedImage} />
        <button onClick={refreshPage}>Click to reload!</button>
        <form action="/uploadfile" encType="multipart/form-data" method="POST">
          <input type="file" name="myFile" accept="image/*" />
          <input type="submit" value="Upload Image" />
        </form>
      </div>
    );
  }
}

export default App;
