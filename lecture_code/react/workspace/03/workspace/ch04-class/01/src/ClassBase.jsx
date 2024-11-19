import { Component } from "react";

export class ClickMe extends Component {
  render() {
    return (
      <div>
        클릭 횟수 x 5: 15
        <button>클릭</button>
      </div>
    );
  }
}

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01. 클래스컴포넌트</h1>
        <ClickMe />
      </div>
    );
  }
}
