
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
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("bg-white", "rounded-lg", "shadow-lg", "flex", "mb-6");

    const image = document.createElement("img");
    image.src = article.urlToImage || "https://via.placeholder.com/150x100?text=No+Image";
    card.appendChild(image);

    const newsInfo = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = article.title;
    newsInfo.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `${article.author || "기자명 알 수 없음"} · ${new Date(article.publishedAt).toLocaleDateString()}`;
    newsInfo.appendChild(author);

    const description = document.createElement("p");
    description.textContent = article.description;
    newsInfo.appendChild(description);

    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = "전체 기사 보러 가기";
    newsInfo.appendChild(link);

    card.appendChild(newsInfo);
    newsContainer.appendChild(card);
  });
}
```

### 2. AJAX를 통한 비동기 데이터 처리

- `XMLHttpRequest` 객체를 이용하여 API 서버로 요청을 보냅니다. 응답을 받은 후, 결과를 파싱하여 뉴스 목록을 화면에 출력합니다.
- 요청 도중 네트워크 오류가 발생하면 사용자에게 오류 메시지를 표시합니다.

```javascript
function searchNews() {
  const newsTopic = searchInput.value.trim();
  const newsApiKey = "API_KEY"; // API 키 입력
  let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&sortBy=relevancy&apiKey=${newsApiKey}`;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", newsUrl);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let resultObj = JSON.parse(xhr.responseText);
      displayNewsCards(resultObj.articles);
    }
  };

  xhr.onerror = function () {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "뉴스 데이터를 가져오는 중 오류가 발생했습니다.";
    newsContainer.appendChild(errorMessage);
  };

  xhr.send();
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