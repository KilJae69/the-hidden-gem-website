import { create } from "zustand";
import { DateRange } from "react-day-picker";

interface ReservationState {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void; // Update the type of 'range' parameter
  resetRange: () => void;
  numGuests: number;
  setNumGuests: (numGuests: number) => void;
  observations: string;
  setObservations: (observations: string) => void;
  includeBreakfast: boolean;
  setIncludeBreakfast: (includeBreakfast: boolean) => void;
  resetForm: ()=>void;
}

const useReservationStore = create<ReservationState>((set) => ({
  range: undefined,
  setRange: (range) => set({ range }),
  resetRange: () => set({ range: undefined }),
  numGuests: 1,
  setNumGuests: (numGuests) => set({ numGuests }),
  observations: "",
  setObservations: (observations) => set({ observations }),
  includeBreakfast: false,
  setIncludeBreakfast: (includeBreakfast) => set({ includeBreakfast }),
  resetForm: () => set({ range: undefined, numGuests: 1, observations: "", includeBreakfast: false }),
}));

export default useReservationStore;
