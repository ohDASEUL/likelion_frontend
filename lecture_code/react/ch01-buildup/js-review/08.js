// 소수 판별 함수 정의 + 메모이제이션 적용
var isPrime = memo(function (num) {
  // 실행 시간 측정 시작
  console.time("소요 시간");
  console.log("소수 판별 시작.", num);

  // 소수 판별 로직
  let prime = num > 1; // 1보다 큰 수만 소수 후보가 될 수 있음

  // 2부터 num-1까지 순회하며 나누어 떨어지는지 확인
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      // 나누어 떨어지면 소수가 아님
      prime = false;
      break; // 더 이상 검사할 필요 없음
    }
  }

  // 결과 출력 및 시간 측정 종료
  console.log("소수 판별 결과.", prime);
  console.timeEnd("소요 시간");
  return prime;
});

// 메모이제이션 기능을 추가하는 고차 함수
function memo(fn) {
  // 새로운 함수를 반환 (클로저 생성)
  return function (args) {
    // 캐시 객체가 없다면 생성
    fn._cache = fn._cache || {};

    // 캐시에 결과가 있는지 확인
    if (fn._cache[args] !== undefined) {
      // 캐시에 있으면 (cache hit) 캐시된 값을 반환
      console.log("cache hit!", args, fn._cache[args]);
      return fn._cache[args];
    } else {
      // 캐시에 없으면 (cache miss)
      // 1. 함수 실행
      // 2. 결과를 캐시에 저장
      // 3. 결과 반환
      return (fn._cache[args] = fn(args));
    }
  };
}

// 함수 실행 테스트
isPrime(1); // 첫 실행: 계산 수행
isPrime(2); // 첫 실행: 계산 수행
isPrime(3); // 첫 실행: 계산 수행
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007); // 첫 실행: 큰 수라서 계산에 시간 소요
isPrime(1000000007); // 두 번째 실행: 캐시된 결과 즉시 반환
isPrime(1000000007); // 세 번째 실행: 캐시된 결과 즉시 반환
