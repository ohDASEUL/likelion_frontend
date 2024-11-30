import { atom } from "jotai";

// Primitive atom 생성: 기본값 0을 가진 상태 atom 생성
// 모든 타입(boolean, number, string, object, array 등)이 가능
export const countAtom = atom(0);
