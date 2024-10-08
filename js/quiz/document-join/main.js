document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 방지
  
    // 입력 값 가져오기
    const nameInput = document.getElementById("name").value ? document.getElementById("name").value : "";
    const hobbies = [];
    if (document.getElementById("travel").checked) hobbies.push(document.getElementById("travel").value);
    if (document.getElementById("cooking").checked) hobbies.push(document.getElementById("cooking").value);
  
    let genderValue = "";
    if (document.getElementById("male").checked) {
      genderValue = document.getElementById("male").value;
    } else if (document.getElementById("female").checked) {
      genderValue = document.getElementById("female").value;
    }
  
    // 폼의 모든 입력 값이 채워졌는지 확인
    if (!nameInput || hobbies.length === 0 || !genderValue) {
      alert("모든 입력 필드를 채워주세요.");
      return; // 경고창이 뜬 후 더 이상 진행하지 않음
    }
  
    // 값 출력하기
    const result = document.createElement("div");
    result.innerHTML = `
          <p>이름: ${nameInput}</p>
          <p>취미: ${hobbies.join(", ")}</p>
          <p>성별: ${genderValue}</p>
        `;
    document.body.appendChild(result);
  });
  