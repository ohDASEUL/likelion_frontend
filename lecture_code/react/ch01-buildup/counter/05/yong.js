const yong = {
  /**
   * 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환하는 함수
   *
   * @example
   * createElement('button', { type: 'button', onclick: handleUp }, '+')
   * // 결과: <button type="button">+</button> (이벤트 리스너가 등록됨)
   *
   * @param {string} tag - 생성할 HTML 요소의 태그 이름
   * @param {Object} props - 요소에 설정할 속성들을 담은 객체
   * @param {...(Node|string|number|Function)} children - 자식 노드들 (요소, 문자열, 숫자, 함수)
   * @returns {Element} 생성된 DOM 요소
   */
  createElement: (tag, props, ...children) => {
    // 요소 노드 생성
    const elem = document.createElement(tag);

    // 속성 및 이벤트 리스너 추가
    if (props) {
      for (const attrName in props) {
        const value = props[attrName];
        // on으로 시작하는 속성은 이벤트 리스너로 처리
        if (attrName.toLowerCase().startsWith("on")) {
          // on 제거하고 소문자로 변환하여 이벤트 타입 추출 (예: onclick -> click)
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          // 일반 속성은 setAttribute로 설정
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        // 문자열이나 숫자는 텍스트 노드로 변환
        child = document.createTextNode(child);
      } else if (typeof child === "function") {
        // 함수인 경우 실행하여 결과를 자식으로 사용
        child = child();
      }
      elem.appendChild(child);
    }

    return elem;
  },

  /**
   * 루트 노드를 관리하는 객체를 생성해서 반환
   * @param {Element} rootNode - 애플리케이션이 마운트될 루트 DOM 노드
   * @returns {Object} render 메서드를 가진 루트 관리 객체
   */
  createRoot: (rootNode) => {
    return {
      render(appFn) {
        rootNode.appendChild(appFn());
      },
    };
  },
};

export default yong;
