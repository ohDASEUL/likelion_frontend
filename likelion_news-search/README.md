# 멋쟁이사자처럼 프론트엔드 11기

## 자바스크립트 2차 과제 : 뉴스 검색 프로젝트

## 기능

1. **뉴스 검색 기능**
   - 사용자는 검색어를 입력하고 검색 버튼을 클릭하거나 Enter 키를 눌러 뉴스 검색을 실행할 수 있습니다.
   - 입력된 검색어는 `News API`로 전송되며, `AJAX`를 이용하여 비동기적으로 데이터를 받아옵니다.
   - API를 통해 받아온 뉴스 기사는 카드 형식으로 화면에 표시됩니다.
   - 검색 결과가 없으면 "해당 뉴스 기사가 없습니다."라는 메시지를 표시합니다.

2. **뉴스 상세보기 기능**
   - 각 뉴스 기사에는 "전체 기사 보러 가기" 링크가 포함되어 있으며, 클릭 시 해당 기사의 원문 페이지가 새로운 탭에서 열립니다.

3. **반응형 디자인**
   - Tailwind CSS를 사용하여 반응형 웹 디자인을 구현했습니다.
   - 화면 크기에 따라 뉴스 카드 레이아웃이 자동으로 조정됩니다.

## 주요 구현

### 1. 뉴스 검색 및 결과 표시

- 검색 버튼 클릭 시 또는 Enter 키 입력 시 `searchNews()` 함수가 호출됩니다.
- 사용자가 입력한 검색어를 기반으로 `News API`에 요청을 보내며, 결과를 JSON 형식으로 받아옵니다.
- `displayNewsCards()` 함수가 호출되어 받아온 뉴스 기사를 카드 형식으로 화면에 동적으로 표시합니다.
  
```javascript
function displayNewsCards(articles) {
  // 뉴스 컨테이너 초기화 (이전 결과 제거)
  newsContainer.innerHTML = "";

  // 각 뉴스 기사를 카드 형식으로 화면에 표시
  articles.forEach((article) => {
    // 카드 생성 (각 기사를 하나의 카드로 보여줌)
    const card = document.createElement("div");
    card.classList.add(
      "bg-white",  // 카드의 배경색을 하얀색으로 설정
      "rounded-lg",  // 모서리를 둥글게 처리
      "shadow-lg",  // 그림자 추가
      "flex",  // 카드 내용을 가로로 배치
      "mb-6",  // 카드 하단에 여백 추가
      "max-w-3xl",   // 카드의 최대 너비를 설정 (화면 꽉 차지 않도록)
      "mx-auto",     // 카드를 가운데 정렬
      "p-4"          // 카드 안쪽에 패딩 추가 (내용 여백)
    );

    // 이미지 추가 (있으면 해당 뉴스 이미지, 없으면 대체 이미지)
    const image = document.createElement("img");
    image.classList.add("w-1/4", "rounded-l-lg");  // 이미지 너비 1/4, 좌측 둥근 모서리
    image.src = article.urlToImage || "https://via.placeholder.com/150x100?text=No+Image";  // 이미지가 없을 경우 대체 이미지
    card.appendChild(image);

    // 뉴스 정보 컨테이너 생성 (제목, 설명, 기자 정보 등 포함)
    const newsInfo = document.createElement("div");
    newsInfo.classList.add("p-4", "w-3/4");  // 패딩과 너비 설정

    // 뉴스 제목 추가
    const title = document.createElement("h2");
    title.classList.add("font-bold", "text-lg", "mb-2");  // 굵은 글씨, 크기 설정
    title.textContent = article.title;  // 제목을 뉴스 데이터에서 가져옴
    newsInfo.appendChild(title);

    // 기자명과 발행 날짜 표시
    const author = document.createElement("p");
    author.classList.add("text-sm", "text-gray-600", "mb-2");  // 작은 글씨, 회색
    author.textContent = `${article.author || "기자명 알 수 없음"} · ${new Date(article.publishedAt).toLocaleDateString()}`;  // 기자명과 발행 날짜
    newsInfo.appendChild(author);

    // 뉴스 설명 추가
    const description = document.createElement("p");
    description.classList.add("text-sm", "text-gray-800", "mb-4");  // 작은 글씨, 어두운 회색
    description.textContent = article.description;  // 뉴스 설명
    newsInfo.appendChild(description);

    // 전체 기사 보러 가기 링크 추가
    const link = document.createElement("a");
    link.href = article.url;  // 뉴스 기사 링크
    link.classList.add("text-blue-500", "hover:underline", "text-sm", "font-semibold");  // 파란색 텍스트, 마우스 호버 시 밑줄 표시
    link.textContent = "전체 기사 보러 가기";  // 링크 텍스트
    newsInfo.appendChild(link);

    // 뉴스 정보를 카드에 추가
    card.appendChild(newsInfo);

    // 생성한 카드를 뉴스 카드 컨테이너에 추가
    newsCardsContainer.appendChild(card);
  });
}
```

### 2. AJAX를 통한 비동기 데이터 처리

- `XMLHttpRequest` 객체를 이용하여 API 서버로 요청을 보냅니다. 응답을 받은 후, 결과를 파싱하여 뉴스 목록을 화면에 출력합니다.
- 요청 도중 네트워크 오류가 발생하면 사용자에게 오류 메시지를 표시합니다.

```javascript
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
```

## 참고
news api Developer($0) 플랜에서는 한 번의 요청으로 최대 100개의 기사를 받아올 수 있으며, 한 달에 최대 500 요청까지 가능합니다.

## 사용 기술

- **HTML5**: 기본적인 구조와 콘텐츠 표시.
- **Tailwind CSS**: 반응형 디자인을 손쉽게 구현하기 위해 사용.
- **JavaScript**: DOM 조작 및 AJAX 통신을 통한 뉴스 데이터 처리.
- **News API**: 실제 뉴스 데이터를 받아오기 위한 외부 API.

## 실행 방법

1. 이 레포지토리를 클론하거나 다운로드합니다.
2. live server로 `index.html` 파일을 실행시켜줍니다.
3. 뉴스 검색어를 입력하고 검색 버튼을 클릭하거나 Enter 키를 눌러 관련 뉴스를 확인할 수 있습니다.

## 결과화면
### 초기 화면
![Initial Screen](/previews/search-empty.jpeg)

### 검색 결과 화면
![Search Results](/previews/news-results.png)

### 검색 결과 없음
![No Results](/previews/no-results.jpeg)

### 에러 화면 1
![Error1](/previews/errorOne.jpeg)

