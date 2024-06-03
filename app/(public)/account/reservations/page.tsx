// import ReservationCard from "@/components/ReservationCard";



import ReservationList from "@/components/ReservationList";
import { getBookingsByGuestIdAction } from "@/lib/actions/booking.action";
import { auth } from "@/lib/auth";


export const metadata = {
  title: "Reservations",
  description: "Reservations Page",
};

export default async function Page() {
  const session = await auth();

  const guestId = session?.user?.guestId ? session.user.guestId : null;
  
  const bookings = await getBookingsByGuestIdAction(guestId!);
 
console.log("bookings", bookings);
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

    
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings}/>
      )}
    </div>
  );
}
