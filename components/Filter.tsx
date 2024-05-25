"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        label="All cabins"
        activeFilter={activeFilter}
      />
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
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {label}
    </button>
  );
}

export default Filter;
