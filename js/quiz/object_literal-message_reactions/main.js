let message = {
  userName: "",
  date: "",
  talkText: "",
  reactions: [],

  displayMessage: function () {
    console.log(
      `User: ${this.userName}\nDate: ${this.date}\nText: ${this.talkText}\nReactions: ${this.reactions.join(" ")}`
    );
  },

  setCurrentDate: function () {
    let currentDate = new Date();
    this.date = `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${currentDate.toLocaleTimeString("ko-KR", {
      hour12: false,
    })}`;
  },
};

message.userName = "홍길동";
message.setCurrentDate();
message.talkText = "이것은 채팅 메시지 입니다";
message.reactions.push("👍");

message.displayMessage();
