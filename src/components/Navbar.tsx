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
            <Image src={logo} width={40} height={40} alt="Your Job Board logo" />
            <span className="text-xl font-bold tracking-tight">Your Job Board</span>
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
            <Image src={logo} width={40} height={40} alt="Your Job Board logo" />
            <span className="text-xl font-bold tracking-tight">Your Job Board</span>
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