// 기본적인 동기 처리 방식의 코드
function f1() {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);
  // ...... // 동기 작업 수행
  console.log(`4. f1 작업 종료.`);
  return `f1의 결과물`; // 즉시 결과 반환
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`);
  console.log(`6. f2 작업중...`);
  // ...... // 동기 작업 수행
  console.log(`7. f2 작업 종료.`);
  return `최종 결과물`; // 즉시 결과 반환
}

// 순차적으로 실행되는 테스트 함수
function test() {
  const f1Result = f1(); // f1 실행 완료까지 대기
  const result = f2(f1Result); // f2 실행 완료까지 대기
  console.log("8. ", result);
}

// 실행 순서가 예측 가능한 동기 방식
console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
