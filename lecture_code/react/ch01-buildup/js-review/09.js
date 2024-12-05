// Tagged Template Literal을 사용한 문자열 조합 함수

// sayHello 함수: 문자열 템플릿의 정적 부분(strings)과 동적 부분(values)을 받아 처리
function sayHello(strings, ...values) {
  // strings: 템플릿 리터럴의 정적 부분들의 배열
  // values: 템플릿 리터럴의 표현식들의 평가값 배열
  console.log(strings); // 정적 문자열 부분들
  console.log(values); // 동적으로 삽입될 값들

  let result = "";

  // strings와 values를 번갈아가며 조합
  for (let i = 0; i < strings.length; i++) {
    // 정적 부분 추가
    result += strings[i];

    // 동적 부분 추가 (있는 경우에만)
    const value = values[i] ? `<strong>${values[i]}</strong>` : "";
    result += value;
  }

  return result;
}

// 일반적인 함수 호출 방식
const result = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다."],
  "무지",
  "맑음"
);
console.log(result);
// 출력: "안녕하세요. <strong>무지</strong>님. 오늘 날씨는 <strong>맑음</strong> 입니다."

// 더 많은 값을 포함한 예제
const result2 = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다. 즐거운 ", " 보내세요."],
  "데이지",
  "흐림",
  "하루"
);
console.log(result2);
// 출력: "안녕하세요. <strong>데이지</strong>님. 오늘 날씨는 <strong>흐림</strong> 입니다. 즐거운 <strong>하루</strong> 보내세요."

// 변수를 사용한 예제
const userName = "무지";
const weather = "맑음";

// 일반 템플릿 리터럴
const str = `안녕하세요. ${userName}님. 오늘 날씨는 ${weather} 입니다.`;

// 함수 호출 방식
const result3 = sayHello(
  ["안녕하세요. ", "님. 오늘 날씨는 ", " 입니다."],
  userName,
  weather
);

// Tagged Template 방식 - 더 간단하고 직관적인 문법
const result4 = sayHello`안녕하세요. ${userName}님. 오늘 날씨는 ${weather} 입니다.`;
console.log("result4", result4);
