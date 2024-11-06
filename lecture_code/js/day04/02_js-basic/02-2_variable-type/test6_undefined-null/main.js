let data1 = null;
console.log(data1, `type is ${typeof data1}`) // null 'type is object'

// 객체 대입..
let user1 = {
    name: '홍길동',
    age: 25,
    address: 'seoul'
}

let user2 = null;
console.log(typeof user1, typeof user2)


// undefined.......
let data2;
console.log(data2, typeof data2) // undefined 'undefined'

// error...
// 그런 변수 선언되지 않았다.
// console.log(data3) // ReferenceError: data3 is not defined

// 객체 변수의 멤버에 접근하고 있지만... 객체자체가 null이야
// user2.name = '김길동'; // TypeError: Cannot set properties of null

// 변수는 선언되었어.. 그런데 타입 유추가 안 돼
let user4
// user4.name = '김길동' // TypeError: Cannot set properties of undefined 