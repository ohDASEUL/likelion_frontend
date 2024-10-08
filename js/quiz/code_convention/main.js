//다음의 함수는 1부터 10까지 숫자를 더하는 함수입니다.
const sumNumbers = () => {
  let sum = 0;
  for (let i = 1; i <= 10; i++) { // i에 let 추가
    sum += i;
    console.log("sum", sum);
  }
};
sumNumbers();

//다음의 코드는 클래스를 생성하고 클래스의 함수를 호출하는 코드입니다.
class User {
  name = "홍길동"; // 멤버 변수는 소문자로..
  sayHello = () => { // 메서드도 소문자로..
    console.log(`hello, ${this.name}`);
  };
}
new User().sayHello();

//다음의 코드는 함수를 호출하여 상품을 추가하는 코드입니다.
let productNumber  = 0; // 변수이름 camelCase로 변경
const addProduct = () => { // 함수이름 camelCase로 변경
  console.log(`${productNumber} 상품을 추가했습니다.`);
};
addProduct();
