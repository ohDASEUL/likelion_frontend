"use strict";

// 유저 정보를 담는 생성자 함수
function Member(id, nickname, photo) {
  this.id = id; // 유저 ID
  this.nickname = nickname; // 유저 닉네임
  this.photo = photo; // 유저 프로필 사진 경로
}

// 이모지 정보를 담는 생성자 함수
function Emoji(emojiId) {
  this.emojiId = emojiId; // 이모지 ID
  this.count = 0; // 이모지를 누른 횟수
  this.members = []; // 이모지를 누른 유저들의 ID 리스트
  // 이모지를 누르면 count를 증가시키고 유저 ID를 추가
  this.add = function (memberId) {
    this.count++;
    this.members.push(memberId);
  };
}

// 메시지 정보를 담는 생성자 함수
function Message(msg, member) {
  this.msgId = ++msgId; // 메시지 고유 ID
  this.msg = msg; // 메시지 내용
  this.member = member; // 메시지를 작성한 유저 (Member 객체)
  this.date = new Date().toLocaleString(); // 메시지 작성 날짜와 시간
  this.emojis = []; // 메시지에 추가된 이모지 목록
  // 이모지 추가 함수
  this.addEmoji = function (emojiId, memberId) {
    let emoji = this.emojis.find((item) => item.emojiId === emojiId); // 해당 이모지가 있는지 확인
    if (!emoji) {
      // 이모지가 없으면 새로 추가
      emoji = new Emoji(emojiId);
      this.emojis.push(emoji);
    }
    emoji.add(memberId); // 이모지 count 및 누른 유저 목록 업데이트
  };
}

// 전체 메시지를 저장할 배열
let messages = [];

// 메시지 ID를 증가시키기 위한 변수
let msgId = 0;

// DOM 요소들을 선택해서 변수로 저장
const nicknameInputNode = document.getElementById("nicknameInput");
const idInputNode = document.getElementById("idInput");
const msgInputNode = document.getElementById("msgInput");
const chatMainNode = document.getElementById("chat-main"); // 채팅 메시지가 표시될 영역

// 메시지를 화면에 출력하는 함수
function printMessage(message) {
  // 메뉴 이미지(세 개의 점)를 동적으로 생성
  const menuImageNode = document.createElement('img');
  menuImageNode.setAttribute('src', 'images/menu.jpg'); // 이미지 경로 설정
  menuImageNode.setAttribute('alt', 'Menu Image'); // 대체 텍스트 설정

  const menuButton = document.createElement('button'); // 메뉴 버튼 생성
  menuButton.setAttribute('class', 'msg-info-menu dropbtn'); // 버튼 클래스 설정
  menuButton.appendChild(menuImageNode); // 버튼에 이미지 추가

  // "좋아요" 링크 생성
  let link1 = document.createElement('a');
  link1.setAttribute('href', '#');
  link1.setAttribute('onclick', `emojiClick('${message.msgId}','thumbup')`); // 이모지 클릭 시 이벤트 호출
  let linkText = document.createTextNode('좋아요');
  link1.appendChild(linkText);

  // "넵" 링크 생성
  let link2 = document.createElement('a');
  link2.setAttribute('href', '#');
  link2.setAttribute('onclick', `emojiClick('${message.msgId}','ok')`);
  let linkText2 = document.createTextNode('넵');
  link2.appendChild(linkText2);

  // 드롭다운 메뉴 생성
  let links = document.createElement('div');
  links.setAttribute('class', 'dropdown-content');
  links.appendChild(link1); // "좋아요" 링크 추가
  links.appendChild(link2); // "넵" 링크 추가

  let dropdown = document.createElement('div');
  dropdown.setAttribute('class', 'dropdown');
  dropdown.appendChild(menuButton); // 메뉴 버튼 추가
  dropdown.appendChild(links); // 링크들 추가

  // 유저 정보 및 메시지 시간 표시
  let name = document.createElement('div');
  name.setAttribute('class', 'msg-info-name');
  name.appendChild(document.createTextNode(message.member.nickname)); // 유저 닉네임 표시

  let date = document.createElement('div');
  date.setAttribute('class', 'msg-info-time');
  date.appendChild(document.createTextNode(message.date)); // 메시지 작성 시간 표시

  let msgInfo = document.createElement('div');
  msgInfo.setAttribute('class', 'msg-info');
  msgInfo.appendChild(name); // 닉네임 추가
  msgInfo.appendChild(date); // 시간 추가
  msgInfo.appendChild(dropdown); // 드롭다운 메뉴 추가

  // 메시지 텍스트 표시
  let msgText = document.createElement('div');
  msgText.setAttribute('class', 'msg-text');
  msgText.appendChild(document.createTextNode(message.msg)); // 메시지 내용 추가

  const msgBubble = document.createElement('div');
  msgBubble.setAttribute('class', 'msg-bubble');
  msgBubble.appendChild(msgInfo); // 유저 정보 및 메뉴 추가
  msgBubble.appendChild(msgText); // 메시지 내용 추가

  // 프로필 사진 표시
  const photoNode = document.createElement('img');
  photoNode.setAttribute('src', message.member.photo); // 프로필 사진 경로 설정
  photoNode.setAttribute('class', 'msg-img'); // 프로필 사진 스타일 설정

  // 전체 메시지 박스 생성
  const mainNode = document.createElement('div');
  mainNode.setAttribute('id', `msgId-${message.msgId}`); // 메시지 고유 ID 설정
  mainNode.setAttribute('class', 'msg left-msg'); // 스타일 클래스 설정
  mainNode.appendChild(photoNode); // 프로필 사진 추가
  mainNode.appendChild(msgBubble); // 메시지 및 메뉴 추가

  chatMainNode.appendChild(mainNode); // 최종적으로 메시지를 채팅 창에 추가
}

// 메시지를 전송하는 함수
function send(e) {
  e.preventDefault(); // 기본 폼 제출 동작 방지

  // 입력된 데이터 추출
  let id = idInputNode.value;
  let nickname = nicknameInputNode.value;
  let msg = msgInputNode.value;

  // 유효성 검증: ID, 닉네임, 메시지가 비어있는지 확인
  if (id.trim().length == 0 || nickname.trim().length == 0 || msg.trim().length == 0) {
    alert("아이디, 닉네임, 메시지를 입력하세요"); // 비어있으면 경고
    return;
  } else {
    // 입력된 데이터를 화면에서 지움
    idInputNode.value = "";
    nicknameInputNode.value = "";
    msgInputNode.value = "";

    // Member 객체 생성 (프사는 ID와 동일한 파일명, 없을 시 기본 이미지 사용)
    let member = new Member(id, nickname, `images/${id}.jpg`);

    // Message 객체 생성
    let message = new Message(msg, member);

    // 메시지를 전체 메시지 배열에 추가
    messages.push(message);

    // 메시지를 화면에 출력
    printMessage(message);
  }
}

// 이모지 출력 함수 (추후 구현)
function printEmoji(message) {
  // 각 메시지 객체의 이모지 배열을 가져옴
  let emojis = message.emojis;
  
  if (emojis.length > 0) {
    // 이모지가 출력되어야 하는 노드
    const messageBubble = document.querySelector(`#msgId-${message.msgId} .msg-bubble`);

    // 기존 이모지 노드를 찾고 삭제
    const emojiNode  = messageBubble.querySelector('.emojis');
    if (emojiNode ) {
      messageBubble.removeChild(emojiNode );
    }

    // 새로운 이모지 노드 생성
    const emojisNode = document.createElement('div');
    emojisNode.setAttribute('class', 'emojis');

    emojis.forEach((emoji) => {
      const img = document.createElement('img');
      img.setAttribute('class', 'emoji dropbtn');
      img.setAttribute('src', `images/${emoji.emojiId}.jpg`);
      
      const span = document.createElement('span');
      let nicknameText = emoji.members.join(', ');
      span.appendChild(document.createTextNode(nicknameText));

      const dropdownContent = document.createElement('div');
      dropdownContent.setAttribute('class', 'dropdown-content');
      dropdownContent.appendChild(span);

      const dropdown = document.createElement('div');
      dropdown.setAttribute('class', 'dropdown');
      dropdown.appendChild(img);
      dropdown.appendChild(dropdownContent);

      const span2 = document.createElement('span');
      span2.setAttribute('class', 'emoji-count');
      span2.appendChild(document.createTextNode(`${emoji.count}`));

      emojisNode.appendChild(dropdown);
      emojisNode.appendChild(span2);
    });

    messageBubble.appendChild(emojisNode);
  }
}


// 이모지 추가 클릭 이벤트 처리 (추후 구현)
function emojiClick(msgId, emojiId) {
  // 이모지 추가 유저 id를 테스트를 위해서 prompt로 받아들인다
  let memberId = prompt('멤버 id를 입력해주세요');
  
  if (memberId == null) {
    alert('입력을 하지 않았습니다');
  } else {
    // msgId로 배열에서 이모지를 추가하고자 하는 메시지 객체를 획득
    let index = messages.findIndex((item) => item.msgId == msgId);
    
    if (index !== -1) {
      messages[index].addEmoji(emojiId, memberId);

      // 해당 메시지에 이모지 추가 및 화면 출력
      printEmoji(messages[index]);
    }
  }
}
