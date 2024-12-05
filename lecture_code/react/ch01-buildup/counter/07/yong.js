/**
 * Yong 라이브러리 - React와 유사한 기능을 제공하는 간단한 UI 라이브러리
 * IIFE를 사용하여 private 스코프 구현
 */
const yong = (() => {
  // private 변수들
  let _root; // 루트 객체 참조
  let _stateValue; // 현재 상태값

  /**
   * 요소 노드를 생성하고 속성과 자식 노드를 설정하는 함수
   * @example createElement('button', { type: 'button', onclick: handleUp }, '+')
   */
  const createElement = (tag, props, ...children) => {
    // 요소 노드 생성
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

    // 자식 노드 추가 및 처리
    for (let child of children) {
      if (typeof child === "string" || typeof child === "number") {
        // 문자열이나 숫자는 텍스트 노드로 변환
        child = document.createTextNode(child);
      } else if (typeof child === "function") {
        // 함수형 자식 노드는 실행하여 결과를 사용
        child = child();
      }
      elem.appendChild(child);
    }

    return elem;
  };

  /**
   * 루트 노드 관리 객체를 생성하는 함수
   * @example createRoot(document.getElementById('root')).render(App)
   */
  const createRoot = (rootNode) => {
    let _appComponent; // 최상위 컴포넌트 함수 저장
    return (_root = {
      render(appFn) {
        // 최초 렌더링 시에만 컴포넌트 함수 저장
        _appComponent = _appComponent || appFn;

        // 기존 컨텐츠 제거
        if (rootNode.firstChild) {
          rootNode.firstChild.remove();
        }
        // 새로운 컨텐츠 렌더링
        rootNode.appendChild(_appComponent());
      },
    });
  };

  /**
   * React의 useState와 유사한 상태 관리 훅
   * @example const [count, setCount] = useState(10)
   */
  const useState = (initValue) => {
    // 최초 호출 시에만 초기값 설정
    if (_stateValue === undefined) {
      _stateValue = initValue;
    }

    /**
     * 상태 변경 함수
     * @example setValue(11)
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
