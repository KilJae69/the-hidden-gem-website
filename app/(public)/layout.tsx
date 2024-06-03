import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({ children}:{children: React.ReactNode}) {
  return (
    <>
      <Header />

      <main className="mx-auto min-h-screen w-full max-w-7xl py-12">
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </main>

      <Footer />
    </>
  );
}
