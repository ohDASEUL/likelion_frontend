"use strict";

// 버튼 요소와 입력 필드 가져오기
const newsSearchBtn = document.getElementById("newsSearchBtn");
const searchInput = document.querySelector('input[type="text"]');
const headerContainer = document.getElementById("headerContainer");
const newsContainer = document.getElementById("newsContainer");

// 검색 결과를 화면에 표시하는 함수
function displayNews(articles) {
  // 뉴스 컨테이너 초기화
  newsContainer.innerHTML = "";

  // 뉴스 목록을 생성하여 화면에 추가
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.className = "border-b border-gray-300 py-4";
    articleElement.innerHTML = `
      <h2 class="text-2xl font-bold">${article.title}</h2>
      <p class="text-gray-700">${article.description}</p>
      <a href="${article.url}" class="text-blue-500" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(articleElement);
  });

  // 제목과 검색 바를 상단으로 이동
  headerContainer.classList.remove("justify-center");
  headerContainer.classList.add("justify-start", "pt-8");
}

// 검색 함수 정의
function searchNews() {
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
        // 검색 결과 화면에 표시
        displayNews(resultObj.articles);
      } else {
        console.error("뉴스 데이터를 가져오지 못했습니다.");
      }
    };

    xhr.send();
  }
}

// 버튼 클릭 이벤트
newsSearchBtn.addEventListener("click", searchNews);

// 입력 필드에서 Enter 키 누를 때 검색 실행
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchNews();
  }
});
