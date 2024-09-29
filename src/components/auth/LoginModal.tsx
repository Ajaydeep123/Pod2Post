"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-4 antialiased">
          Login / Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Login/Signup</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r ">
            Pod2Post
          </h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleGoogleLogin}>
          <Image
            src="/images/google.png"
            className=" mr-4"
            width={25}
            height={25}
            alt="google"
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
