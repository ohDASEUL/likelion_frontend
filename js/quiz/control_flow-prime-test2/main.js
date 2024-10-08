"use strict";
//어떤 수가 소수인지를 판단, 2부터 증가시셔서 나누어야 한다. ==> loop
//2부터 입력받은 수까지 증가시키면서 소수인지를 판단한다. ==>loop

// 소수 판별 함수
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const primeTest = () => {
  let no = prompt("2 이상의 숫자를 입력하세요");
  let message = "";

  if (isNaN(no) || no < 2) {
    message = "2 이상의 숫자를 입력하세요.";
  } else {
    no = parseInt(no);
    let primes = [];
    for (let i = 2; i < no; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    message = `입력하신 ${no} 까지 소수는 ${primes.join(', ')} 입니다.`;
  }
  document.querySelector("#result").innerHTML = message;
};