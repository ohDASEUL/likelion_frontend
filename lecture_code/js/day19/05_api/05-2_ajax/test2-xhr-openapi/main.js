"use strict";

const button = document.getElementById("button");
const table = document.getElementById("result");

button.addEventListener("click", function () {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    "http://openAPI.seoul.go.kr:8088/6179687a6c6f64733730484b476953/json/RealtimeCityAir/1/99/"
  );
  xhr.onload = function () {
    // 결과 데이터 획득
    let result = xhr.responseText;
    let resultObj = JSON.parse(result);
    
    // 각 구청 데이터
    let rows = resultObj["RealtimeCityAir"]["row"];
    let resultTxt = "";

    for (let i = 0; i < rows.length; i++) {
      const name = rows[i]["MSRSTE_NM"];
      const value = rows[i]["IDEX_MVL"];
      const grade = rows[i]["IDEX_NM"];

      resultTxt += `
            <tr>
                <td>${name}</td>
                <td>${value}</td>
                <td>${grade}</td>
            </tr>
            `;
    }

    // 테이블 업데이트
    table.innerHTML = resultTxt;
  };
  xhr.send();
});
