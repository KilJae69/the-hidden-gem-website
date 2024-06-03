import CabinsList from "@/components/CabinsList";

import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";

import Spinner from "@/components/Spinner";
import { CabinsSearchParams, CabinsSearchParamsSchema } from "@/lib/actions/validations";
import { Suspense } from "react";

// export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Cabins",
  description: "Cabins Page",
};

const CabinsPage = ({ searchParams }: { searchParams: CabinsSearchParams }) => {
  const validatedParams = CabinsSearchParamsSchema.safeParse(searchParams);

  let filter = "all"; 
  if (validatedParams.success) {
    filter = validatedParams.data.capacity ?? "all";
  }

  return (
    <div className="px-8">
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinsList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default CabinsPage;
