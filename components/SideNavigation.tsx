"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import SignOutButton from "./buttons/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="size-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="size-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="size-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className={`relative min-h-full w-16 rounded-r-lg border-r border-primary-900 transition-all duration-300 md:w-64`}
    >
      <ul className="sticky top-0 flex flex-col gap-2 text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex items-center justify-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 md:justify-start ${
                pathname === link.href ? "bg-primary-900 " : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden md:block">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className=" text-center">
          <SignOutButton labelStyles="hidden md:block" />
        </li>
      </ul>
      <div></div>
    </nav>
  );
}

export default SideNavigation;
