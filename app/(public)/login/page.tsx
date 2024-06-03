import SignInButton from "@/components/buttons/SignInButton";
import {
  signInGithubAction,
  signInGoogleAction,
} from "@/lib/actions/auth.action";

export const metadata = {
  title: "Login",
  description: "Accounts Page",
};

const LoginPage = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton
        label="Continue with Google"
        icon="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        action={signInGoogleAction}
      />
      <SignInButton
        label="Continue with Github"
        icon="https://authjs.dev/img/providers/github.svg"
        alt="Github logo"
        action={signInGithubAction}
      />
    </div>
  );
};

export default LoginPage;
