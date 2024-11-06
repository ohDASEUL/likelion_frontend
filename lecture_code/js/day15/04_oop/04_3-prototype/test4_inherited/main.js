"use strict"; // 엄격 모드 적용

// 모든 도형에 공통으로 들어가는 멤버
// 다른 개발자들이 만드는 모든 도형에 공통으로 들어가는 멤버
function Shape(name) {
  // 생성자 함수: new Shape()로 객체를 생성할 때 자동으로 호출됨
  // 객체가 생성되면서 name 속성을 this에 등록하여 인스턴스마다 고유의 값을 가짐
  this.name = name;
}

// Shape 프로토타입에 draw 메서드를 추가
// Shape 인스턴스에서 이 메서드를 호출하면 도형 이름과 함께 메시지가 출력됨
Shape.prototype.draw = function () {
  console.log(`${this.name} 도형을 그립니다`);
};

// 새로운 Shape 인스턴스를 생성하여 출력
console.dir(new Shape("react1")); // Shape { name: 'react1' }

// Rectangle 생성자 함수 정의 (Shape를 상속받아 구체적인 도형 생성)
// 후배 개발자가 선임 개발자의 Shape 객체를 상속받아 사용한다고 가정
function Rectangle(name, width, height) {
  // Shape 생성자 함수를 호출하여 name 속성을 상속받음
  // apply를 사용하여 this가 Rectangle 객체를 가리키도록 함
  Shape.apply(this, [name]);

  // width와 height는 객체마다 다르므로 this에 개별적으로 등록
  this.width = width;
  this.height = height;
}

// 새로운 Rectangle 인스턴스 rect1을 생성
let rect1 = new Rectangle("rect1", 100, 200);

// rect1 객체는 name, width, height 속성을 가짐 (상속된 name 포함)
console.log(rect1); // Rectangle { name: 'rect1', width: 100, height: 200 }
console.log(rect1.name, rect1.width, rect1.height); // 'rect1', 100, 200

// 주의: Shape의 생성자 함수는 호출되었지만, 프로토타입에 있는 메서드는 상속되지 않음
// 따라서 rect1.draw()는 호출할 수 없음 (오류 발생)

// Rectangle의 프로토타입을 Shape의 인스턴스로 교체하여
// Shape 프로토타입에 있는 메서드까지 상속받을 수 있도록 설정
Rectangle.prototype = new Shape();

// Rectangle 프로토타입에 calcArea 메서드 추가 (면적 계산)
Rectangle.prototype.calcArea = function () {
  console.log(`area : ${this.width * this.height}`); // 면적 계산
}

// 새로운 Rectangle 인스턴스 rect2 생성 및 확인
let rect2 = new Rectangle('rect2', 100, 200);
console.log(rect2.name, rect2.width, rect2.height); // 'rect2', 100, 200

// rect2는 이제 Shape 프로토타입의 draw 메서드와 Rectangle 프로토타입의 calcArea 메서드를 모두 사용할 수 있음
rect2.draw(); // 'rect2 도형을 그립니다'
rect2.calcArea(); // 'area : 20000'

// rect2 객체의 구조 확인
console.dir(rect2); // Shape { name: 'rect2', width: 100, height: 200 }
// this에 저장된 name, width, height
// prototype 체인에 저장된 draw, calcArea

// 프로토타입 상속 방법 1: 상위 객체(Shape)를 하위 객체(Rectangle)의 프로토타입으로 등록
// Rectangle.prototype = new Shape();

// 프로토타입 상속 방법 2: 상위 객체의 프로토타입을 하위 객체의 프로토타입으로 직접 지정
Rectangle.prototype = Shape.prototype;

// calcArea 메서드를 다시 Rectangle 프로토타입에 등록 (프로토타입 재지정 후)
Rectangle.prototype.calcArea = function () {
  console.log(`area : ${this.width * this.height}`);
};

// 새로운 Rectangle 인스턴스 rect3 생성
let rect3 = new Rectangle('rect3', 100, 200);

// rect3 역시 draw 및 calcArea 메서드를 사용할 수 있음
rect3.draw(); // 'rect3 도형을 그립니다'
rect3.calcArea(); // 'area : 20000'

// rect3 객체의 구조 확인
console.dir(rect3); // Shape { name: 'rect3', width: 100, height: 200 }
// this에 저장된 name, width, height
// prototype 체인에 draw, calcArea 메서드
