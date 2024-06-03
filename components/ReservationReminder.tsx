"use client";

import useReservationStore from "@/store/reservationsStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

function ReservationReminder() {
  // CHANGE
  const { range, resetRange } = useReservationStore();

  if (range?.from === undefined || range?.to === undefined) return null;

  return (
    <div className="fixed bottom-6 left-1/2 flex w-[300px] -translate-x-1/2 items-center justify-around rounded-full bg-accent-500 px-2 py-6 text-xs font-semibold text-primary-800 shadow-xl shadow-slate-900 xs:text-sm">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={resetRange}
        className="rounded-full p-1 transition-all hover:bg-accent-600"
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  );
}

export default ReservationReminder;
