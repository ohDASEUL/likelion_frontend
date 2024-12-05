// Promise와 async/await를 함께 사용
function f1() {
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);

    setTimeout(() => {
      console.log(`4. f1 작업 종료.`);
      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생'));
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);

    setTimeout(() => {
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
    }, Math.random() * 2000);
  });
}

// async/await를 사용한 더 직관적인 비동기 처리
async function test() {
  try {
    const f1Result = await f1(); // Promise가 resolve될 때까지 대기
    const result = await f2(f1Result); // 다음 Promise가 resolve될 때까지 대기
    console.log("8.", result);
  } catch (err) {
    console.error(err); // 에러 처리
  }
}

console.log("1. 테스트 시작.");
test();
console.log("9. 테스트 완료.");
