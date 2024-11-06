"use strict";

// test1 async 로 함수 선언
// 비동기적으로 실행될 함수(호출한 곳을 대기하지 않게 하고자 하는 함수)
// async function myFun1(params) {
//     setTimeout(()=> console.log('myFUn1 call'),2000)
// }
// let myFun2 = async () => {
//     setTimeout(() => {
//         console.log('myFun2 call')
//     }, 1000);
// }
// console.log('step1')
// myFun1()
// console.log('step2')
// myFun2()
// console.log('step3')
// step1
// step2
// step3
// myFun2 call
// myFUn1 call

//test2 promise vs async
// function myFun3() {
//     return new Promise((resolve, reject)=>{
//         resolve(1)
//     })
// }
// myFun3().then((value)=>console.log(value))
// 1
// async function myFun4() {
//     return 2
// }
// myFun4().then((value)=>console.log(value))
// 2

// test3 promise 데이터 반복적으로 실행 획득
function getData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${id} data`), 1000);
  });
}
// function myFun5() {
//   getData(1)
//     .then((value) => {
//       console.log(value); // 1 data
//       return getData(2);
//     })
//     .then((value) => {
//       console.log(value); // 2 data
//       return getData(3);
//     })
//     .then((value) => {
//       console.log(value); // 3 data
//     });
// }
// myFun5();

// then() 으로 promise를 이용하는 함수를 아래처럼 await로 작성 가능
// async function myFun6() {
//     console.log(await getData(1)) // 1 data
//     console.log(await getData(2)) // 2 data
//     console.log(await getData(3)) // 3 data
// }
// myFun6(3)

// test4 비동기적으로 실행시켜야 하는 함수가 여러개  있다. 가정
// 여러 함수가 동시에 진행되어도 된다는 가정
// 모든 결과 데이터를 획득만 하면 된다는 가정
function funA() {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve('funA data')},1000)
    })
}

function funB() {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve('funB data')},1000)
    })
}

// async function myFun7() {
//     console.time();
//     let aData = await funA()
//     console.log(aData)
//     let bData = await funB()
//     console.log(bData)
//     console.timeEnd()
// }
// myFun7()
// funA data
// funB data
// default: 2.033s

// async function myFun8() {
//     console.time();
//     // 함수 호출에 await가 아니라 결과 데이터에 await
//     // 함수는 동시 진행
//     let aData = funA()
//     let bData = funB()
//     console.log(await aData)
//     console.log(await bData)
//     console.timeEnd()    

// }
// myFun8()

// funA data
// funB data
// default: 1.033s

// async function myFun9() {
//     console.time();
//     // 비동기 함수를 여러개 호출, 동시 진행하는 경우
//     // all()을 이용할 수도
//     Promise.all([funA(), funB()]).then((value)=>{
//         console.log(value)
//         console.timeEnd()
//     })
// }
// myFun9()
// // [ 'funA data', 'funB data' ]
// // default: 1.020s