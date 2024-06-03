import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import TextExpander from "./TextExpander";

import CabinImages from "./CabinImages";


interface CabinProps {
  cabin: {
    id: number;
    name: string;
    maxCapacity: number;
    image: string;
    description: string;
  };
}

const Cabin = async ({ cabin }: CabinProps) => {
  const { name, maxCapacity, description } = cabin;

  return (
    <div className="relative mb-24 flex flex-col border border-primary-800 p-3 lg:flex-row lg:gap-20">
      
        <CabinImages cabinName={cabin.name} />
     

      <div className="pt-10 lg:pt-0">
        <h3 className="z-10 mb-5 whitespace-nowrap bg-primary-950 p-6 pb-1 text-3xl font-black text-accent-100 xs:text-5xl lg:relative lg:left-[-200px]">
          Cabin {name}
        </h3>

        <p className="mb-10 text-lg text-primary-300">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="size-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;
