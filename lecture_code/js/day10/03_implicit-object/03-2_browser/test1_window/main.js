"use strict"

// window 의 기본 정보 추출
console.log(window.innerWidth, window.innerHeight)
console.log(window.outerWidth, window.outerHeight)
console.log(window.screenLeft, window.screenTop)

// 스크롤 정보는 스크롤 이벤트가 발생한 경우만 유지
window.addEventListener('scroll', () => {
    console.log(window.screenX, window.screenY)
});

function myOpen1() {
    window.open('https://www.google.com')
}

function myOpen2() {
    window.open('https://www.google.com', '_self')
}

// 자식창 지칭 객체
let childWindow


function myOpen3() {
    childWindow = window.open('https://www.naver.com', '_blank', 'left=100, top=100, height=400');
    if(childWindow == null){
        alert('팝업이 차단되었습니다. 해제해 주세요...');
    }
}

function myClose() {
    childWindow.close()
}

function myScroll() {
    window.scrollBy(100, 100)
}
