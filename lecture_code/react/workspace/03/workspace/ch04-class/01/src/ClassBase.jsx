import { Component } from "react";

export class ClickMe extends Component {
  // state/setState는 부모(Component)에 정의되어 있는 이름
  // 상태는 state 변수 하나만 사용 가능해서 상태를 관리하려면 객체로 지정
  // 함수형에서는 state 변수를 여러 개 지정 가능(useState 훅)
  state = { count: 0 };

  // arrow function으로 작성해야 this.state 등에 접근 가능
  handleClick = () => {
    this.setState({ count: this.state.count + this.props.level });
  };
  render() {
    return (
      <div>
        클릭 횟수 x {this.props.level}: {this.state.count}
        <button onClick={this.handleClick}>클릭</button>
      </div>
    );
  }
}

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>01. 클래스컴포넌트</h1>
        <ClickMe level={2} />
        <ClickMe level={5} />
      </div>
    );
  }
}
