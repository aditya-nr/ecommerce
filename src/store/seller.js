import { create } from "zustand";

const useSeller = create((set) => ({
    isLogin: false,
    jwt: "",
    user: {},
    login: (jwt, user) => set((state) => ({
        isLogin: true, jwt, user
    })),
    logout: () => set(state => ({ isLogin: false }))
}))

export default useSeller;