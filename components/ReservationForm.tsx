"use client";

import { createReservationAction } from "@/lib/actions";
import useReservationStore from "@/store/reservationsStore";
import { Cabin, GuestUser } from "@/types/shared";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useFormStatus } from "react-dom";



interface ReservationFormProps {
  user: GuestUser | null | undefined;
  cabin: Cabin;
}

function ReservationForm({ user, cabin }: ReservationFormProps) {
  const { range, resetRange } = useReservationStore();
  const { maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from ?? "";
  const endDate = range?.to ?? "";

  console.log("user", user);
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
  };

  const createReservationWithData = createReservationAction.bind(
    null,
    bookingData
  );

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            width={32}
            height={32}
            src={user?.image ?? ""}
            alt={user?.name ?? ""}
          />
          <p>{user?.name}</p>
        </div>
      </div>

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <Button />
          )}
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Reserving..." : "Reserve Now"}
    </button>
  );
}

export default ReservationForm;
