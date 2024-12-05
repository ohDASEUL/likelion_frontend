// 초기 배열 선언
var score = [100, 90, 80];

// 전개 연산자(...)를 사용하여 배열 복사 및 새로운 요소 추가
// 1. ...score로 기존 배열의 모든 요소를 복사
// 2. 마지막에 70이라는 새로운 요소 추가
var newScore = [...score, 70];

// 원본 배열과 새로운 배열 출력 및 비교
console.log(score, newScore);
// score: [100, 90, 80]
// newScore: [100, 90, 80, 70]

// === 연산자로 두 배열이 같은 객체인지 비교
console.log(score === newScore); // false
// false가 출력됨 - 두 배열은 별개의 객체이기 때문
