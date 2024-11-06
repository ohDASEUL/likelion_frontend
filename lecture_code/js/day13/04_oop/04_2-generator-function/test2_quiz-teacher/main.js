"use strict";

// 반복적으로 생성된 객체 도출

// member: {
//   id: 'jangyj',
//   nickname: '장유진',
//   photo: 'jangyj.png'
// }
// 객체가 가지는 데이털르 생성자 함수 내에서 발생하는가?
// 외부에서 전달받아야 하는가?
function Member(id, nickname, photo) {
  this.id = id;
  this.nickname = nickname;
  this.photo = photo;
}

// {
//   id: "thumbsup",
//   count: 3,
//   members: ["jska2w3", "donghyaoh", "idoyeong5696"],
//   add: function (id) {
//     this.count++;
//     this.members.push(id);
//   },
// }

function Emoji(emojiId) {
  this.emojiId = emojiId;
  this.count = 0;
  this.members = [];
  this.add = function (memberId) {
    this.count++;
    this.members.push(memberId);
  };
}

function Message(msg, member) {
  this.msgId = ++msgId;
  this.msg = msg;
  this.member = member;
  this.date = new Date().toLocaleString();
  this.emojis = []; 
  this.addEmoji = function (emojiId, memberId) {
    let emoji = this.emojis.find((item) => item.emojiId === emojiId);
    if (this.emojis.every(item => item.emojiId !== emojiId)) {
      emoji = new Emoji(emojiId);
      this.emojis.push(emoji);
    } else {
      let index = this.emojis.findIndex(item => item.emojiId === emojiId); // 오타 수정
      this.emojis[index].add(memberId);
    }
  };
}

// 메시지가 여러 개 생성되는 구조
// 전체 메시지를 담기 위한 배열
// 메시지 객체 여러개를 담는 배열
let messages = []

// 메시지 객체 여러개가 유지된다
// 각각의 메시지 객체를 식별해서 사용해야 한다
// 메시지 식별자로 사용하기 위한 변수.. 메시지 객체 만들어 질때마다
// 1씩 증가시켜서 사용하겠다

let msgId = 0


// test...
// 신규 메시지 발생 1
let member1 = new Member("kim", "김길동", "kim.png");
let message1 = new Message("안녕하세요", member1);
messages.push(message1);
console.dir(messages);

// [
//   Message {
//     msgId: 1,
//     msg: '안녕하세요',
//     member: Member { id: 'kim', nickname: '김길동', photo: 'kim.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   }
// ]

// 신규 메시지 발생 1
let member2 = new Member("lee", "이길동", "lee.png");
let message2 = new Message("반가워요", member2);
messages.push(message2); // member2가 아닌 message2를 추가
console.dir(messages);
// [
//   Message {
//     msgId: 1,
//     msg: '안녕하세요',
//     member: Member { id: 'kim', nickname: '김길동', photo: 'kim.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   },
//   Message {
//     msgId: 2,
//     msg: '반가워요',
//     member: Member { id: 'lee', nickname: '이길동', photo: 'lee.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   }
// ]

// park이 첫 번째 메시지에 ok 이모지를 추가했다는 가정
message1.addEmoji("ok", "park");
console.dir(messages);
// [
//   Message {
//     msgId: 1,
//     msg: '안녕하세요',
//     member: Member { id: 'kim', nickname: '김길동', photo: 'kim.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [ [Emoji] ],
//     addEmoji: [Function (anonymous)]
//   },
//   Message {
//     msgId: 2,
//     msg: '반가워요',
//     member: Member { id: 'lee', nickname: '이길동', photo: 'lee.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   }
// ]

// choi가 첫번째 메시지에 thumbsup 이모지 추가
message1.addEmoji('thumbsup','choi')
console.dir(messages)
// [
//   Message {
//     msgId: 1,
//     msg: '안녕하세요',
//     member: Member { id: 'kim', nickname: '김길동', photo: 'kim.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [ [Emoji], [Emoji] ],
//     addEmoji: [Function (anonymous)]
//   },
//   Message {
//     msgId: 2,
//     msg: '반가워요',
//     member: Member { id: 'lee', nickname: '이길동', photo: 'lee.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   }
// ]

// jeong이 첫번째 메시지에 ok 이모지 추가
message1.addEmoji('ok','jeong')
console.dir(messages)
// [
//   Message {
//     msgId: 1,
//     msg: '안녕하세요',
//     member: Member { id: 'kim', nickname: '김길동', photo: 'kim.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [ [Emoji], [Emoji] ],
//     addEmoji: [Function (anonymous)]
//   },
//   Message {
//     msgId: 2,
//     msg: '반가워요',
//     member: Member { id: 'lee', nickname: '이길동', photo: 'lee.png' },
//     date: '2024. 9. 24. 오후 2:40:42',
//     emojis: [],
//     addEmoji: [Function (anonymous)]
//   }
// ]