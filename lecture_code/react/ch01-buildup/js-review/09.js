function sayHello(strings, ...values) {
  // strings: 평문 문자열 배열
  // values: 강조할 값 배열
  let result = "";

  // strings와 values를 교차하여 병합
  strings.forEach((str, i) => {
    result += str; // 평문 추가
    if (values[i] !== undefined) {
      result += `<strong>${values[i]}</strong>`; // 강조 문구 추가
    }
  });

  return result;
}

// 예제 1
const result = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다."],
  "무지",
  "맑음"
);
console.log(result);
// 출력: 안녕하세요. <strong>무지</strong>님. 오늘 날씨는 <strong>맑음</strong> 입니다.

// 예제 2
const result2 = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다. 즐거운 ", " 보내세요."],
  "데이지",
  "흐림",
  "하루"
);
console.log(result2);
// 출력: 안녕하세요. <strong>데이지</strong>님. 오늘 날씨는 <strong>흐림</strong> 입니다. 즐거운 <strong>하루</strong> 보내세요.
