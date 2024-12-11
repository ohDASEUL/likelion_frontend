// userStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
      // tokenExpiry 확인 함수 추가
      isTokenValid: (state) => {
        if (!state.user?.tokenExpiry) return false;
        return new Date().getTime() < state.user.tokenExpiry;
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
