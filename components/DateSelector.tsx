"use client";
import { isAlreadyBooked } from "@/lib/utils";
import useReservationStore from "@/store/reservationsStore";
import { Cabin, Settings } from "@/types/shared";
import { differenceInDays, isPast, isSameDay } from "date-fns";

import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import ReservationDetails from "./ReservationDetails";

interface DateSelectorProps {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const {
    range,
    setRange,
    resetRange,
    numGuests,
    includeBreakfast,
    resetForm,
  } = useReservationStore();

  // SETTINGS
  const { minBookingLength, maxBookingLength, breakfastPrice } = settings;

  const displayRange: DateRange | undefined = isAlreadyBooked(
    range,
    bookedDates
  )
    ? undefined
    : range;

  const { regularPrice, discount } = cabin;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const totalBreakfastPrice = numNights * numGuests * breakfastPrice;
  const cabinPrice =
    numNights * numGuests * (regularPrice - discount) +
    (includeBreakfast ? totalBreakfastPrice : 0);

  const handleSelect: SelectRangeEventHandler = (selectedRange) => {
    if (selectedRange?.from && selectedRange?.to) {
      if (isAlreadyBooked(selectedRange, bookedDates)) {
        resetRange();
      } else {
        setRange(selectedRange);
      }
    } else {
      setRange(selectedRange);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="  place-self-center pt-12"
        mode="range"
        onSelect={handleSelect}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date: any) => isSameDay(date, curDate))
        }
      />

      <ReservationDetails discount={discount} regularPrice={regularPrice} numGuests={numGuests} numNights={numNights} includeBreakfast={includeBreakfast} totalBreakfastPrice={totalBreakfastPrice} cabinPrice={cabinPrice} range={range} resetForm={resetForm}/>

     {/* <div className="mt-10 flex items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex flex-col items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">
                  ${(regularPrice - discount) * numGuests}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice * numGuests}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice * numGuests}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              {includeBreakfast ? (
                <p className="bg-accent-600 px-3 py-2 text-xl">
                  <span>+ Breakfast</span> <span>${totalBreakfastPrice}</span>
                </p>
              ) : null}

              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetForm}
          >
            Clear
          </button>
        ) : null}
      </div> */}
    </div>
  );
}

export default DateSelector;
