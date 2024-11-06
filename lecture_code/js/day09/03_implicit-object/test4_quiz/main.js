"use strict";

// DOM 요소 선택
// 사용자 입력, 결과 표시, 오류 메시지를 위한 HTML 요소를 가져옵니다.
const input = document.getElementById("enWord");
const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

// 영어 단어를 저장할 배열
// 사용자가 입력한 영어 단어들을 저장하는 배열입니다.
let enWordArray = [];

// 결과 업데이트 함수
// 현재 단어 목록을 화면에 표시합니다.
function updateResult(words) {
  result.innerHTML = ''; // 기존 내용을 지웁니다.
  const ul = document.createElement('ul'); // 새로운 ul 요소를 생성합니다.
  words.forEach(word => {
    const li = document.createElement('li'); // 각 단어에 대해 li 요소를 생성합니다.
    li.textContent = word; // li 요소에 단어를 텍스트로 추가합니다.
    ul.appendChild(li); // li 요소를 ul에 추가합니다.
  });
  result.appendChild(ul); // 완성된 ul을 result에 추가합니다.
}

// 영어만 포함되었는지 확인하는 함수
// 입력된 텍스트가 영어 알파벳으로만 구성되어 있는지 확인합니다.
function isEnglishOnly(text) {
  return /^[a-zA-Z]+$/.test(text); // 정규표현식을 사용하여 영어 알파벳만 포함되어 있는지 테스트합니다.
}

// 오류 메시지 표시 함수
// 사용자에게 오류 메시지를 보여줍니다.
function showErrorMessage(message) {
  errorMessage.textContent = message; // 오류 메시지 텍스트를 설정합니다.
  errorMessage.style.display = 'block'; // 오류 메시지 요소를 보이게 합니다.
}

// 오류 메시지 숨기기 함수
// 오류 메시지를 화면에서 숨깁니다.
function hideErrorMessage() {
  errorMessage.textContent = ''; // 오류 메시지 텍스트를 지웁니다.
  errorMessage.style.display = 'none'; // 오류 메시지 요소를 숨깁니다.
}

// add 버튼 클릭 함수
// 사용자가 입력한 단어를 배열에 추가합니다.
function addWord() {
  const enWord = input.value.trim(); // 입력값의 앞뒤 공백을 제거합니다.
  if (enWord && isEnglishOnly(enWord)) { // 입력값이 있고 영어로만 구성되어 있다면
    enWordArray.push(enWord); // 배열에 단어를 추가합니다.
    updateResult(enWordArray); // 결과를 업데이트합니다.
    input.value = ""; // 입력 필드를 비웁니다.
    hideErrorMessage(); // 오류 메시지를 숨깁니다.
  } else {
    showErrorMessage("영어만 입력해주세요."); // 오류 메시지를 표시합니다.
    input.value = ""; // 입력 필드를 비웁니다.
  }
}

// map 버튼 클릭 함수
// 모든 단어를 대문자로 변환합니다.
function mapWords() {
  enWordArray = enWordArray.map(word => word.toUpperCase()); // 각 단어를 대문자로 변환합니다.
  updateResult(enWordArray); // 결과를 업데이트합니다.
}

// filter 버튼 클릭 함수
// 5글자 이상인 단어만 필터링합니다.
function filterWords() {
  const filteredWords = enWordArray.filter(word => word.length >= 5); // 5글자 이상인 단어만 선택합니다.
  updateResult(filteredWords); // 필터링된 결과를 표시합니다.
}

// sort 버튼 클릭 함수
// 단어를 알파벳 순으로 정렬합니다.
function sortWords() {
  const sortedWords = [...enWordArray].sort((a, b) => a.localeCompare(b)); // 배열을 복사하고 알파벳 순으로 정렬합니다.
  updateResult(sortedWords); // 정렬된 결과를 표시합니다.
}

// 입력 필드에 대한 실시간 검증
// 사용자가 입력하는 동안 실시간으로 입력값을 검증합니다.
function validateInput() {
  if (!isEnglishOnly(input.value)) { // 입력값이 영어가 아니라면
    showErrorMessage("영어만 입력해주세요."); // 오류 메시지를 표시합니다.
  } else {
    hideErrorMessage(); // 영어라면 오류 메시지를 숨깁니다.
  }
}