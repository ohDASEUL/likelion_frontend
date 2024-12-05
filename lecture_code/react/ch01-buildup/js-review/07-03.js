// Array.prototype.find(callback)
// - 조건을 만족하는 첫 번째 요소를 반환
// - 조건을 만족하는 요소가 없으면 undefined 반환
// - 콜백 함수는 true/false를 반환해야 함

var array = [6, 7, 8, 1, 4, 5, 2, 3, 9, 10];

// 오름차순 정렬
// sort 메서드의 콜백 함수:
// - 음수 반환: a가 b보다 앞에 위치
// - 양수 반환: b가 a보다 앞에 위치
// - 0 반환: 순서 유지
array.sort((a, b) => a - b);
console.log(array); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 2와 3의 최소공배수 찾기 (첫 번째로 2와 3으로 모두 나누어 떨어지는 수)
var result = array.find((num) => num % 2 === 0 && num % 3 === 0);

console.log(result); // 6
