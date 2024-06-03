import Image from "next/image";
import aboutImage1 from "@/public/about-1.jpg";
import { getCabins } from "@/lib/data-service";

import aboutImage2 from "@/public/about-2.jpg";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About Page",
};

export const revalidate = 86400; // 1 day

const AboutPage = async () => {
  const cabins = await getCabins();

  return (
    <div className="flex flex-col gap-10 px-8 text-lg">
      <section className="flex flex-col">
        <h1 className="mb-10 text-4xl font-medium text-accent-400">
          Welcome to The Hidden Gem Resort
        </h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="space-y-8">
            <p>
              Experience the perfect blend of natural beauty and luxurious
              comfort at The Hidden Gem Resort. Nestled in the heart of the
              Italian Dolomites, this secluded retreat offers a haven away from
              the hustle and bustle of daily life. But it’s more than just
              luxurious cabins—it’s about immersing yourself in nature and
              cherishing simple moments with loved ones.
            </p>

            <p>
              Our <span>{cabins.length}</span> luxury cabins serve as a cozy
              base, offering you the freedom to explore the majestic mountains.
              Stroll through lush forests, inhale the crisp mountain air, and
              gaze at the starlit sky from the comfort of your campfire or
              private hot tub.
            </p>

            <p>
              Here, unforgettable memories are made amidst nature’s splendor.
              It’s a place to unwind, relax, and relish the joy of being
              together in an exquisite setting.
            </p>
          </div>
          <div className="mx-auto max-h-[500px] max-w-[500px] overflow-hidden rounded-lg border">
            <Image
              placeholder="blur"
              src={aboutImage1}
              className="size-full  rounded-lg object-cover"
              alt="Family sitting around a fire pit in front of cabin"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <h1 className="mb-10 text-4xl font-medium text-accent-400">
          Managed by our family since 1982
        </h1>

        <div className="flex flex-col-reverse gap-10 lg:flex-row">
          <div className="mx-auto max-h-[500px] max-w-[500px] overflow-hidden rounded-md border">
            <Image
              placeholder="blur"
              src={aboutImage2}
              className="size-full rounded-md  object-cover"
              alt="Family that manages The Wild Oasis"
            />
          </div>
          <div className="space-y-8">
            <p>
              Since 1982, The Hidden Gem Resort has been a beloved family-run
              sanctuary. Founded by our grandparents, this retreat has been
              lovingly preserved and enhanced, embodying our commitment to
              providing a warm, inviting atmosphere.
            </p>
            <p>
              Throughout the years, we’ve retained the essence of The Hidden Gem
              Resort, merging the timeless allure of the mountains with the
              personalized touch that only a family-run business can offer.
              Here, you’re more than just a guest—you’re part of our extended
              family.
            </p>
            <p>
              Join us at The Hidden Gem Resort, where tradition meets
              tranquility, and every visit feels like coming home. Our
              dedication to hospitality ensures that your stay is memorable,
              peaceful, and filled with joy.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto">
        <Link
          href="/cabins"
          className="mt-4 inline-block bg-accent-500 px-8 py-5 text-sm font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:text-lg"
        >
          Explore our luxury cabins
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
