import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "@/lib/auth";
import LoginMessage from "./LoginMessage";
import { Cabin } from "@/types/shared";

interface CabinProps {
  cabin: Cabin;
}

const Reservation = async ({ cabin }: CabinProps) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  console.log("Session log",session);

  return (
    <div className="grid min-h-[400px] grid-cols-1 border border-primary-800 lg:grid-cols-2">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm user={session.user} cabin={cabin} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
