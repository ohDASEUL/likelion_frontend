"use strict";

let webSocket;
let nickname;
let resultNode;
let msgNode;

function connection() {
  const nicknameNode = document.getElementById("nickname");
  resultNode = document.getElementById("results");
  msgNode = document.getElementById("msg");

  nickname = nicknameNode.value.trim();
  if (nickname) {
    // 서버와 연결...
    webSocket = new WebSocket("ws://localhost:3000");

    const connectNode = document.getElementById("connectDiv");
    const msgNode = document.getElementById("msgDiv");
    const nicknameResultNode = document.getElementById("nicknameResult");

    msgNode.style.display = "block";
    connectNode.style.display = "none";
    nicknameResultNode.innerHTML = nickname;
  } else {
    alert("nickname을 입력해주세요");
  }
  nicknameNode.value = "";

  // 서버에서 데이터 들어올 때
  webSocket.onmessage = (event) => {
    const liNode = document.createElement("li");
    const jsonData = JSON.parse(event.data); // 서버에서 받은 데이터
    liNode.innerHTML = jsonData.nickname
      ? `${jsonData.nickname}: ${jsonData.msg}`
      : `${jsonData.msg}`;
    resultNode.appendChild(liNode);
  };
}

function send() {
  let msg = msgNode.value.trim();
  if (msg) {
    webSocket.send(
      JSON.stringify({
        nickname,
        msg,
      })
    )
    const liNode = document.createElement('li');
    liNode.innerHTML = `${nickname} => ${msg}`
    resultNode.appendChild(liNode);
  }else{
    alert("메시지를 입력해주세요")
  }
}
