"use strict"

// test1 함수의 프로토타입
function myFun(arg1, arg2) {
    console.log(arg1, arg2)
}
// 일반함수로 준비
// 에러 발생 안 함.. myFun 내에 prototype 변수 선언한 적 없는데
// constructor() 를 가지고 나머지 멤버는 없는 빈 상태의 객체가 자동 준비
// 생성자 함수가 아닌 모든 함수내에 준비
console.log(myFun.prototype) // {}

// test2 생성자 함수 와 프로토타입
function User(name, age, address) {
    // this.xxx -> 객체가 생성될 때마다 객체의 메모리에 유지
    this.name = name
    // 프로토타입에 멤버 선언 .. 객체가 몇 개 생성되든 상관없이 한 곳에만 유지
    // 객체간 공유
    User.prototype.age = age
    User.prototype.adderss = address
}
let user1 = new User('홍길동', 20, 'seoul')
console.log(user1.name, user1.age, user1.adderss) // 홍길동 20 seoul

let user2 = new User('김길동', 30, 'busan')
console.log(user2.name, user2.age, user2.adderss) // 김길동 30 busan
console.log(user1.name, user1.age, user1.adderss) // 홍길동 30 busan

console.dir(user1) // User { name: '홍길동' }
console.dir(user2) // User { name: '김길동' }

// test3 ... prototype 의 변수에 객체로 값을 대입해서 바꾸면
user1.age = 40
user1.adderss = 'incheon'
// prototype 에 선언된 변수 값을 객체에서 변경을 시키면
// prototype 의 데이터가 변경되지 않고
// 그 객체 내 동일 이름의 변수가 선언 되어 객체 내 유지되는 데이터가 된다
console.log(user1.name, user1.age, user1.adderss) // 홍길동 40 incheon
console.log(user2.name, user2.age, user2.adderss) // 김길동 30 busan

console.dir(user1) // User { name: '홍길동', age: 40, adderss: 'incheon' }
console.dir(user2) // User { name: '김길동' }

// 생성자 함수 내에서만 prototype 멤버가 추가되는 것이 아니라 외부에서 추가 가능
User.prototype.email = 'a@a.com'
console.log(user1.name, user1.age, user1.adderss, user1.email) // 홍길동 40 incheon a@a.com

// 객체의 멤버명과 프로토타입의 멤버명이 동일할 수도 있다
//우선으로 객체 멤버가 이용
// 명시적으로 이름이 동일할 때 프로토타입의 멤버를 참조하게 하고 싶다면
console.log(user1.age, user1.__proto__.age) // 40 30