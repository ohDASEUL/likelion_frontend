"use strict";

// 현재 시간/날짜 ...
// new - 객체 생성(선언) 연산자.. 모든 객체는 new 로 생성
let date1 = new Date();
console.log(date1.toString()); // Thu Sep 19 2024 10:16:11 GMT+0900 (대한민국 표준시)
console.log(date1.toLocaleString()); // 2024. 9. 19. 오전 10:16:11

// 특정 시간을 지정해서 객체 생성..
let date2 = new Date("2024-09-19 10:14:10");
console.log(date2.toLocaleString()); // 2024. 9. 19. 오전 10:14:10
// 월 데이터는 0부터 시작, 0이 1월
let date3 = new Date(2024, 9 - 1, 19, 10, 10, 10);
console.log(date3.toLocaleString()); // 2024. 9. 19. 오전 10:10:10

// 특정 데이터만 추출
console.log("year", date1.getFullYear()); // year 2024
console.log("month", date1.getMonth()); // month 8
console.log("date", date1.getDate()); // date 19
console.log("day", date1.getDay()); // day 4
console.log("seconds", date1.getSeconds()); // seconds 57
console.log("timestamp", date1.getTime()); // timestamp 1726708857559

// date 비교
// 이벤트 시간 가정
let eventStartDate = new Date('2024-09-01T00:00:00')
let eventEndDate = new Date('2024-09-30T23:59:59')

// 예약 시간
let regDate = new Date('2024-09-19T14:00:00')

// 비교
if(regDate.getTime() < eventStartDate.getTime()){
    console.log('예약하신 시간은 이벤트 시작 전입니다.')
}else if(regDate.getTime() > eventEndDate.getTime()){
    console.log('에약하신 시간은 이벤트 종료 후입니다.')
}else{
    console.log(`${regDate.toLocaleString()}}로 예약이 완료 되었습니다.`) // 2024. 9. 19. 오후 2:00:00}로 예약이 완료 되었습니다.
}

