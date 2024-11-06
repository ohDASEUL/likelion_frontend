"use strict"

let obj = {
    name: '홍길동',
    age: 10,
    address: 'seoul'
}

// 특정 객체의 property의 descriptor 확인
console.log(Object.getOwnPropertyDescriptor(obj, 'name')) 
// { value: '홍길동', writable: true, enumerable: true, configurable: true }

// writable ... 값 변경 못하게 하고자 할 때
Object.defineProperty(obj, 'age',{writable: false})
obj.name = '김길동'
// obj.age = 20 // 오류

// enumerable
console.log(Object.keys(obj)) // [ 'name', 'age', 'address' ]
console.log(Object.values(obj)) // [ '김길동', 10, 'seoul' ]
console.log(Object.entries(obj)) // [ [ 'name', '김길동' ], [ 'age', 10 ], [ 'address', 'seoul' ] ]

// in 열거 예약어
for(let property in obj){
    console.log(property)
}
// name
// age
// address

Object.defineProperty(obj, 'age', {enumerable: false})
console.log(Object.entries(obj)) // [ [ 'name', '김길동' ], [ 'address', 'seoul' ] ]

for(let property in obj){
    console.log(property)
}
// name
// address

console.log(obj.age) // 10

// configurable
// wriable 을 false로 지정했다고 하더라도 누군가가 true로 변경해서
// 값 변경을 할 수도
Object.defineProperty(obj, 'age', {writable:true})
obj.age = 20
// descriptor 를 조정한 후에 다시 descriptor 
Object.defineProperty(obj, 'age', {writable:false, configurable: false})
// Object.defineProperty(obj, 'age', {writable:true}) // 오류