import React from "react";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Showcase from "@/components/landing/Showcase";
import { NewPricing } from "@/components/landing/NewPricing";
import { FAQ } from "@/components/landing/FAQ";
export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <>
      <Navbar user={session?.user} />
      <HeroSection user={session?.user}/>
      <Showcase />
      {/* <Pricing user={session?.user} /> */}
      <NewPricing user={session?.user} />
      <FAQ />
      <Footer />
    </>
  );
}