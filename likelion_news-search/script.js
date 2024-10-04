function newsSearch() {
  // 검색어 입력 필드를 가져오기
  const searchInput = document.querySelector('input[type="text"]');

  // 검색어가 비어있는지 확인
  if (!searchInput.value.trim()) {
    alert("검색어를 입력하세요.");
  } else {
    const newsTopic = searchInput.value.trim();
    const newsApiKey = "f692390650b44a1f9846e90dd406fada";
    let newsUrl = `https://newsapi.org/v2/everything?q=${newsTopic}&apiKey=${newsApiKey}`;

    fetch(newsUrl).then(function (response) {
      console.log(response.json());
    });
  }
}
