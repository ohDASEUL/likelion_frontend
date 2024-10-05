"use strict";

// 버튼 요소와 입력 필드 가져오기
const newsSearchBtn = document.getElementById("newsSearchBtn");
const searchInput = document.querySelector('input[type="text"]');
const headerContainer = document.getElementById("headerContainer");
const newsContainer = document.getElementById("newsContainer");

// 검색 결과를 카드 형식으로 표시하는 함수
function displayNewsCards(articles) {
  // 뉴스 컨테이너 초기화
  newsContainer.innerHTML = "";

  // 카드 형식으로 뉴스 표시
  articles.forEach((article) => {
    // 카드 생성
    const card = document.createElement("div");
    card.classList.add("bg-white", "rounded-lg", "shadow-lg", "flex", "mb-6");

    // 이미지 추가
    const image = document.createElement("img");
    image.classList.add("w-1/4", "rounded-l-lg");
    image.src = article.urlToImage || "https://via.placeholder.com/150x100?text=No+Image"; // 뉴스 이미지 없으면 가상의 이미지 추가
    card.appendChild(image);

    // 뉴스 정보 컨테이너
    const newsInfo = document.createElement("div");
    newsInfo.classList.add("p-4", "w-3/4");

    // 뉴스 제목
    const title = document.createElement("h2");
    title.classList.add("font-bold", "text-lg", "mb-2");
    title.textContent = article.title;
    newsInfo.appendChild(title);

    // 기자명과 발행 날짜
    const author = document.createElement("p");
    author.classList.add("text-sm", "text-gray-600", "mb-2");
    author.textContent = `${article.author || "기자명 알 수 없음"} · ${new Date(
      article.publishedAt
    ).toLocaleDateString()}`;
    newsInfo.appendChild(author);

    // 뉴스 설명
    const description = document.createElement("p");
    description.classList.add("text-sm", "text-gray-800", "mb-4");
    description.textContent = article.description;
    newsInfo.appendChild(description);

    // 뉴스 링크 버튼
    const link = document.createElement("a");
    link.href = article.url;
    link.classList.add(
      "text-blue-500",
      "hover:underline",
      "text-sm",
      "font-semibold"
    );
    link.textContent = "전체 기사 보러 가기";
    newsInfo.appendChild(link);

    // 뉴스 정보를 카드에 추가
    card.appendChild(newsInfo);

    // 카드를 뉴스 컨테이너에 추가
    newsContainer.appendChild(card);

    // 제목과 검색 바를 상단으로 이동
    headerContainer.classList.remove("h-screen");
    headerContainer.classList.add("h-auto");
  });
}

// 검색 함수 정의
function searchNews() {
  // 검색어가 비어있는지 확인
  if (!searchInput.value.trim()) {
    alert("검색할 뉴스 기사를 입력하세요.");
  } else {
    newsContainer.innerHTML = "<p class='text-center'>해당 뉴스 기사를 가져오는 중 입니다...</p>"; // 로딩 상태 표시
    const newsTopic = searchInput.value.trim();
    const newsApiKey = "f692390650b44a1f9846e90dd406fada";

    let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&sortBy=relevancy&apiKey=${newsApiKey}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", newsUrl);
    xhr.onload = function () {
      newsContainer.innerHTML = ""; // 로딩 메시지 삭제
      if (xhr.status === 200) {
        let resultObj = JSON.parse(xhr.responseText);

        // articles 부분만 console에 출력
        console.log(resultObj.articles);

        // 검색 결과가 없는 경우 메시지 표시
        if (resultObj.articles.length === 0) {
          const noResultsMessage = document.createElement("p");
          noResultsMessage.classList.add(
            "text-gray-700",
            "font-semibold",
            "mt-4"
          );
          noResultsMessage.textContent = "해당 뉴스 기사가 없습니다.";
          newsContainer.appendChild(noResultsMessage);

          console.log("해당 뉴스 기사가 없습니다.");
        } else {
          // 뉴스 기사 카드 형식으로 표시
          displayNewsCards(resultObj.articles);
        }

        // 제목과 검색 바를 상단으로 이동
        headerContainer.classList.remove("h-screen");
        headerContainer.classList.add("h-auto");
      } else {
        console.error("뉴스 데이터를 가져오는 데 실패했습니다.");
        // 에러 메시지 표시
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("text-red-500", "font-semibold", "mt-4");
        errorMessage.textContent = "뉴스 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.";
        newsContainer.appendChild(errorMessage);
      }
    };

    xhr.onerror = function () {
      console.error("오류 발생:", xhr.statusText);
      // 에러 메시지 표시
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("text-red-500", "font-semibold", "mt-4");
      errorMessage.textContent = "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
      newsContainer.appendChild(errorMessage);
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
