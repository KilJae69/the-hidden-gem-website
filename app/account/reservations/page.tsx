// import ReservationCard from "@/components/ReservationCard";


import ReservationCard from "@/components/ReservationCard";
import ReservationList from "@/components/ReservationList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";

export const metadata = {
  title: "Reservations",
  description: "Reservations Page",
};

export default async function Page() {
  const session = await auth();
  const guestId = session?.user?.guestId ? parseInt(session.user.guestId) : 0;
  const bookings = await getBookings(guestId);
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
