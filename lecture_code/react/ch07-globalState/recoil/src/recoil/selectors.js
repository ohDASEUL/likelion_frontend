import { counterState } from "@recoil/atoms";
import { selector } from "recoil";

export const counterStateKor = selector({
  key: "korCount", // atom 식별자로 모든 atom에서 고유해야 함
  get: ({ get }) => {
    const count = get(counterState);
    return count * count;
  },
});
