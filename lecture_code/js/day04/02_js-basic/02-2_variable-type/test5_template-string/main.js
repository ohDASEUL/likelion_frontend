let name = "홍길동";
const calSum = (no) => {
  let sum = 0;
  for (i = 1; i <= no; i++) {
    sum += i;
  }
  return sum;
};

// 문자열 데이터 ... 여러 라인
// let a = 'hello
// world'
// let a = 'hello ' + 'world' + 'hi'

// js code적으로는 개행에 의한 데이터(\n)이 유지되지만 html에서는 모든 화면은 태그...
// let a = `
// hello <br/>
// world
// `;
// document.write(a);

document.write(`
    안녕하세요 ${name}님, 함수 호출 결과는 ${calSum(10)}, ${10+20}
`);

// template string의 ${}에는 expression code만 가능.
// 아래처럼 statement 코드는 불가능.
// let a = `
// ${let data=10}
// `
