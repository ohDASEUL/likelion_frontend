"use strict"

// random() - 랜덤값 .. (난수 발생)
// 0~3의 난수
// round() - 반올림
let data = Math.round(Math.random()*3)
console.log(`random : ${data}`)

switch(data % 3){
    case 0: {
        console.log('나머지는 0입니다.')
        break
    }
    case 1: {
        console.log('나머지는 1입니다.')
        break
    }
    case 2: {
        console.log('나머지는 2입니다.')
        break
    }
    default: {
        console.log('default 부분이 실행 되었습니다.')
    }
}

// random : 2
// 나머지는 2입니다.
// default 부분이 실행 되었습니다.

// break 추가 후
// random : 2
// 나머지는 2입니다.