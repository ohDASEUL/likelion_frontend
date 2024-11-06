"use strict";

// 이모지 생성자 함수
function Emoji(id, count, members) {
  this.id = id;
  this.count = count;
  this.members = members || []; // // 이모지를 누른 사람들의 ID 배열, 기본값은 빈 배열
  // 멤버를 추가하는 메서드, 이모지를 누른 사람의 ID를 추가하고 count를 증가시킴
  this.add = function (id) {
    this.count++;
    this.members.push(id);
  };
}

// 메시지 생성자 함수
function Message(msg, date, member, emojis) {
  this.msg = msg;
  this.date = date;
  this.member = member;
  this.emojis = emojis || []; // // 이모지 리스트, 기본값은 빈 배열

  // 이모지 추가 함수
  this.addEmoji = function (emojiId, memberId) {
    // // 이모지 리스트에서 해당 이모지를 찾음
    let emoji = this.emojis.find((item) => item.id === emojiId);
    if (!emoji) {
      // 찾지 못한 경우, 새로운 이모지를 생성하고 해당 멤버를 추가
      let newEmoji = new Emoji(emojiId, 1, [memberId]);
      this.emojis.push(newEmoji); // // 이모지 리스트에 추가
    } else {
      // 이미 해당 이모지가 존재하는 경우, 그 이모지에 멤버를 추가
      emoji.add(memberId); // 이모지의 add 메서드를 사용해 멤버 추가
    }
  };
}

// 멤버 객체 생성자 함수
function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

// 예시 객체 생성
let member1 = new Member("hong", "홍길동", "gildong.png");
let message1 = new Message(
  "디버깅 용도로 많이 사용합니다",
  "2024.09.04 오전 10:32",
  member1,
  [new Emoji("thumbsup", 3, ["jska2w3", "donghyaoh", "idoyeong5696"])]
);

// 새로운 이모지 추가
message1.addEmoji("thumbsup", "ooods312");

console.log(message1);

// 여러 객체 생성 예시
let member2 = new Member("kimdog", "김개똥", "dog.png");
let message2 = new Message("새 메시지 내용", "2024.09.05 오전 11:00", member2);

console.log(message2);
