import { create } from 'zustand'

const useBuyer = create((set) => ({
    isLogin: false,
    jwt: "",
    user: {},
    login: (jwt, user) => set((state) => ({
        isLogin: true, jwt, user
    })),
    logout: () => set(state => ({ isLogin: false })),
    addToCart: (pid) => set(state => ({ ...state, user: { ...state.user, cart: [...state.user.cart, pid] } })),
    emptyCart: () => set(state => ({ ...state, user: { ...state.user, cart: [] } }))
}))

export default useBuyer;