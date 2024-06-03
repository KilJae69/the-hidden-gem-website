import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      guestId: number;
      firstName: string;
      lastName: string;
      nationalID: string;
      nationality: string;
      countryFlag: string;
    } & DefaultSession["user"];
  }
 // eslint-disable-next-line no-unused-vars
  interface User {
    guestId: number;
    name: string;
    email: string;
    image: string;
    firstName: string;
    lastName: string;
    nationalID: string;
    nationality: string;
    countryFlag: string;
  }
}