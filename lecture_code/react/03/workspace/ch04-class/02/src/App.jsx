import { Component } from "react";
import ChildComponent from "./FunctionBase";

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildComponent />
      </div>
    );
  }
}
