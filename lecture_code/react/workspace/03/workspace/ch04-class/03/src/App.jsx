import { Component } from "react";
import ChildComponent from "./LifeCycle";

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildComponent />
      </div>
    );
  }
}
