"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button
    className="cursor-pointer"
    variant="secondary"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;