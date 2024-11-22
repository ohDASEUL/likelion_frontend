var array = [6, 7, 8, 1, 4, 5, 2, 3, 9, 10];

var result = 0;

array.filter((num) => num % 2 !== 0).forEach((num) => (result += num));
console.log(result);
