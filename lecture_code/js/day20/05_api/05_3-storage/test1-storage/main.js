"use strict"

const saveSessionStorage = function () {
    // 세션 스토리지에 데이터 저장
    sessionStorage.setItem('data1','hello')
    
}

const getSessionStorage = function () {
    // 세션 스토리지에서 데이터 획득
    let value = sessionStorage.getItem('data1')
    const resultDom = document.getElementById('result');
    resultDom.innerHTML = value
    
}

const saveLocalStorage = function () {
    localStorage.setItem('data2','world')
}

const getLocalStorage = function () {
    // 로컬 스토리지에서 데이터 획득
    let value = localStorage.getItem('data2')
    const resultDom = document.getElementById('result');
    resultDom.innerHTML = value
}

