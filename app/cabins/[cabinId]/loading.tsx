import Spinner from "@/components/Spinner";

const LoadingCabins = () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
};

export default LoadingCabins;
