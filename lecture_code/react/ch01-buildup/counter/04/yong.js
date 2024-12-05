const yong = {
  /**
   * 지정한 속성과 자식 노드를 가지는 요소 노드를 생성해서 반환하는 함수
   * React의 createElement와 유사한 방식으로 동작
   *
   * 사용 예시:
   * createElement('button', { type: 'button', onclick: 'handleUp()' }, '+')
   * 생성결과: <button type="button" onclick="handleUp()">+</button>
   *
   * @param {string} tag - 생성할 HTML 요소의 태그 이름
   * @param {Object} props - 요소에 설정할 속성들을 담은 객체
   * @param {...(Node|string|number)} children - 자식 노드들 (요소, 문자열, 숫자)
   * @returns {Element} 생성된 DOM 요소
   */
  createElement: (tag, props, ...children) => {
    // 1. 지정된 태그로 새로운 DOM 요소 생성
    const elem = document.createElement(tag);

    // 2. props 객체가 존재하면 요소의 속성으로 설정
    if (props) {
      for (const attrName in props) {
        elem.setAttribute(attrName, props[attrName]);
      }
    }

    // 3. 자식 노드들을 순회하면서 요소에 추가
    for (let child of children) {
      // 문자열이나 숫자인 경우 텍스트 노드로 변환
      if (typeof child === "string" || typeof child === "number") {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    }

    return elem;
  },

  /**
   * React의 createRoot와 유사한 방식으로 동작하는 루트 노드 관리 객체 생성 함수
   * 애플리케이션의 최상위 컴포넌트를 렌더링하는 기능 제공
   *
   * 사용 예시:
   * createRoot(document.getElementById('root')).render(App);
   *
   * @param {Element} rootNode - 애플리케이션이 마운트될 루트 DOM 노드
   * @returns {Object} render 메서드를 가진 루트 관리 객체
   */
  createRoot: (rootNode) => {
    return {
      /**
       * 컴포넌트 함수를 실행하고 그 결과를 루트 노드에 렌더링
       * @param {Function} appFn - 최상위 컴포넌트 함수
       */
      render(appFn) {
        rootNode.appendChild(appFn());
      },
    };
  },
};

export default yong;
