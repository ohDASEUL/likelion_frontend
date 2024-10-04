"use strict";

// 버튼 요소와 입력 필드 가져오기
const newsSearchBtn = document.getElementById("newsSearchBtn");
const searchInput = document.querySelector('input[type="text"]');

newsSearchBtn.addEventListener("click", function () {
  // 검색어가 비어있는지 확인
  if (!searchInput.value.trim()) {
    alert("검색어를 입력하세요.");
  } else {
    const newsTopic = searchInput.value.trim();
    const newsApiKey = "f692390650b44a1f9846e90dd406fada";
    let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&apiKey=${newsApiKey}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", newsUrl);

    xhr.onload = function () {
      if (xhr.status === 200) {
        const result = xhr.responseText;
        const resultObj = JSON.parse(result);
        console.log(resultObj);
      } else {
        console.error("뉴스 데이터를 가져오지 못했습니다.");
      }
    };

    xhr.send();
  }
});
