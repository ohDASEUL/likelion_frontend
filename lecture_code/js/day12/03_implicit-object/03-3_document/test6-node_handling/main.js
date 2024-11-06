"use strict"

const result1 = document.getElementById('result1');
result1.innerHTML = '<div><a href="#">link</a>hello</div>'

// 위와 동일하게 node를 create해서 추가
const newDiv = document.createElement('div');

const newA = document.createElement('a')

const newHref = document.createAttribute('href')
newHref.value = '#'

let newAText = document.createTextNode('link')
let newDivText = document.createTextNode('hello')

newA.setAttributeNode(newHref)
newA.appendChild(newAText)

newDiv.appendChild(newA)
newDiv.appendChild(newDivText)

const result2 = document.getElementById('result2');
result2.appendChild(newDiv)