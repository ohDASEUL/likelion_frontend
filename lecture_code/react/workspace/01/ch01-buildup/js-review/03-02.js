var item = { no: 1, todo: "두부", done: true };

var newItem = item;

// item, newItem 비교
newItem.done = false;
console.log(item, newItem);
console.log("같은 객체인가?", item === newItem);
