import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import {
  getCabinByIdAction,
  getCabinsAction,
} from "@/lib/actions/cabin.action";

import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { cabinId: string };
}) {
  const { name, description } = await getCabinByIdAction(
    Number(params.cabinId)
  );

  return {
    title: `Cabin ${name}`,
    description,
  };
}

// Not needed for this page
export async function generateStaticParams() {
  const cabins = await getCabinsAction();

  const ids = cabins.map((cabin) => ({ cabinId: cabin.id.toString() }));

  return ids;
}

export default async function CabinDetailsPage({
  params,
}: {
  params: { cabinId: string };
}) {
  const { cabinId } = params;
  const cabin = await getCabinByIdAction(Number(cabinId));

  return (
    <div className="mx-auto mt-8 max-w-6xl px-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
