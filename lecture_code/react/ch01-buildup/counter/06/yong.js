const yong = (() => {
  // 전역 상태 관리를 위한 private 변수들
  let _root; // 루트 객체 참조 저장
  let _stateValue; // 현재 상태값 저장

  /**
   * 요소 노드를 생성하고 속성과 자식 노드를 설정하는 함수
   * @param {string} tag - 생성할 HTML 요소의 태그 이름
   * @param {Object} props - 요소에 설정할 속성들을 담은 객체
   * @param {...(Node|string|number|Function)} children - 자식 노드들
   * @returns {Element} 생성된 DOM 요소
   */
  const createElement = (tag, props, ...children) => {
    const elem = document.createElement(tag);

    // 속성 및 이벤트 리스너 추가
    if (props) {
      for (const attrName in props) {
        const value = props[attrName];
        if (attrName.toLowerCase().startsWith("on")) {
          // 이벤트 리스너 등록 (예: onclick -> click)
          elem.addEventListener(attrName.toLowerCase().substring(2), value);
        } else {
          // 일반 속성 설정
          elem.setAttribute(attrName, value);
        }
      }
    }

    // 자식 노드 추가
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        child = document.createTextNode(child);
      } else if (typeof child === "function") {
        child = child(); // 함수형 자식 노드 실행
      }
      elem.appendChild(child);
    }

    return elem;
  };

  /**
   * 루트 노드 관리 객체 생성 함수
   * 컴포넌트의 리렌더링을 담당
   * @param {Element} rootNode - 루트 DOM 노드
   * @returns {Object} render 메서드를 가진 루트 관리 객체
   */
  const createRoot = (rootNode) => {
    let _appComponent; // 최상위 컴포넌트 함수 저장
    return (_root = {
      render(appFn) {
        // 최초 렌더링 시에만 컴포넌트 함수 저장
        _appComponent = _appComponent || appFn;

        // 기존 컨텐츠 제거 후 새로운 컨텐츠 렌더링
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
        }
        rootNode.appendChild(_appComponent());
      },
    });
  };

  /**
   * React의 useState와 유사한 상태 관리 훅
   * @param {any} initValue - 상태의 초기값
   * @returns {[any, Function]} 현재 상태값과 상태 변경 함수의 배열
   */
  const useState = (initValue) => {
    // 최초 호출 시에만 초기값 설정
    if (_stateValue === undefined) {
      _stateValue = initValue;
    }

    /**
     * 상태 변경 함수
     * @param {any} newValue - 새로운 상태값
     */
    function setValue(newValue) {
      const oldValue = _stateValue;
      _stateValue = newValue;

      // 상태가 실제로 변경된 경우에만 리렌더링
      if (!Object.is(oldValue, newValue)) {
        _root.render();
      }
    }

    return [_stateValue, setValue];
  };

  // 공개 API
  return { createElement, createRoot, useState };
})();

export default yong;
