import { create } from "zustand";

type TextExpandState = {
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
    };


const useTextExpandStore = create<TextExpandState>((set) => ({
  isExpanded: false,
  setIsExpanded: (isExpanded: boolean) => set({ isExpanded }),
}));

export default useTextExpandStore;
