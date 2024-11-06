"use strict";

// 상수 정의
const ERROR_MESSAGES = {
  EMPTY_ID: "아이디를 입력하세요.",
  INVALID_ID: "아이디는 영문자와 숫자만 사용할 수 있습니다.",
  EMPTY_PASSWORD: "비밀번호를 입력하세요.",
  INVALID_PASSWORD: "패스워드는 영문자, 숫자 조합 6자 이상이어야 합니다."
};

// DOM 요소 선택
const result = document.getElementById("result");
const loginForm = document.getElementById("loginForm");
const loginId = document.getElementById("loginId");
const loginPW = document.getElementById("loginPW");
const submitButton = loginForm.querySelector('button[type="submit"]');
const idError = document.getElementById("idError");
const pwError = document.getElementById("pwError");
const passwordStrength = document.getElementById("passwordStrength");

// 정규 표현식 정의
const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
const regExpId = /^[a-zA-Z0-9]+$/;

// 유효성 검사 함수
const validatePassword = password => regExpPassword.test(password);
const validateId = id => regExpId.test(id);

// 폼의 유효성을 검사하는 함수
function checkFormValidity() {
  const isIdValid = validateId(loginId.value);
  const isPasswordValid = validatePassword(loginPW.value);

  if (loginId.value && loginPW.value) {
    if (isIdValid && isPasswordValid) {
      submitButton.disabled = false;
      idError.textContent = "";
      pwError.textContent = "";
    } else {
      submitButton.disabled = true;
      if (!isIdValid) {
        idError.textContent = ERROR_MESSAGES.INVALID_ID;
      }
      if (!isPasswordValid) {
        pwError.textContent = ERROR_MESSAGES.INVALID_PASSWORD;
      }
    }
  } else {
    submitButton.disabled = true;
  }
}

// 특수문자 입력 방지 함수
function preventSpecialChars(event) {
  if (!regExpId.test(event.key)) {
    event.preventDefault();
  }
}

// 비밀번호 강도 체크 함수
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.match(/[a-z]+/)) strength += 1;
  if (password.match(/[A-Z]+/)) strength += 1;
  if (password.match(/[0-9]+/)) strength += 1;
  if (password.match(/[$@#&!]+/)) strength += 1;

  switch (strength) {
    case 0:
      passwordStrength.textContent = "매우 약함";
      passwordStrength.style.color = "red";
      break;
    case 1:
      passwordStrength.textContent = "약함";
      passwordStrength.style.color = "orange";
      break;
    case 2:
      passwordStrength.textContent = "중간";
      passwordStrength.style.color = "yellow";
      break;
    case 3:
      passwordStrength.textContent = "강함";
      passwordStrength.style.color = "green";
      break;
    case 4:
      passwordStrength.textContent = "매우 강함";
      passwordStrength.style.color = "darkgreen";
      break;
  }
}

// 디바운스 함수
function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

// 이벤트 리스너 설정
loginId.addEventListener("keypress", preventSpecialChars);
loginId.addEventListener("input", debounce(() => {
  idError.textContent = "";
  checkFormValidity();
}, 300));

loginPW.addEventListener("input", debounce(() => {
  pwError.textContent = "";
  checkFormValidity();
  checkPasswordStrength(loginPW.value);
}, 300));

// 폼 제출 이벤트 처리
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  if (!loginId.value.trim()) {
    idError.textContent = ERROR_MESSAGES.EMPTY_ID;
    isValid = false;
  } else if (!validateId(loginId.value)) {
    idError.textContent = ERROR_MESSAGES.INVALID_ID;
    isValid = false;
  } else {
    idError.textContent = "";
  }

  if (!loginPW.value.trim()) {
    pwError.textContent = ERROR_MESSAGES.EMPTY_PASSWORD;
    isValid = false;
  } else if (!validatePassword(loginPW.value)) {
    pwError.textContent = ERROR_MESSAGES.INVALID_PASSWORD;
    isValid = false;
  } else {
    pwError.textContent = "";
  }

  if (isValid) {
    result.innerHTML = "";
    result.textContent = `${loginId.value}로 로그인을 시도합니다.`;
    // 실제 애플리케이션에서는 여기에 서버로 데이터를 전송하는 로직이 들어갑니다.
    // 예: fetch('/login', { method: 'POST', body: new FormData(loginForm) })
  }
});