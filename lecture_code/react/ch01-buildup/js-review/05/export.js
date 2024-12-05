// 덧셈 함수 - 개별 export
export function plus(x, y) {
  return x + y;
}

// 뺄셈 함수 - 개별 export
export function minus(x, y) {
  return x - y;
}

// 곱셈 함수 - 개별 export 하지 않음
function multiple(x, y) {
  return x * y;
}

// 나눗셈 함수 - 개별 export 하지 않음
function divide(x, y) {
  return x / y;
}

// 총점 계산 함수 - 개별 export 하지 않음
// avg 함수에서 내부적으로 사용
function sum(kor, eng, math) {
  return kor + eng + math;
}

// 평균 계산 함수 - 개별 export
// 내부적으로 sum 함수를 사용
export function avg(kor, eng, math) {
  return sum(kor, eng, math) / 3;
}

// 모든 함수를 객체로 묶어서 default export
// default export는 파일당 하나만 가능
export default { plus, minus, multiple, divide, sum, avg };
