"use client";

import { CabinsSearchParamsSchema } from "@/lib/actions/validations";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const validatedSearchParams =
    CabinsSearchParamsSchema.safeParse(searchParamsObject);

  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = validatedSearchParams.data?.capacity ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mx-auto flex flex-col border border-primary-800 text-xs xs:mx-0 xs:flex-row xs:text-sm">
      <div className="flex w-full">
        <FilterButton
          filter="all"
          handleFilter={handleFilter}
          label="All cabins"
          activeFilter={activeFilter}
        />
      </div>
      <div className="flex">
        <FilterButton
          filter="small"
          handleFilter={handleFilter}
          label="1&mdash;3 guests"
          activeFilter={activeFilter}
        />
        <FilterButton
          filter="medium"
          handleFilter={handleFilter}
          label="4&mdash;7 guests"
          activeFilter={activeFilter}
        />
        <FilterButton
          filter="large"
          handleFilter={handleFilter}
          label="8&mdash;12 guests"
          activeFilter={activeFilter}
        />
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  filter: string;
  handleFilter: (filter: string) => void;
  activeFilter: string;
}

function FilterButton({
  label,
  filter,
  handleFilter,
  activeFilter,
}: FilterButtonProps) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`w-full whitespace-nowrap px-3 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {label}
    </button>
  );
}

export default Filter;
