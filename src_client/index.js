// Import components --------------------------------------------------------
// React
import React from "react";
import ReactDOM from "react-dom";

// Modules
import App from "./App";

class Application extends React.Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<Application />, document);
