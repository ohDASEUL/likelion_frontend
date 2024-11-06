"use strict"

const fileNode1 = document.getElementById('fileInput1');
const fileNode2 = document.getElementById('fileInput2');
const resultNode = document.getElementById('results');

function handleFile(e) {
    // 기존 화면 출력 결과 지우고
    while(resultNode.firstChild){
        resultNode.removeChild(resultNode.firstChild)
    }
    // 유저가 선택한 파일 정보 획득
    let files = e.target.files // FileList - 여러 개 선택이 가능함으로
    if(files.length !== 0){
        for (let file of files) {
            // files 의 객체 갯수 만큼 반복적으로 for 루프 실행
            // for 루프가 한 번씩 실행되면서 files 안에 File 객체가 file에 대입
            const item = document.createElement('li');
            item.innerHTML = `file name: ${file.name}, file size: ${file.size}, modified : ${new Date(file.lastModified)}`
            resultNode.appendChild(item);
            
        }
    }
}

fileNode1.addEventListener('change', handleFile);
fileNode2.addEventListener('change', handleFile);

