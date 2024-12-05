// 객체들을 포함하는 배열 선언
var itemList = [
  { no: 1, todo: "두부", done: false },
  { no: 2, todo: "계란", done: false },
  { no: 3, todo: "라면", done: false },
];

// 배열 복사의 여러 방법들을 설명하는 예제

// 1. 대입 연산자를 통한 참조 복사
// 주의: 실제 복사가 아닌 같은 배열을 참조
var newItemList = itemList;

// 2. 전개 연산자를 이용한 얕은 복사
// 배열 자체는 새로운 객체가 되지만, 내부 객체들은 여전히 참조 복사됨
var newItemList = [...itemList];

// 3. 중첩된 객체의 깊은 복사
// 배열의 특정 인덱스의 객체도 전개 연산자로 복사
// 불변성(immutability)을 지키기 위한 방법
newItemList[1] = { ...itemList[1] };

// 복사된 배열 테스트
newItemList[1].done = true; // 복사된 배열의 두 번째 항목 수정
console.log(itemList, newItemList); // 원본과 복사본 출력

// 배열 자체의 참조 비교
console.log(itemList === newItemList); // false - 다른 배열 객체임

// 배열 내부 객체의 참조 비교
console.log(itemList[1] === newItemList[1]); // false - 깊은 복사로 인해 다른 객체임
