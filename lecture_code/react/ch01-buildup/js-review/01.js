// 원본 배열
var arr = [10, 20, 30];

// 목표: 각 요소의 제곱값으로 구성된 새로운 배열 생성
var arr2 = [100, 400, 900];

// 1. 전통적인 for 루프 사용
// - 가장 기본적인 반복문
// - 인덱스를 직접 제어할 수 있어 유연함
var arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i] * arr[i]);
}

// 2. for...of 루프 사용 (ES6)
// - 배열의 각 요소에 직접 접근
// - 인덱스가 필요 없을 때 더 간단한 문법
var arr2 = [];
for (let item of arr) {
  arr2.push(item * item);
}

// 3. forEach 메서드 사용 (ES5)
// - 배열의 각 요소에 대해 콜백 함수 실행
// - 함수형 프로그래밍 스타일
var arr2 = [];
arr.forEach(function (item) {
  arr2.push(item * item);
});

// 4. map 메서드 사용 (ES6)
// - 배열의 각 요소를 변환하여 새 배열 반환
// - 가장 선언적이고 간결한 방식
var arr2 = arr.map(function (item) {
  return item * item;
});

// 5. 화살표 함수를 사용한 forEach (ES6)
// - 더 간결한 함수 문법
// - this 바인딩이 렉시컬 스코프를 따름
var arr2 = [];
arr.forEach((item) => {
  arr2.push(item * item);
});

// 결과 출력
console.log(arr2); // [100, 400, 900]
