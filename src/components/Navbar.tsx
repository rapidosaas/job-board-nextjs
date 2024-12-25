"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession();

  if (!session) {
    return (
      <header className="shadow-sm">
        <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} height={80} alt="NeoFreelance Logo" />
          </Link>
          <div className="flex gap-1">
          <Button asChild>
            <Link href="/auth/sign-in">Login</Link>
          </Button>
          </div>
        </nav>
      </header>
    );
  }

  if (session) {
    return (
      <header className="shadow-sm">
        <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} height={80} alt="NeoFreelance Logo" />
          </Link>
          <div className="flex gap-1 items-center">
          <Link href="/dashboard" className="underline">Dashboard</Link>
          <Button onClick={()=>signOut()}>
            Logout
          </Button>
          </div>
        </nav>
      </header>
    );
  }

}