// "use strict";

"use strict";

// 소수 판별 함수
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// 입력받고 결과 표시하는 공통 함수
const primeTest = (testFunc) => {
  let no = parseInt(prompt("2 이상의 숫자를 입력하세요"));
  let message = isNaN(no) || no < 2 ? "2 이상의 숫자를 입력하세요" : testFunc(no) ? `${no}은(는) 소수입니다.` : `${no}은(는) 소수가 아닙니다.`;
  document.querySelector("#result").innerHTML = message;
};

// if-else
const primeTestIfElse = () => primeTest(isPrime);

// for
const primeTestFor = () => primeTest((num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
});

// while
const primeTestWhile = () => primeTest((num) => {
  let i = 2;
  while (i < num) {
    if (num % i === 0) return false;
    i++;
  }
  return true;
});

// do-while
const primeTestDoWhile = () => primeTest((num) => {
  let i = 2;
  do {
    if (num % i === 0) return false;
    i++;
  } while (i < num);
  return true;
});

// switch
const primeTestSwitch = () => primeTest((num) => {
  switch (true) {
    case (num === 2):
      return true;
    case (num % 2 === 0):
      return false;
    default:
      for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
      }
      return true;
  }
});
