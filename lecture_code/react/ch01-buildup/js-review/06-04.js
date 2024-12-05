// Promise를 사용한 비동기 처리
function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      console.log(`4. f1 작업 종료.`);
      resolve`f1의 결과물`; // 성공 시 결과 전달
      // reject(new Error("에러 발생")); // 실패 시 에러 전달
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      console.log(`7. f2 작업 종료.`);
      resolve`최종 결과물`; // 성공 시 결과 전달
    }, Math.random() * 2000);
  });
}

// Promise 체이닝을 사용한 코드
function test() {
  f1()
    .then(f2)
    .then((result) => console.log("8", result))
    .catch((err) => {}); // 에러 처리
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
