import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";
import { Booking } from "@/types/shared";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type BookingProps = {
  booking: Booking;

  onDelete: (bookingId: number) => void;
};

function ReservationCard({ onDelete, booking }: BookingProps) {
  const {
    id,

    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,

    // eslint-disable-next-line camelcase
    created_at,
    cabins,
  } = booking;

  return (
    <div className="flex flex-col gap-3 border border-primary-800 pb-3 lg:flex-row lg:pb-0">
      <div className="relative aspect-video h-32 lg:aspect-square">
        <Image
          src={cabins.image}
          alt={`Cabin ${cabins.name}`}
          fill
          className="border-r border-primary-800 object-cover"
        />
        <div className="absolute ">
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
              past
            </span>
          ) : (
            <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
              upcoming
            </span>
          )}
        </div>
      </div>

      <div className="flex grow flex-col gap-3 px-6 py-3 lg:gap-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {cabins.name}
          </h3>
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(String(startDate))}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-col items-baseline gap-5 lg:flex-row">
          <div className="flex gap-3 whitespace-nowrap">
            <p className="text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-[100px] border-primary-800 lg:flex-col lg:border-l">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex grow items-center gap-2 border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 lg:border-b"
            >
              <PencilSquareIcon className="size-5 text-primary-600 transition-colors group-hover:text-primary-800" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
