// Yong 라이브러리 객체 정의
const yong = {
  /**
   * 요소 노드를 생성하고 속성과 자식 노드를 설정하는 함수
   * @param {string} tag - 생성할 HTML 요소의 태그 이름
   * @param {Object} props - 요소에 설정할 속성들을 담은 객체
   * @param {...(Node|string|number)} children - 자식 노드들 (요소, 문자열, 숫자)
   * @returns {Element} 생성된 DOM 요소
   */
  createElement: (tag, props, ...children) => {
    // 지정된 태그로 새로운 DOM 요소 생성
    const elem = document.createElement(tag);

    // props 객체에 있는 속성들을 요소에 설정
    if (props) {
      for (const attrName in props) {
        elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 자식 노드들을 요소에 추가
    for (let child of children) {
      // 문자열이나 숫자인 경우 텍스트 노드로 변환
      if (typeof child === "string" || typeof child === "number") {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    }

    return elem;
  },
};

// Yong 객체를 기본 내보내기로 설정
export default yong;
