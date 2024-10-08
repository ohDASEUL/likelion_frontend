"use strict";

// School 생성자 함수
function School(kor, eng) {
  this.kor = kor;
  this.eng = eng;
}

School.prototype.sum = function () {
  return this.kor + this.eng;
};

// avg 함수는 평균을 반환
// 소수점 첫째 자리에서 반올림
School.prototype.avg = function () {
  return Math.round((this.kor + this.eng) / 2);
};

let school1 = new School(100, 85);
console.log("school sum", school1.sum()); // school sum 185
console.log("school avg", school1.avg()); // school avg 93

// HighSchool 생성자 함수 (School 상속)
function HighSchool(kor, eng) {
  // School의 생성자를 호출하여 kor와 eng 값을 상속
  School.call(this, kor, eng);
}

HighSchool.prototype = Object.create(School.prototype);
HighSchool.prototype.constructor = HighSchool;


// HighSchool 프로토타입에 grade 함수 추가
HighSchool.prototype.grade = function () {
  const avg = this.avg(); 

  if (avg >= 90) return "A";
  else if (avg >= 80) return "B";
  else if (avg >= 70) return "C";
  else if (avg >= 60) return "D";
  else return "F";
};

let high1 = new HighSchool(100, 85);
console.log("highschool sum", high1.sum()); // highschool sum 185
console.log("highschool avg", high1.avg()); // highschool avg 93
console.log("highschool grade", high1.grade()); // highschool grade A

