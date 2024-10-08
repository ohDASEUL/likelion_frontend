let intervalId; // 시간 간격을 관리하기 위한 변수를 선언합니다. setInterval()의 반환 값을 저장할 예정입니다.

function changeHide() {
  const btnElement = document.getElementById("btn"); // 'btn' id를 가진 요소를 가져와 btnElement에 저장합니다.
  const timeDisplay = document.getElementById("timeDisplay"); // 'timeDisplay' id를 가진 요소를 가져와 timeDisplay에 저장합니다.

  if (btnElement.innerText === "show") { // 버튼의 텍스트가 'show'일 경우
    btnElement.innerText = "hide"; // 버튼의 텍스트를 'hide'로 변경합니다.
    intervalId = setInterval(now); // 1초마다 now 함수를 반복 실행하고, 그 결과를 intervalId에 저장합니다.
  } else { // 버튼의 텍스트가 'show'가 아닐 경우 ('hide'일 경우)
    btnElement.innerText = "show"; // 버튼의 텍스트를 'show'로 변경합니다.
    clearInterval(intervalId); // setInterval()에 의해 설정된 시간 간격을 중지합니다.
    timeDisplay.innerText = ""; // 시간을 표시하는 요소의 텍스트를 삭제합니다.
  }
}

const now = () => { // 현재 시간을 계산하여 화면에 표시하는 함수입니다.
  const date = new Date(); // 현재 날짜와 시간을 가져옵니다.
  let hours = date.getHours(); // 현재 시간 (시)를 가져옵니다.
  let minutes = date.getMinutes(); // 현재 시간 (분)를 가져옵니다.
  let seconds = date.getSeconds(); // 현재 시간 (초)를 가져옵니다.

  // 시, 분, 초가 10보다 작으면 앞에 '0'을 붙여서 두 자리 수로 만듭니다.
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${hours}:${minutes}:${seconds}`; // 시간, 분, 초를 hh:mm:ss 형식의 문자열로 조합합니다.
  document.getElementById("timeDisplay").innerText = time; // 'timeDisplay' id를 가진 요소에 현재 시간을 표시합니다.
};

// const now = () => {
//     const date = new Date();
//     let hours = String(date.getHours()).padStart(2, '0'); // 'hours'를 문자열로 변환하고, 두 자리가 되도록 앞에 '0'을 추가합니다.
//     let minutes = String(date.getMinutes()).padStart(2, '0'); // 'minutes'를 문자열로 변환하고, 두 자리가 되도록 앞에 '0'을 추가합니다.
//     let seconds = String(date.getSeconds()).padStart(2, '0'); // 'seconds'를 문자열로 변환하고, 두 자리가 되도록 앞에 '0'을 추가합니다.
  
//     const time = `${hours}:${minutes}:${seconds}`;
//     document.getElementById("timeDisplay").innerText = time;
// };


const btn = document.getElementById("btn"); // 'btn' id를 가진 요소를 가져옵니다.
btn.addEventListener("click", changeHide); // 'btn' 요소에 클릭 이벤트 리스너를 추가하고, 클릭 시 changeHide 함수를 호출하도록 설정합니다.
