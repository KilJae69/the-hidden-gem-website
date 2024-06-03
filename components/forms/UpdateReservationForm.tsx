"use client";

import { updateReservationAction } from "@/lib/actions";
import React from "react";

import SubmitButton from "../buttons/SubmitButton";

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
    <form
      action={updateReservationAction}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">{children}</div>
      <input
        name="bookingId"
        type="text"
        className="sr-only"
        defaultValue={reservation.id}
        
      />
      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          defaultValue={reservation.observations}
         
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton label="Update reservation" pendingLabel="Updating..." />
      </div>
    </form>
  );
};

export default UpdateReservationForm;
