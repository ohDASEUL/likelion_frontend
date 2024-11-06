// area1, area2, area3의 각 요소를 DOM에서 찾아 변수에 저장
const area1 = document.getElementById('area1');
const area2 = document.getElementById('area2');
const area3 = document.getElementById('area3');

// event handler 등록, bubbling 단계에서 실행할 handler
// area1에 대한 클릭 이벤트 핸들러 등록 (버블링 단계에서 실행)
// 버블링 단계는 이벤트가 가장 안쪽 요소에서 바깥쪽으로 전파되는 단계입니다.
area1.addEventListener('click', function(){
    console.log('bubbling area1 event handler');
});

// area2에 대한 클릭 이벤트 핸들러 등록 (버블링 단계에서 실행)
area2.addEventListener('click', function(){
    console.log('bubbling area2 event handler');
});

// area3에 대한 클릭 이벤트 핸들러 등록 (버블링 단계에서 실행)
area3.addEventListener('click', function(event){
    console.log('bubbling area3 event handler');
    event.stopPropagation()
});

// event handler 등록, capturing 단계에서 실행할 handler
// area1에 대한 클릭 이벤트 핸들러 등록 (캡처링 단계에서 실행)
// 캡처링 단계는 이벤트가 가장 바깥쪽 요소에서 안쪽 요소로 전파되는 단계입니다.
area1.addEventListener('click', function(event){
    console.log('capturing area1 event handler');
    event.stopPropagation()
}, true);

// area2에 대한 클릭 이벤트 핸들러 등록 (캡처링 단계에서 실행)
area2.addEventListener('click', function(){
    console.log('capturing area2 event handler');
}, true);

// area3에 대한 클릭 이벤트 핸들러 등록 (캡처링 단계에서 실행)
area3.addEventListener('click', function(){
    console.log('capturing area3 event handler');
}, true);

//
const link1 = document.getElementById('link1');
const form1 = document.getElementById('form1');

link1.addEventListener('click', function(e) {
    console.log('link click')
    // js code에서 ajax로 서버 연동처리
    e.preventDefault()
});

form1.addEventListener('submit', function(e) {
    console.log('form submit')
    // browser form의 이벤트 처리보다는
    // 개발자 js code 에서 ajax로 서버 연동
    e.preventDefault()
});

