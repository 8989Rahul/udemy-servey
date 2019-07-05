import logo from "./logo.svg";
import "./App.css";
import UdemySurvey from "./components/UdemySurvey";
import "bootstrap/dist/css/bootstrap.css";

import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to UdemyServey</h2>
          </div>
        </div>
        <UdemySurvey />
      </div>
    );
  }
}
