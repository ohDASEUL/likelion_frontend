"use strict";

// 버튼 요소와 입력 필드 가져오기
const newsSearchBtn = document.getElementById("newsSearchBtn");
const searchInput = document.querySelector('input[type="text"]');
const headerContainer = document.getElementById("headerContainer");
const newsContainer = document.getElementById("newsContainer");

// 검색 결과를 테이블로 표시하는 함수
function displayNewsTable(articles) {
  // 뉴스 컨테이너 초기화
  newsContainer.innerHTML = "";

  // 테이블 생성
  const table = document.createElement("table");
  table.classList.add("min-w-full", "bg-white", "border");

  // 테이블 헤더 생성
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th class="py-2 px-4 border">번호</th>
      <th class="py-2 px-4 border">뉴스 제목</th>
    </tr>
  `;
  table.appendChild(thead);

  // 테이블 바디 생성
  const tbody = document.createElement("tbody");
  articles.forEach((article, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4 border text-center">${index + 1}</td>
      <td class="py-2 px-4 border">${article.title}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // 테이블을 뉴스 컨테이너에 추가
  newsContainer.appendChild(table);

  // 제목과 검색 바를 상단으로 이동
  headerContainer.classList.remove("h-screen");
  headerContainer.classList.add("h-auto");
}

// 검색 함수 정의
async function searchNews() {
  // 검색어가 비어있는지 확인
  if (!searchInput.value.trim()) {
    alert("검색어를 입력하세요.");
  } else {
    const newsTopic = searchInput.value.trim();
    const newsApiKey = "f692390650b44a1f9846e90dd406fada";
    let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&apiKey=${newsApiKey}`;

    let xhr = new XMLHttpRequest();
    xhr.open("get", newsUrl);
    xhr.onload = function () {
      if (xhr.status === 200) {
        let result = xhr.responseText;
        let resultObj = JSON.parse(result);

        // 뉴스 기사 테이블로 표시
        displayNewsTable(resultObj.articles);
      } else {
        console.error("뉴스 데이터를 가져오는 데 실패했습니다.");
      }
    };
    xhr.onerror = function () {
      console.error("오류 발생:", xhr.status);
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
