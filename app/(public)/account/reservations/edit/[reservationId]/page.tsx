import SelectNumGuests from "@/components/SelectNumGuests";
import UpdateReservationForm from "@/components/forms/UpdateReservationForm";
import { getBooking } from "@/lib/data-service";
import React from "react";

const EditReservationPage = async ({ params }: any) => {
  const { reservationId: bookingId } = params;

  const reservation = await getBooking(Number(bookingId));

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservation.id}
      </h2>

      <UpdateReservationForm reservation={reservation}>
        <SelectNumGuests
          cabinId={reservation.cabinId}
          defaultValue={reservation.numGuests}
        />
      </UpdateReservationForm>
    </div>
  );
};

export default EditReservationPage;
