import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface ReservationState {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void; // Update the type of 'range' parameter
  resetRange: () => void;
}

const useReservationStore = create<ReservationState>((set) => ({
  range: undefined,
  setRange: (range) => set({ range }),
  resetRange: () => set({ range: undefined }),
}));

export default useReservationStore;
