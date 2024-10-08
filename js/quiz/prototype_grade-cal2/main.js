"use strict";

// School 생성자 함수
function School(kor, eng) {
  // 국어와 영어 점수를 저장
  this.kor = kor;
  this.eng = eng;
}

// School 프로토타입에 sum 메서드 추가 (점수 합계 계산)
School.prototype.sum = function () {
  return this.kor + this.eng; // 반환값으로 합계 제공
};

// School 프로토타입에 avg 메서드 추가 (평균 점수 계산)
School.prototype.avg = function () {
  return Math.round((this.kor + this.eng) / 2); // 소수점 반올림 후 반환
};

// HighSchool 생성자 함수 정의 (School을 상속받아 구체적인 고등학교 생성)
function HighSchool(kor, eng) {
  // School 생성자 함수를 호출하여 kor와 eng 속성을 상속받음
  School.call(this, kor, eng); // call로 School 생성자를 호출하여 this에 kor와 eng를 할당
}

// HighSchool의 프로토타입을 School의 프로토타입과 연결하여 메서드 상속
HighSchool.prototype = Object.create(School.prototype);
HighSchool.prototype.constructor = HighSchool;

// HighSchool 프로토타입에 grade 메서드 추가 (등급 계산)
HighSchool.prototype.grade = function () {
  const avg = this.avg(); // 상속받은 avg() 메서드로 평균 계산
  if (avg >= 90) return "A";
  else if (avg >= 80) return "B";
  else if (avg >= 70) return "C";
  else if (avg >= 60) return "D";
  else return "F";
};

// 테스트

// HighSchool 인스턴스 테스트
let high1 = new HighSchool(100, 85);
console.log("highschool sum", high1.sum());    // highschool sum 185
console.log("highschool avg", high1.avg());    // highschool avg 93
console.log("highschool grade", high1.grade()); // highschool grade A

// School 인스턴스 테스트
let school1 = new School(100, 85);
console.log("school sum", school1.sum());    // school sum 185
console.log("school avg", school1.avg());    // school avg 93
