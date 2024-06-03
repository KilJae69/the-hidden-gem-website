import React from "react";
import ImageSwiper from "./ImageSwiper";
import { getImagesByCabinNameAction } from "@/lib/actions/cabin.action";

const CabinImages = async ({ cabinName }: { cabinName: string }) => {
  const images = await getImagesByCabinNameAction(cabinName);
  return (
    <div className="mx-auto w-full max-w-[650px] lg:max-w-[500px]">
      <ImageSwiper images={images} />
    </div>
  );
};

export default CabinImages;
