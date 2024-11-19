import { Component } from "react";
import ChildComponent from "./ClassBase";

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildComponent />
      </div>
    );
  }
}
