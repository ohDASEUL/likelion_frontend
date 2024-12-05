// Array.prototype.filter(callback)
// - 조건을 만족하는 모든 요소를 포함하는 새 배열 반환
// - 조건을 만족하는 요소가 없으면 빈 배열 반환
// - 원본 배열은 변경되지 않음

var array = [6, 7, 8, 1, 4, 5, 2, 3, 9, 10];
var result = 0;

// 메서드 체이닝:
// 1. filter로 홀수만 추출
// 2. forEach로 추출된 홀수들의 합계 계산
array
  .filter((num) => num % 2 !== 0) // 홀수 필터링
  .forEach((num) => (result += num)); // 필터링된 홀수의 합계 계산

console.log(result); // 25
