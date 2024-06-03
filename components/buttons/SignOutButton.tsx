import { signOutAction } from "@/lib/actions/auth.action";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

function SignOutButton({ labelStyles = "" }) {
  return (
    <form action={signOutAction}>
      <button className="flex w-full items-center justify-center gap-4 px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 md:justify-start">
        <ArrowRightOnRectangleIcon className="size-5 text-primary-600" />
        <span className={labelStyles}>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
