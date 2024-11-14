var array = [6, 7, 8, 1, 4, 5, 2, 3, 9, 10];

var result = 0;

// - 를 반환할 경우 a, b 정렬
// + 를 반환할 경우 b, a 정렬
// = 을 반환할 경우 그대로
array.sort((a, b) => {
  a - b;
});
console.log(array);

var result = array.find((num) => num % 2 === 0 && num % 3 === 0);

console.log(result);
