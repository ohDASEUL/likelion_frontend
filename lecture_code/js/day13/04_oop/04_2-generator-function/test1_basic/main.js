"use strict";

// 일반 함수 선언 ... this로 멤버 준비되지 않은 경우
function User1(arg1, arg2) {
  // 함수 내에 변수 및 함수가 선언되어 있다
  // 함수 scope 내에 선언된 함수의 로컬 멤버다.
  let name = arg1;
  let age = arg2;
  let sayHello = function () {
    console.log(`User1, ${name}, ${age}`); // User1, 홍길동, 20
  };
  sayHello();
}
// 일반 함수로 후출
User1('홍길동',20)

 // 객체 생성으로 호출
 // new를 이용했기에 this는 준비된다. (메모리는 준비된다)
 // 하지만 이 함수 내에서 this.xxx 으로.. this에 아무것도 추가되지 않은 상태라
 // 즉 빈상태 객체다
 //


 let obj1 = new User1('홍길동',.30)
 console.log(`${obj1.name}, ${obj1.age}`) // User1, 홍길동, 0.3

 // 생성자 함수로 준비
 function User2(name, age) {
    this.name = name
    this.age = age
    this.sayHello = function() {
        console.log(`${this.name}, ${this.age}`) // undefined, undefined
        // obj1.sayHello() error
    }
 }

 // 일반 함수로 이용
 // new를 이용하지 않았으므로 this가 준비되지 않음
 // 그 상태에서 함수내 this 이용시 에러
 // User2('홍길동', 20) // error
 
 
 // 객체생성으로 이둉
 // 모형(생성자함수)을 선언하고, 모형을 통해 동일 구조의 객체를 반복 생성
let user1 = new User2('홍길동', 25)
let user2 = new User2('김길동', 30)
user1.sayHello() // 홍길동, 25
user2.sayHello() // 김길동, 30


// 생성자 함수와 리턴
// 생성자 함수가 new로 호출이 되면 함수 내에서 명시적으로 return 시키지 않아도 생성된 객체가 리턴됨

// 명시적으로 기초 데이터를 리턴 시킨 경우
function User3(name, age) {
  this.name = name
  this.age = age
  return 10
}

let user3 = new User3('홍길동', 30)
console.log(user3) // User3 { name: '홍길동', age: 30 }
// 기초 데이터 리턴시키면 무시되고 생성된 객체가 반환된다

// 명시적으로 코드에서 준비한 다른 객체를 리턴시킨다면
function User4(name, age) {
  this.name = name
  this.age = age
  return {
    productNumber : 1,
    productName : '에어조던'
  }
}

let user4 = new User4('홍길동',30)
console.log(user4) // { productNumber: 1, productName: '에어조던' }
// 객체를 리턴시키면 생성된 객체는 무시, 코드에서 리턴시킨 객체가 반환

// 외부에서 객체 멤버 추가
console.dir(user1) // User2 { name: '홍길동', age: 25, sayHello: [Function (anonymous)] }
console.dir(user2) // User2 { name: '김길동', age: 30, sayHello: [Function (anonymous)] }
user1.address = 'seoul'
user1.helloFun = function(){
  console.log('hello')
}

// 추가한 객체에만 멤버가 존재
// 동일한 생성자 함수로 생성된 객체라고 하더라도 외부에서 멤버 추가하기 시작하면
// 객체별 멤버가 다르게 된다
console.dir(user1)
// User2 {
//   name: '홍길동',
//   age: 25,
//   sayHello: [Function (anonymous)],
//   address: 'seoul',
//   helloFun: [Function (anonymous)]
// }
console.dir(user2) // User2 { name: '김길동', age: 30, sayHello: [Function (anonymous)] }