"use strict";

// 상수 정의
const ERROR_MESSAGES = {
  EMPTY_ID: "아이디를 입력하세요.",
  INVALID_ID: "아이디는 영문자와 숫자만 사용할 수 있습니다.",
  EMPTY_PASSWORD: "비밀번호를 입력하세요.",
  INVALID_PASSWORD: "패스워드는 영문자, 숫자 조합 6자 이상이어야 합니다.",
};

// DOM 요소 선택
let result = document.getElementById("result");
let loginForm = document.getElementById("loginForm");
let loginId = document.getElementById("loginId");
let loginPW = document.getElementById("loginPW");
let submitButton = loginForm.querySelector('button[type="submit"]');
let idError = document.createElement("div");
let pwError = document.createElement("div");

// 에러 메시지 요소 추가
// 각 입력 필드 바로 아래에 에러 메시지를 표시할 요소를 추가
loginId.insertAdjacentElement("afterend", idError);
loginPW.insertAdjacentElement("afterend", pwError);

// 에러 메시지 스타일 설정
// 에러 메시지를 빨간색으로 표시하여 사용자의 주의를 끌도록 함
idError.style.color = "red";
pwError.style.color = "red";

// 결과를 화면에 출력하는 함수
// 로그인 시도 결과를 사용자에게 보여주기 위해 사용
function printResult(msg) {
  result.innerHTML += msg + "<br>";
}

// 정규 표현식 정의
// 비밀번호: 영문자, 숫자 조합으로 6~16자
let regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
// 아이디: 영문자와 숫자만 허용
let regExpId = /^[a-zA-Z0-9]+$/;

// 비밀번호 유효성 검사 함수
// 입력된 비밀번호가 정규식 패턴과 일치하는지 확인
function validatePassword(password) {
  return regExpPassword.test(password);
}

// 아이디 유효성 검사 함수
// 입력된 아이디가 영문자와 숫자로만 구성되었는지 확인
function validateId(id) {
  return regExpId.test(id);
}

// 폼의 유효성을 검사하는 함수
// 아이디와 비밀번호의 유효성을 검사하고, 그에 따라 제출 버튼의 활성화 여부와 에러 메시지를 설정
function checkFormValidity() {
  const isIdValid = loginId.value.trim() !== "" && validateId(loginId.value);
  const isPasswordValid =
    loginPW.value.trim() !== "" && validatePassword(loginPW.value);

  if (loginId.value.trim() === "") {
    idError.textContent = ERROR_MESSAGES.EMPTY_ID;
  } else if (!validateId(loginId.value)) {
    idError.textContent = ERROR_MESSAGES.INVALID_ID;
  } else {
    idError.textContent = "";
  }

  if (loginPW.value.trim() === "") {
    pwError.textContent = ERROR_MESSAGES.EMPTY_PASSWORD;
  } else if (!validatePassword(loginPW.value)) {
    pwError.textContent = ERROR_MESSAGES.INVALID_PASSWORD;
  } else {
    pwError.textContent = "";
  }

  submitButton.disabled = !(isIdValid && isPasswordValid);
}

// 특수문자 입력 방지 함수
// 아이디 입력 필드에 특수문자가 입력되는 것을 방지
function preventSpecialChars(event) {
  if (!regExpId.test(event.key)) {
    event.preventDefault();
  }
}

// 모든 입력 필드에 대한 이벤트 리스너 설정
[loginId, loginPW].forEach((input) => {
  // 포커스를 잃었을 때 유효성 검사
  input.addEventListener("blur", checkFormValidity);
  // 입력 중 에러 메시지 초기화 및 유효성 검사
  input.addEventListener("input", () => {
    input.nextElementSibling.textContent = "";
    checkFormValidity();
  });
});

// 아이디 입력 필드에 특수문자 입력 방지 이벤트 리스너 추가
loginId.addEventListener("keypress", preventSpecialChars);

// 폼 제출 이벤트 처리
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 기본 제출 동작 방지

  // 입력 검증
  let isValid = true;

  // 아이디 검증
  if (!loginId.value.trim()) {
    idError.textContent = ERROR_MESSAGES.EMPTY_ID;
    isValid = false;
  } else if (!validateId(loginId.value)) {
    // 이 부분은 그냥 보너스로 넣어봤음!! 보통 id에는 특수문자를 안 넣으니까
    idError.textContent = ERROR_MESSAGES.INVALID_ID;
    isValid = false;
  } else {
    idError.textContent = "";
  }

  // 비밀번호 검증
  if (!loginPW.value.trim()) {
    pwError.textContent = ERROR_MESSAGES.EMPTY_PASSWORD;
    isValid = false;
  } else if (!validatePassword(loginPW.value)) {
    pwError.textContent = ERROR_MESSAGES.INVALID_PASSWORD;
    isValid = false;
  } else {
    pwError.textContent = "";
  }

  // 모든 필드가 유효한 경우
  if (isValid) {
    result.innerHTML = ""; // 결과 영역 초기화
    printResult(`${loginId.value} , ${loginPW.value} 로 로그인을 시도합니다.`);
  }
});
