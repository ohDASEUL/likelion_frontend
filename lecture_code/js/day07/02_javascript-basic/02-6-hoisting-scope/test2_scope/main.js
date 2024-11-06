"use strict"

// 중복 선언
var data1 = 10
var data2 = 10
const data3 = 10

var data1 = '홍길동'
// let data2 = '홍길동'
// const data3 = '홍길동'

// ==> 동일 스코프에서 중복 선언은 var에 한해서만 지원

// scope 가 다른 위치에서 중복 선언 ....

let data4 = '홍길동'

const myFun = () => {
    let data4 = '김길동' // local scope
    console.log(`in function ${data4}`); // in function 김길동
}
myFun()
console.log(`out function ${data4}`); // out function 홍길동

// ==> 스코프가 다르다면 변수 중복 선언이 가능하다. let const도
// local이 우선이다.