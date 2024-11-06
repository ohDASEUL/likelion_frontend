"use strict";

const idInput = document.getElementById('id');
const pwInput = document.getElementById('pw');
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const welcomeSection = document.getElementById('welcome-section');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

window.addEventListener('DOMContentLoaded', function () {
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  if (loggedInUser) {
    loginSection.style.display = 'none';
    welcomeSection.style.display = 'block';
    welcomeMessage.textContent = `${loggedInUser}로 로그인하였습니다`;
  }
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const id = idInput.value;
  const pw = pwInput.value;

  if (id === pw) {
    localStorage.setItem('loggedInUser', id);

    loginSection.style.display = 'none';
    welcomeSection.style.display = 'block';
    welcomeMessage.textContent = `${id}로 로그인하였습니다`;
  } else {
    alert("ID와 PW가 일치하지 않습니다.");
  }
});

logoutBtn.addEventListener('click', function () {
  localStorage.removeItem('loggedInUser');
  idInput.value = '';
  pwInput.value = '';
  loginSection.style.display = 'block';
  welcomeSection.style.display = 'none';
});
