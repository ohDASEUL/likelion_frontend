// Array.prototype.forEach(callback)
// - 배열의 각 요소에 대해 콜백 함수를 실행하는 메서드
// - 반환값이 없음 (undefined)
// - 콜백 함수 인자: (currentElement, index)

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = 0;

// 홀수의 합계를 구하는 로직
array.forEach((number) => {
  if (number % 2 !== 0) {
    // 홀수 판별
    result += number; // 홀수일 경우 result에 누적
  }
});

console.log(result); // 25 (1 + 3 + 5 + 7 + 9)
