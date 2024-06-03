"use client"

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard"
import { deleteReservationAction } from "@/lib/actions";
import { Booking } from "@/types/shared";

interface ReservationListProps {
    bookings: Booking[]; 
}

const ReservationList = ({bookings}: ReservationListProps) => {

  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (curBookings,bookingId)=>{
    return curBookings.filter((booking)=>booking.id !== bookingId)
  })


  async function  handleDelete(bookingId: number){
    optimisticDelete(bookingId)
    await deleteReservationAction(bookingId)
  }

    return (
        <ul className="space-y-6">
                    {optimisticBookings.map((booking) => (
                        <ReservationCard booking={booking} key={booking.id} onDelete = {handleDelete}/>
                    ))}
                </ul>
    )
}

export default ReservationList