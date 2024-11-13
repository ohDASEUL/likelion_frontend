export function plus(x, y) {
  return x + y;
}

export function minus(x, y) {
  return x - y;
}

export default function multiple(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function sum(kor, eng, math) {
  return kor + eng + math;
}

export function avg(kor, eng, math) {
  return sum(kor, eng, math) / 3;
}
