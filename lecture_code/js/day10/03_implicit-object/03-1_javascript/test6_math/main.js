"use strict"

// round .. 반올림
console.log(Math.round(0.56)) // 1
console.log(Math.round(1)) // 1
console.log(Math.round(1.1)) // 1
console.log(Math.round(-0.56)) // -1
console.log(Math.round(-1.1)) // -1

// random, 0~1 사이의 실수
console.log(Math.random()) // 0.1925017380599891

// 0~100 사이의 난수..
console.log(Math.random()*100) // 45.95716278294639

// 51~70 사이의 난수..
let max = 70
let min = 51
console.log(Math.random()*(max-min)+min) // 58.76425225706353

// min , max....
console.log(Math.min(39, 45, 21, 60)) // 21
console.log(Math.max(39, 45, 21, 60)) // 60

// 배열에 숫자 데이터가 있다. 배열의 데이터중  min max
let array = [39, 45, 21, 60]
// 1. rest parameter - 함수의 마지막 매개변수를 rest parameter로 선언
// 2. spread operator - 배열의 데이터를 전체 나열할 때
// ...array => 39, 45, 21, 60
console.log(Math.min(...array)) // 21
console.log(Math.max(...array)) // 60




