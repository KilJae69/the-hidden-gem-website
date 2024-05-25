import { getCabin } from "@/lib/data-service";
import React from "react";

const SelectNumGuests = async ({
  cabinId,
  defaultValue,
}: {
  cabinId: number;
  defaultValue: number;
}) => {
  const cabinData = await getCabin(cabinId);
  
  return (
    <>
      <label htmlFor="numGuests">How many guests?</label>
      <select
        name="numGuests"
        id="numGuests"
        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        defaultValue={defaultValue}
        required
      >
        <option value="" key="">
          Select number of guests...
        </option>
        {Array.from({ length: cabinData.maxCapacity }, (_, i) => i + 1).map(
          (x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          )
        )}
      </select>
    </>
  );
};

export default SelectNumGuests;
