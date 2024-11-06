"use strict";

let message = {
  profileImg: '',
  userName: '',
  date: '',
  talkText: '',
  imoge: '',
  
  displayMessageOnScreen: function () {
    let chatDisplayDiv = document.getElementById("chatDisplay");

    chatDisplayDiv.innerHTML = `
      <p><strong>User:</strong> ${this.userName}</p>
      <p><strong>Date:</strong> ${this.date}</p>
      <p><strong>Message:</strong> ${this.talkText}</p>
      <p><strong>Reactions:</strong> ${this.imoge}</p>
    `;
  },
};

function getCurrentDate() {
  let now = new Date();
  return `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function createMessage() {
  // Prompt the user for inputs
  message.userName = prompt("이름이 뭔가요?");
  message.date = getCurrentDate();  
  message.talkText = prompt("채팅을 입력하세요:");
  message.imoge = prompt("보내실 리액션은 무엇인가요? (ex: 👍, ❤️, etc.)");

  // Display the message on the screen
  message.displayMessageOnScreen();
}
