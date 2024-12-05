// Array.prototype.map(callback)
// - 배열의 각 요소를 변환하여 새로운 배열을 반환
// - 원본 배열은 변경되지 않음
// - 콜백 함수의 반환값으로 새 배열이 구성됨

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = 0;

// 첫 번째 방식: if-else 구문 사용
var newArray = array.map((number) => {
  if (number % 2 !== 0) {
    // 홀수인 경우
    return number; // 원래 값 반환
  } else {
    // 짝수인 경우
    return 0; // 0으로 변환
  }
});

// 두 번째 방식: 삼항 연산자 사용 (더 간단한 방식)
var newArray = array.map((num) => (num % 2 ? num : 0));

// 새로운 배열의 모든 요소를 합산
newArray.forEach((number) => (result += number));

console.log(result); // 25
