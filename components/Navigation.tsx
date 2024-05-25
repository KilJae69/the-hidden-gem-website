import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="flex items-center gap-2">
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt={session.user.name ?? ""}
                className="
                rounded-full"
              />
              <span>{session.user.name}</span>
            </Link>
          ) : (
            <Link href="/account">Guest area</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
