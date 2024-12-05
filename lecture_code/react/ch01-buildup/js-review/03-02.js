// 초기 객체 선언
var item = { no: 1, todo: "두부", done: true };

// 객체 복사의 여러 방법들을 보여주는 예제

// 1. 대입 연산자를 통한 참조 복사
// 주의: 이는 실제 복사가 아닌 같은 객체를 참조하는 것임
var newItem = item;

// 2. Object.assign()을 사용한 객체 복사
// Object.assign(target, ...sources): 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사
// 첫 번째 방식: item 객체가 직접 수정됨 (권장하지 않음)
var newItem = Object.assign(item, { delete: true }, {}, {});
// 두 번째 방식: 새로운 빈 객체에 복사 (권장됨)
var newItem = Object.assign({}, item, { delete: true });

// 3. 속성을 직접 복사하여 새로운 객체 생성
// 각 속성을 명시적으로 복사하는 방식
var newItem = { no: item.no, done: item.done, todo: item.todo };

// 4. 전개 연산자(Spread Operator)를 사용한 복사
// 가장 현대적이고 간단한 방식
// ...item으로 기존 객체의 모든 속성을 복사하고, done 속성만 새로운 값으로 덮어씀
var newItem = { ...item, done: false };

// 복사된 객체 테스트
newItem.done = false; // newItem의 done 속성만 변경
console.log(item, newItem); // 원본과 복사본 출력
console.log("같은 객체인가?", item === newItem); // false (서로 다른 객체임)
