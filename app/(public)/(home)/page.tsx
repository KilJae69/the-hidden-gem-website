import Image from "next/image";
import Link from "next/link";
import bgImage from "@/public/bg.png";

export default function HomePage() {
  return (
    <div className=" mt-24 ">
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          fill
          placeholder="blur"
          quality={100}
          className="object-cover object-top"
          alt="Mountains and forests with two cabins"
        />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-clamp-h1 mb-10 font-normal tracking-tight text-primary-50 ">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
