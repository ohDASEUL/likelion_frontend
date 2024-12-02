function sayHello(strings, ...values) {
  // 만약 strings가 없다면 빈 문자열 반환
  if (!strings) return "";

  // 결과 문자열을 저장할 변수
  let result = "";

  // strings와 values를 번갈아가며 처리
  // strings는 항상 values보다 1개 더 많으므로 values.length만큼 반복
  for (let i = 0; i < values.length; i++) {
    result += strings[i]; // 일반 문자열 추가
    result += `<strong>${values[i]}</strong>`; // 강조할 값을 strong 태그로 감싸서 추가
  }

  // 마지막 문자열 추가 (strings의 마지막 요소)
  result += strings[strings.length - 1];

  return result;
}

const result = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", "입니다."],
  "무지",
  "맑음"
);
console.log(result);
// => 안녕하세요. <strong>무지</strong>님. 오늘 날씨는 <strong>맑음</strong>입니다.

const result2 = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", "입니다. 즐거운 ", " 보내세요"],
  "데이지",
  "흐림",
  "하루"
);
console.log(result2);
// => 안녕하세요. <strong>데이지</strong>님. 오늘 날씨는 <strong>흐림</strong>입니다. 즐거운 <strong>하루</strong> 보내세요
