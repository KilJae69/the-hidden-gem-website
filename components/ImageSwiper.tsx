"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { EffectCreative, Pagination } from "swiper/modules";
import Image from "next/image";
import useTextExpandStore from "@/store/textExpandStore";

type ImageSwiperProps = {
  images: { name: string; url: string }[];
};

const ImageSwiper = ({ images }: ImageSwiperProps) => {
  const { isExpanded } = useTextExpandStore();
  return (
    <Swiper
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      grabCursor={true}
      modules={[EffectCreative, Pagination]}
      pagination={{ clickable: true }}
      className=" w-full scale-110"
    >
      {images.map((image) => (
        <SwiperSlide key={image.name}>
          <div
            className={`relative aspect-square min-w-[230px]${
              isExpanded ? "aspect-auto lg:aspect-[3/4]" : "lg:aspect-square"
            }`}
          >
            <Image
              src={image.url}
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcvXPnfwAHkgMuq6w/fwAAAABJRU5ErkJggg=="
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              alt={`Cabin ${image.name.replaceAll("_", " ")}`}
              className=" border border-primary-300 object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
