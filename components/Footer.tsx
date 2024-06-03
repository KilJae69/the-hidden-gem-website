import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary-900 py-8 text-accent-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-accent-50">Hidden Gem</h2>
            <p className="mt-2 text-accent-200">
              Discover and book luxury cabins in the mountains. Experience the
              beauty of nature with top-notch comfort and amenities.
            </p>
          </div>

          <div className="flex w-full justify-around gap-5">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold text-accent-50">
                Quick Links
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-accent-200 hover:text-accent-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-accent-200 hover:text-accent-50"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cabins"
                    className="text-accent-200 hover:text-accent-50"
                  >
                    Cabins
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="text-accent-200 hover:text-accent-50"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-accent-50">
                Technologies Used
              </h3>
              <ul className="mt-2 space-y-2">
                <li className="text-accent-200">Next.js</li>
                <li className="text-accent-200">Tailwind CSS</li>
                <li className="text-accent-200">Supabase</li>
                <li className="text-accent-200">React Hook Form</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-accent-700 pt-4 text-center">
          <p className="text-accent-200">
            &copy; 2024 Hidden Gem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
