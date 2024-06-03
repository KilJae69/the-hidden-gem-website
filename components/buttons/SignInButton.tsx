
import Image from "next/image";

interface SignInButtonProps {
  label: string;
  icon: string;
  alt: string;
  action: () => void; 
}

function SignInButton({ label, alt, icon,action }: SignInButtonProps) {
  return (
    <form action={action}>
      <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
        <Image src={icon} alt={alt} height="24" width="24" />
        <span>{label}</span>
      </button>
    </form>
  );
}

export default SignInButton;
