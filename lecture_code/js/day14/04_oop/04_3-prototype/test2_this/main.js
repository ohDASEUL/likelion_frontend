"use strict"

function User(name) {
    this.name = name
    User.prototype.point = 20
    User.prototype.sayHello = function(){
        console.log(`Hello ${this.name}, ${this.point}`)
    }
}

let user1 = new User('honggildong')
user1.sayHello() // Hello honggildong, 20

let user2 = new User('leegildong')
user2.point = 30
user2.sayHello = function() {
    console.log(`안녕하세요 ${this.name}, ${this.point}`)
}
user2.sayHello() // 안녕하세요 leegildong, 30

let user3 = new User('kimgildong')
user3.sayHello() // Hello kimgildong, 20