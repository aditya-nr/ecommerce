import { create } from "zustand";

const useConstant = create((set) => ({
    backendURL: "https://api.aditya-nr.in:3001"
}))

export default useConstant;