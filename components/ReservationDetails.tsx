import { DateRange } from "react-day-picker";

type ReservationDetailsProps = {
  discount: number;
  regularPrice: number;
  numGuests: number;
  numNights: number;
  includeBreakfast: boolean;
  totalBreakfastPrice: number;
  cabinPrice: number;
  range: DateRange | undefined;
  resetForm: () => void;
};

const ReservationDetails = ({
  discount,
  regularPrice,
  numGuests,
  numNights,
  includeBreakfast,
  totalBreakfastPrice,
  cabinPrice,
  range,
  resetForm,
}: ReservationDetailsProps) => {
  return (
    <div className="mt-7 flex min-h-[262px] flex-col items-center justify-between whitespace-nowrap bg-accent-500 px-2 py-5 text-primary-800 md:min-h-[162px] lg:min-h-[154px] lg:pb-0">
      <div
        className={`flex flex-col items-center gap-2 text-center md:flex-row md:items-baseline lg:flex-col lg:justify-start ${
          !numNights ? " md:flex-col" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-2 md:flex-row ">
          <p
            className={`flex items-baseline gap-2 ${
              !numNights ? "items-center justify-center text-2xl" : ""
            }`}
          >
            {discount > 0 ? (
              <>
                <span >
                  ${(regularPrice - discount) * numGuests}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice * numGuests}
                </span>
              </>
            ) : (
              <span>${regularPrice * numGuests}</span>
            )}
            <span >/night</span>

            {numNights ? (
              <span className="inline-block whitespace-nowrap bg-accent-600 px-3">
                <span className="text-sm"> x {numNights}</span>
              </span>
            ) : null}
          </p>

          {numNights && includeBreakfast ? (
            <p className=" bg-accent-600 px-3 py-2 text-sm">
              <span>+ Breakfast</span> <span>${totalBreakfastPrice}</span>
            </p>
          ) : null}
        </div>
        {!numNights ? (
          <p className="whitespace-normal text-xl">
            Please select dates to calculate price
          </p>
        ) : null}
        <div className="flex flex-col items-center gap-2 md:flex-row ">
          {numNights ? (
            <p className="whitespace-normal">
              <span className="text-sm font-bold uppercase">
                Selected dates
              </span>{" "}
              <span className="whitespace-nowrap text-sm font-semibold">
                {range?.from?.toLocaleDateString()} -{" "}
                {range?.to?.toLocaleDateString()}
              </span>
            </p>
          ) : null}

          {numNights ? (
            <p className="bg-accent-600 px-3 py-2 text-lg">
              <span className=" font-bold uppercase">Total</span>{" "}
              <span className=" font-semibold">${cabinPrice}</span>
            </p>
          ) : null}
        </div>
      </div>

      {range?.from || range?.to ? (
        <button
          className="mt-2 w-full border border-primary-800 px-4 py-2 text-sm font-semibold"
          onClick={resetForm}
        >
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default ReservationDetails;
