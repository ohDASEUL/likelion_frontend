var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

array.forEach((num) => {
  if (num % 2 === 1) {
    result += num;
  }
});

console.log(result);
