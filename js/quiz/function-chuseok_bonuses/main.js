// 직원의 추석 보너스를 계산해서 출력하는 함수를 calcBonus 으로 선언한다.

// 함수의 매개변수로 직원 이름과 직책, 연봉을 받아들인다.

// 직책은 A, B , C로 구분한다

// A 직책의 직원은 연봉의 30%, B 직책의 직원은 연봉의 20%, C 직책의 직원은 연봉에 10%를 보너스로 지급한다

// 이렇게 동작하는 calcBonus 함수를 만들고 아래처럼 함수를 호출해서 결과를 출력하는 코드를 작성한다.

// calcBonus('홍길동','A',1000) 이라고 호출 => '홍길동의 추석 보너스는 300 입니다' 로 console 에 출력

"use strict";

const calcBonus = (name, position, salary) => {
    let bonusRate;
    
    // 직책에 따른 보너스 비율 결정
    switch(position) {
        case 'A':
            bonusRate = 0.3;
            break;
        case 'B':
            bonusRate = 0.2;
            break;
        case 'C':
            bonusRate = 0.1;
            break;
        default:
            console.log('올바르지 않은 직책입니다.');
            return;
    }
    
    // 보너스 계산
    const bonus = salary * bonusRate;
    
    // 결과 출력
    console.log(`${name}의 추석 보너스는 ${bonus} 입니다`);
};

// 함수 호출 예시
calcBonus('홍길동', 'A', 1000);
calcBonus('김길동', 'B', 500);
