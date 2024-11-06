// 데이터가 여러개 있다... 하하나를 변수로 선언해서 이용
let user1 = '홍길동';
let user2 = '김길동';
let user3 = '이길동';

// 모든 데이터가 여러 개라고 배열에 담아서 이용하는 건 좋지 않다,
// 데이터가 상이한 성격이라면.. 정확한 변수명으로 그 대이터가 식별되어 이용되게 하는 것이 맞다
// 동일한 성격의 데이터 여러 개가 유지되어야 하거나.. 데이터 갯스가 예측이 안 되거나 배열로 선언해서 데이터 이용
let users = ['홍길동','김길동','이길동']
console.log(users.length) //3
console.log(users[0],users[1],users[2]) // 홍길동, 김길동, 이길동
console.log(users[3]) // undefined

// 한꺼번에 배열의 데이처를 로그로 보고 싶다면
console.log(users) // [ '홍길동', '김길동', '이길동' ]

// 배열 데이터 변경...
users[1] = '박길동'
console.log(users) // ['홍길동' ,'박길동',' '이길동']

// 신규 데이터 추가..
users.push('최길동');
users.push('정길동');
console.log(users) // ['홍길동' , '박길동', '이길동', '최길동', '정길동']

// 배열에 있는 데이터 삭제
users.pop();
users.pop();
users.pop();
console.log(users) // ['홍길동','박길동']

// push() 와 pop()에 의해 배열에 데이터 추가, 제거는 맨 마지막에..
