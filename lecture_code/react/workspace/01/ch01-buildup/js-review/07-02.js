var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

var newArray = array.map((num) => {
  if (num % 2 === 1) {
    // 홀수
    return num;
  } else {
    // 짝수
    return 0;
  }
});

var newArray = array.map((num) => (num % 2 ? num : 0));

newArray.forEach((num) => (result += num));

console.log(result);
