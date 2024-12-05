// setTimeout을 사용한 비동기 처리 (콜백 없음)
function f1() {
  console.log(`2. f1 작업 시작.`);
  console.log(`3. f1 작업중...`);

  setTimeout(() => {
    console.log(`4. f1 작업 종료.`);
    return `f1의 결과물`; // 타이머 콜백 내부의 return은 의미 없음
  }, 1000);
  // 함수가 즉시 반환되어 undefined가 반환됨
}

function f2(f1Result) {
  console.log(`5. ${f1Result}로 f2 작업 시작.`); // f1Result는 undefined
  console.log(`6. f2 작업중...`);

  setTimeout(() => {
    console.log(`7. f2 작업 종료.`);
    return `최종 결과물`; // 마찬가지로 의미 없는 return
  }, Math.random() * 2000);
}

// 비동기 처리가 제대로 동작하지 않는 예제
function test() {
  const f1Result = f1(); // undefined 반환
  const result = f2(f1Result); // undefined 반환
  console.log("8. ", result);
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
