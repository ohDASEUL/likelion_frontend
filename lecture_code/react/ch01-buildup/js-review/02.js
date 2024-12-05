// 할 일 목록을 담은 배열 객체
// 각 아이템은 번호(no), 할 일 내용(todo), 완료 여부(done)를 가집니다
var itemList = [
  { no: 1, todo: "두부", done: true },
  { no: 2, todo: "계란", done: false },
  { no: 3, todo: "라면", done: true },
];

// 배열의 인덱스를 사용한 접근 방식
console.log(itemList[0]); // 첫 번째 아이템 전체 출력 (두부 관련 객체)
console.log(itemList[1]); // 두 번째 아이템 전체 출력 (계란 관련 객체)

// 배열 구조 분해(Array Destructuring)를 사용한 할당
// itemList의 첫 번째 요소는 first에, 두 번째 요소는 second에 할당됨
var [first, second] = itemList;
console.log(first); // 첫 번째 아이템 출력 (두부 관련 객체)
console.log(second); // 두 번째 아이템 출력 (계란 관련 객체)

// 객체의 특정 속성에 접근하여 출력
console.log(second.no, second.todo); // 2, "계란" 출력

// 객체 구조 분해(Object Destructuring) 예시
var no = 100; // 외부에 선언된 no 변수
var { todo, no: number, hello } = second;
// todo: second 객체의 todo 값을 가져옴
// no: number - second 객체의 no 값을 number라는 새로운 변수명으로 가져옴
// hello: second 객체에 없는 속성이므로 undefined가 할당됨
console.log(number, todo, hello); // 2, "계란", undefined 출력

// React 컴포넌트의 props 전달 방식 두 가지 예시
// 1. 전통적인 방식: props 객체 전체를 매개변수로 받음
function Button(props) {}

// 2. 구조 분해 할당을 사용한 방식: 필요한 props만 직접 받음
// color, type, onClick 함수만 추출하여 사용
function Button({ color, type, onClick }) {}
