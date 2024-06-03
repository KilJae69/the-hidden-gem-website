import DateSelector from "./DateSelector";
import ReservationForm from "./forms/ReservationForm";
import { auth } from "@/lib/auth";
import LoginMessage from "./LoginMessage";
import { Cabin } from "@/types/shared";
import { getBookedDatesByCabinIdAction } from "@/lib/actions/booking.action";
import { getSettingsAction } from "@/lib/actions/settings.action";

interface CabinProps {
  cabin: Cabin;
}

const Reservation = async ({ cabin }: CabinProps) => {
  const [settings, bookedDates] = await Promise.all([
    getSettingsAction(),
    getBookedDatesByCabinIdAction(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-[400px] grid-cols-1 border border-primary-800 lg:grid-cols-2">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          user={session.user}
          cabin={cabin}
          breakfastPrice={settings.breakfastPrice}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
