"use strict";

// DOM 요소 선택
let result = document.getElementById("result");
let form = document.getElementById("form");
let name = document.getElementById("name");
let tel = document.getElementById("tel");
let job = document.getElementById("job");
let submitButton = form.querySelector('button[type="submit"]');

// 결과를 화면에 출력
function printResult(msg) {
  result.innerHTML += msg + "<br>";
}

// 폼의 유효성을 검사
function checkFormValidity() {
  // 모든 필드가 채워져 있으면 제출 버튼 활성화, 그렇지 않으면 비활성화
  if (name.value && tel.value && job.value) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// 폼 제출 이벤트 처리
form.addEventListener("submit", (e) => {
  e.preventDefault(); // 기본 제출 동작 방지
  // 모든 필드가 채워져 있는지 다시 한 번 확인
  if (name.value && tel.value && job.value) {
    result.innerHTML = ""; // 결과 영역 초기화
    // 입력된 정보 출력
    printResult("이름 : " + name.value);
    printResult("전화번호 : " + tel.value);
    printResult("직업 : " + job.value);
  }
});

// 폼 리셋 이벤트 처리
form.addEventListener("reset", () => {
  result.innerHTML = ""; // 결과 영역 초기화
  checkFormValidity(); // 버튼 상태 업데이트
});

// 모든 입력 필드에 대한 이벤트 리스너 설정
[name, tel, job].forEach((input) => {
  // 입력 값이 변경될 때마다 폼 유효성 검사
  input.addEventListener("input", checkFormValidity);

  // 포커스를 받으면 배경색 변경
  input.addEventListener("focus", (e) => {
    e.target.style.background = "lightgray";
  });

  // 포커스를 잃으면 배경색 원래대로
  input.addEventListener("blur", (e) => {
    e.target.style.background = "";
  });
});

// 직업 선택 변경 이벤트 처리
job.addEventListener("change", (e) => {
  checkFormValidity(); // 폼 유효성 검사
});

// 전화번호 입력 란 꾸미기..

// 전화번호 형식
tel.addEventListener("input", function (e) {
  // 숫자만 입력 받고 xxx-xxxx-xxxx 형식으로 변환
  var x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
  checkFormValidity(); // 폼 유효성 검사
});

// 전화번호 최대 길이 설정
tel.setAttribute("maxlength", "13");

// 이름 입력 시 숫자랑 특수문자는 입력 못하게
document.getElementById("name").addEventListener("input", function (e) {
  var inputValue = e.target.value;
  var filteredValue = inputValue.replace(/[^a-zA-Z\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");

  if (inputValue !== filteredValue) {
    e.target.value = filteredValue;
  }
});

// 초기 상태에서 제출 버튼 비활성화
submitButton.disabled = true;
