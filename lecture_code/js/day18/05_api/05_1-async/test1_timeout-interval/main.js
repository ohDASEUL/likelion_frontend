"use strict"

// function sayHello() {
    // 시간 출력할려고
//     console.timeEnd()
//     console.log('Hello')
// }

// 즉시 실행
// console.time() // timeEnd에서 걸린 시간 출력
// setTimeout(sayHello);
// default: 3.135ms
// Hello

// 1초 후 실행
// setTimeout(sayHello, 1000)
// default: 1.013s
// Hello

// 데이터 전달
// 함수를 직접 실행시키는 것이 아니라 의뢰하는 것
// 의뢰 내용에 데이터 전달
// function sayHello2(arg1, arg2, arg3) {
//     console.log(`Hello, ${arg1}, ${arg2}, ${arg3}`)
// }
// setTimeout(sayHello2, 1000, '홍길동', 10, true);
// Hello, 홍길동, 10, true

// 의뢰 취소
// function sayHello3() {
//     console.log('Hello')
// }
// 몇개라도 등록 하나하나 식별자가 리턴
// 취소 위해서는 식별자 필요
// let id = setTimeout(sayHello3, 1000)
// clearTimeout(id)

// interval

// function fun1(name) {
//     console.log(`fun1, ${name}`)
// }
// setInterval(fun1, 1000, '홍길동');
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// fun1, 홍길동
// ... 

// let id = setInterval(fun1, 1000, '홍길동');
// setTimeout(() => {
//     clearInterval(id)
// }, 3000);
// fun1, 홍길동
// fun1, 홍길동

// 0.5 초 걸리는 업무를 진행하는 함수를 1초마다 반복 호출
// 일부러 시간을 지연시키기 위해
function sleep(sec) {
    // 매개변수 시간 후에 결과 리턴
    return new Promise(resolve => setTimeout(resolve, sec))
}

let beforeTime = performance.now()

// let sayHello = async() => {
//     let nowTime = performance.now()
//     console.log(nowTime - beforeTime)
//     beforeTime =  nowTime
//     await sleep(500) // 0.5초 쉬고
// }

// let id = setInterval(sayHello, 1000)
// setTimeout(()=> clearInterval(id), 3000)
// 1006.3896
// 1002.3583999999998

// 0.5 초 걸리는 업무를 진행한 후에 1초 후에 다시 업무 진행
let id = 0
let sayHello = async () => {
    let nowTime = performance.now()
    console.log(nowTime - beforeTime)
    beforeTime = nowTime
    await sleep(500) // 0.5초 업무 진행
    // 밑줄이 실행되었다는 것은 윗줄의 실행이 끝났다는 것
    setTimeout(sayHello, 1000)
}
setTimeout(sayHello, 1000)
// 1012.2689
// 1538.8099
// 1513.5456
// 1514.4340000000002
// 1516.7813999999998
// ...