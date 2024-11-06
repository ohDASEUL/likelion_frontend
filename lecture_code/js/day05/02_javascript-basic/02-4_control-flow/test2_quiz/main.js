// 유저에게 prompt()를 이용해 나이를 입력받는다.
let age = prompt("나이를 입력하세요:");

// prompt()에서 취소 버튼을 누르면 '입력을 취소하였습니다'를 console에 출력
if (age === null) {
    console.log('입력을 취소하였습니다');
} else if (isNaN(age)) {
    // 숫자가 아닌 데이터를 입력하면 '숫자가 아닌 문자를 입력하셨습니다.'를 출력
    console.log('숫자가 아닌 문자를 입력하셨습니다.');
} else {
    // 입력된 값을 숫자로 변환
    age = Number(age);
    
    if (age <= 0 || age >= 100) {
        // 0 이하 또는 100 이상의 숫자를 입력하면 경고 메시지를 출력
        console.log('1 이상 100 이하의 숫자를 입력해야 합니다.');
    } else if (age < 10) {
        // 10 미만의 숫자를 입력하면 '어린이군요'를 출력
        console.log('어린이군요.');
    } else if (age >= 10 && age < 20) {
        // 10 이상 20 미만의 숫자를 입력하면 '청소년 이군요'를 출력
        console.log('청소년 이군요');
    } else if (age >= 20) {
        // 20 이상의 숫자를 입력하면 '어른 이군요'를 출력
        console.log('어른 이군요.');
    }
}