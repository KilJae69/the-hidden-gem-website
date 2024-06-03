import Image from "next/image";
import Link from "next/link";
import imageLogo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Hidden Gem logo" /> */}
      <Image
        src={imageLogo}
        width={60}
        height={60}
        quality={100}
        alt="The Hidden Gem logo"
      />
      <span className="hidden text-xl font-semibold text-primary-100 sm:block">
        Hidden Gem
      </span>
    </Link>
  );
}

export default Logo;
