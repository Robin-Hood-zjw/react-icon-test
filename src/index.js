import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";

const root = createRoot(document.getElementById("root"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, errorMessage: "" };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidMount() {
    window.navigator.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  render() {
    return this.state.errorMessage && !this.state.lat ? (
      <div>Error: {this.state.errorMessage}</div>
    ) : !this.state.errorMessage && this.state.lat ? (
      <SeasonDisplay lat={this.state.lat} />
    ) : (
      <div>Loading!</div>
    );
  }
}

root.render(<App />);
