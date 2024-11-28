export const COUNTER_ACTION = {
  UP: "countUp",
  DOWN: "countDown",
  RESET: "countReset",
};

// 액션을 생성해서 반환
const counterActionCreator = {
  countUp: (step) => ({ type: COUNTER_ACTION.UP, payload: { step } }),
  countDown: (step) => ({ type: COUNTER_ACTION.DOWN, payload: { step } }),
  countReset: () => ({ type: COUNTER_ACTION.RESET }),
};

export default counterActionCreator;
