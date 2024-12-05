// Array.prototype.reduce(callback[, initialValue])
// - 배열의 각 요소를 순회하며 하나의 결과값 산출
// - callback 인자: (accumulator, currentValue, index, array)
// - initialValue: 초기값 (생략 시 배열의 첫 요소가 초기값)

var array = [2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 첫 번째 방식: 상세한 if-else 구문
var result = array.reduce((sum, num) => {
  if (num % 2 !== 0) {
    return sum + num; // 홀수면 누적
  } else {
    return sum; // 짝수면 이전 값 유지
  }
}, 0);

// 두 번째 방식: 삼항 연산자
var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum;
}, 0);

// 세 번째 방식: 화살표 함수 축약
var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);

// 네 번째 방식: 논리 연산자 활용
var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result); // 25
