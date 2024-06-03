import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
   range?.from &&
   range?.to &&
   datesArr.some((date: any) =>
     isWithinInterval(date, { start: range.from, end: range.to })
   )
 );
}
