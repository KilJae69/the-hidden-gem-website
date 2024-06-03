import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import github from "next-auth/providers/github";
import { CreateGuestAction, getGuestAction } from "./actions/guest.action";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuestAction(user.email!);

        if (!existingGuest) {
          const [firstName, lastName] = user.name!.split(" ");
         
          await CreateGuestAction({ email: user.email!, fullName: user.name!, firstName, lastName});
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuestAction(session.user.email);
      session.user.guestId = guest.id;
      session.user.firstName = guest.firstName;
      session.user.lastName = guest.lastName;
      session.user.nationalID = guest.nationalID;
      session.user.nationality = guest.nationality
      session.user.countryFlag = guest.countryFlag


      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
