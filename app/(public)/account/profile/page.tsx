import Spinner from "@/components/Spinner";
import UpdateProfile from "@/components/UpdateProfile";
import { Suspense } from "react";

export const metadata = {
  title: "Guest profile",
  description: "Guest profile page",
};

export default function ProfilePage() {
  // CHANGE

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>  */}

      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <UpdateProfile />
      </Suspense>
    </div>
  );
}
