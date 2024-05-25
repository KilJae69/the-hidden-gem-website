"use client";

import { updateReservationAction } from "@/lib/actions";
import React from "react";
import { useFormStatus } from "react-dom";

interface ReservationFormProps {
  children: React.ReactNode;
  reservation: {
    id: number;
    numGuests: number;
    cabinId: number;
    observations: string;
  };
}

const UpdateReservationForm = ({
  reservation,
  children,
}: ReservationFormProps) => {
  return (
    <form action={updateReservationAction} className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
      <div className="space-y-2">{children}</div>
      <input name="bookingId" type="text" className="sr-only" defaultValue={reservation.id} />
      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultValue={reservation.observations}
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button />
      </div>
    </form>
  );
};

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update reservation"}
    </button>
  );
}

export default UpdateReservationForm;
