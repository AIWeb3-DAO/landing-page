// header.tsx
"use client";
// the :point_up: use client was necessary to make this module work
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";

export const Header = () => {
  const {userId,} = useAuth()
  console.log("user id", userId)
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="grid w-full flex-grow items-center bg-white text-red-500  sm:justify-end h-[60px]">
          <SignedOut  >
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};