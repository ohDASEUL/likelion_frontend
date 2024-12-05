// 값(data1)과 참조(data2)의 차이를 보여주는 함수
function func(data1, data2) {
  // data1은 number 타입으로 값의 복사가 일어남
  // data2는 array 타입으로 참조가 전달됨
  (data1 += 10), (data2[0] += 10);
  console.log(data1, data2[0]); // 함수 내부에서의 값 출력
}

// 원시 타입(number)과 참조 타입(array) 선언
var d1 = 80; // 원시 타입(number): 값이 직접 저장됨
var d2 = [80]; // 참조 타입(array): 메모리 주소가 저장됨

// typeof 연산자로 각 변수의 타입 확인
console.log(typeof d1, typeof d2); // 'number', 'object' 출력

console.log("===== 함수 호출 이전 =====");
console.log(d1, d2[0]); // 초기값 출력: 80, 80

console.log("===== 함수 호출 =====");
func(d1, d2); // 함수 호출: d1은 값으로 전달, d2는 참조로 전달

console.log("===== 함수 호출 이후 =====");
console.log(d1, d2[0]); // 최종값 출력
// d1은 원본이 변경되지 않음(80)
// d2[0]은 원본이 변경됨(90)
