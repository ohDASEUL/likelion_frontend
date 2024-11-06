const NAME = "오다슬";

let selfIntroduction = `안녕하세요🙋🏻‍♀️
저는 요리, 맛집탐방, 카페투어를 좋아해서 시간날때마다 수도권에 있는 맛집과 카페를 돌아다니고 있으며, 
또 평소 집에서 시간날때마다 개발자 또는 개발자 취준생 브이로그를 보면서 동기부여를 얻고 있습니다!
MBTI는 ISTJ 입니다`;

let frontendSchoolGoals = `부족한 코딩 실력 향상과 
수료 이후 프론트엔드 개발자👩‍💻로 취업하고 싶습니다‼️`;

let cheerMessageForTeamAndSelf = `6개월이라는 짦다면 짦고 길다면 길게 느껴지는 기간동안 강의를 열심히 듣는 것도 중요하지만
건강관리와 페이스조절을 잘 하는 것이 가장 중요하다고 생각합니다
우리 모두 건강을 항시 중요시하면서 
한 분도 빠짐없이 수료해서 모든분들이 프론트엔드 개발자로 취뽀하셨으면 좋겠습니다!😉`;

// 배경색을 검은색으로, 글씨색을 흰색으로 변경
document.body.style.backgroundColor = "black";
document.body.style.color = "white";

document.body.innerHTML += `
  <p><b>이름:</b> ${NAME}</p>
  <p><b>자기소개:</b> ${selfIntroduction}</p>
  <p><b>프론트엔드 스쿨 11기를 통해 이루고 싶은 점:</b> ${frontendSchoolGoals}</p>
  <p><b>동료들과 나에게 보내는 응원 메시지:</b> ${cheerMessageForTeamAndSelf}</p>
`;