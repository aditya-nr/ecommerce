import { create } from "zustand";

const useProduct = create((set) => ({
    products: [],
    setProduct: (data) => set(state => ({ products: data })),
}))

export default useProduct;