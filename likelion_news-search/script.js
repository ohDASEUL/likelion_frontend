"use strict";

// 버튼 요소와 입력 필드 가져오기
const newsSearchBtn = document.getElementById("newsSearchBtn"); // 검색 버튼
const searchInput = document.querySelector('input[type="text"]'); // 검색 입력 필드
const headerContainer = document.getElementById("headerContainer"); // 헤더 컨테이너 (제목과 검색 바)
const newsContainer = document.getElementById("newsContainer"); // 뉴스 결과 메시지 컨테이너 (오류 메시지 또는 로딩 상태 표시)
const newsCardsContainer = document.getElementById("newsCardsContainer"); // 뉴스 카드가 표시될 메인 컨테이너

// 검색 결과를 카드 형식으로 표시하는 함수
function displayNewsCards(articles) {
  // 뉴스 컨테이너 초기화 (이전 결과 제거)
  newsContainer.innerHTML = "";

  // 각 뉴스 기사를 카드 형식으로 화면에 표시
  articles.forEach((article) => {
    // 카드 생성 (각 기사를 하나의 카드로 보여줌)
    const card = document.createElement("div");
    card.classList.add(
      "bg-white", // 카드의 배경색을 하얀색으로 설정
      "rounded-lg", // 모서리를 둥글게 처리
      "shadow-lg", // 그림자 추가
      "flex", // 카드 내용을 가로로 배치
      "mb-6", // 카드 하단에 여백 추가
      "max-w-3xl", // 카드의 최대 너비를 설정 (화면 꽉 차지 않도록)
      "mx-auto", // 카드를 가운데 정렬
      "p-4" // 카드 안쪽에 패딩 추가 (내용 여백)
    );

    // 이미지 추가 (있으면 해당 뉴스 이미지, 없으면 대체 이미지)
    const image = document.createElement("img");
    image.classList.add("w-1/4", "rounded-l-lg"); // 이미지 너비 1/4, 좌측 둥근 모서리
    image.src =
      article.urlToImage || "https://via.placeholder.com/150x100?text=No+Image"; // 이미지가 없을 경우 대체 이미지
    card.appendChild(image);

    // 뉴스 정보 컨테이너 생성 (제목, 설명, 기자 정보 등 포함)
    const newsInfo = document.createElement("div");
    newsInfo.classList.add("p-4", "w-3/4"); // 패딩과 너비 설정

    // 뉴스 제목 추가
    const title = document.createElement("h2");
    title.classList.add("font-bold", "text-lg", "mb-2"); // 굵은 글씨, 크기 설정
    title.textContent = article.title; // 제목을 뉴스 데이터에서 가져옴
    newsInfo.appendChild(title);

    // 기자명과 발행 날짜 표시
    const author = document.createElement("p");
    author.classList.add("text-sm", "text-gray-600", "mb-2"); // 작은 글씨, 회색
    author.textContent = `${article.author || "기자명 알 수 없음"} · ${new Date(
      article.publishedAt
    ).toLocaleDateString()}`; // 기자명과 발행 날짜
    newsInfo.appendChild(author);

    // 뉴스 설명 추가
    const description = document.createElement("p");
    description.classList.add("text-sm", "text-gray-800", "mb-4"); // 작은 글씨, 어두운 회색
    description.textContent = article.description; // 뉴스 설명
    newsInfo.appendChild(description);

    // 전체 기사 보러 가기 링크 추가
    const link = document.createElement("a");
    link.href = article.url; // 뉴스 기사 링크
    link.classList.add(
      "text-blue-500",
      "hover:underline",
      "text-sm",
      "font-semibold"
    ); // 파란색 텍스트, 마우스 호버 시 밑줄 표시
    link.textContent = "전체 기사 보러 가기"; // 링크 텍스트
    newsInfo.appendChild(link);

    // 뉴스 정보를 카드에 추가
    card.appendChild(newsInfo);

    // 생성한 카드를 뉴스 카드 컨테이너에 추가
    newsCardsContainer.appendChild(card);

    // 제목과 검색 바를 상단으로 이동시키기 (검색 결과에 따라 레이아웃 변경)
    headerContainer.classList.remove("h-screen"); // 전체 화면 높이 제거
    headerContainer.classList.add("h-auto"); // 높이를 자동으로 설정
  });
}

// 뉴스 검색 함수 정의
function searchNews() {
  // 검색어가 비어있는지 확인
  if (!searchInput.value.trim()) {
    // 검색어가 없을 경우 경고창 표시
    alert("검색할 뉴스 기사를 입력하세요.");
  } else {
    // 검색어가 있으면 로딩 상태 메시지 표시
    newsContainer.innerHTML =
      "<p class='text-center'>해당 뉴스 기사를 가져오는 중 입니다...</p>"; // 로딩 중 메시지

    const newsTopic = searchInput.value.trim(); // 입력된 검색어를 가져옴
    const newsApiKey = "f692390650b44a1f9846e90dd406fada"; // 뉴스 API 키

    // API 요청 URL 생성
    let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&sortBy=relevancy&apiKey=${newsApiKey}`;

    // AJAX 요청 생성
    let xhr = new XMLHttpRequest();
    xhr.open("GET", newsUrl); // GET 요청 설정
    xhr.onload = function () {
      newsContainer.innerHTML = ""; // 로딩 메시지 제거
      if (xhr.status === 200) {
        // 요청이 성공했을 때 응답 데이터 처리
        let resultObj = JSON.parse(xhr.responseText); // JSON 데이터를 객체로 변환

        console.log(resultObj.articles); // 콘솔에 결과 출력

        // 결과가 없을 경우 처리
        if (resultObj.articles.length === 0) {
          newsContainer.innerHTML =
            "<p class='text-center text-gray-700 font-semibold mt-4'>해당 뉴스 기사가 없습니다.</p>"; // 뉴스 없음 메시지
          newsCardsContainer.innerHTML = ""; // 이전 뉴스 카드 초기화
        } else {
          // 결과가 있으면 뉴스 카드 표시
          displayNewsCards(resultObj.articles);
        }

        // 헤더 레이아웃 조정
        headerContainer.classList.remove("h-screen");
        headerContainer.classList.add("h-auto");
      } else {
        // 요청 실패 시 오류 메시지 표시
        console.error("뉴스 데이터를 가져오는 데 실패했습니다.");
        newsContainer.innerHTML =
          "<p class='text-center text-red-500 font-semibold mt-4'>뉴스 데이터를 가져오는 중 오류가 발생했습니다.<br>다시 시도해주세요.</p>"; // 오류 메시지
        newsCardsContainer.innerHTML = ""; // 이전 뉴스 카드 초기화
      }
    };

    // 네트워크 오류 처리
    xhr.onerror = function () {
      console.error("오류 발생:", xhr.statusText); // 콘솔에 오류 메시지 출력
      // 네트워크 오류 메시지 표시
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("text-red-500", "font-semibold", "mt-4"); // 빨간색 텍스트, 굵은 글씨
      errorMessage.textContent =
        "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
      newsContainer.appendChild(errorMessage); // 오류 메시지 추가
    };

    // API 요청 전송
    xhr.send();
  }
}

// 검색 버튼 클릭 시 뉴스 검색 실행
newsSearchBtn.addEventListener("click", searchNews);

// 입력 필드에서 Enter 키 누를 때도 뉴스 검색 실행
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchNews();
  }
});
