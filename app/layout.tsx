import React from "react";
import "@/styles/globals.css";


// eslint-disable-next-line camelcase
import { Josefin_Sans } from "next/font/google";


const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Hidden Gem",
    default: "Welcome | Hidden Gem",
  },
  description: "Luxurious cabins in the heart of the wilderness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className}relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        
          {children}
          
      </body>
    </html>
  );
}
