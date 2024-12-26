"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const NavLinks = [
    { 
      href: "/jobs", 
      label: "Find Jobs", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      )
    },
    { 
      href: "/jobs/new", 
      label: "Post Job", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      )
    }
  ];

  const AuthenticatedNavLinks = [
    { 
      href: "/dashboard", 
      label: "Dashboard", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
    }
  ];

  const renderNavLinks = (links: Array<{href: string, label: string, icon: React.ReactNode}>) => (
    links.map((link) => (
      <Link 
        key={link.href} 
        href={link.href} 
        className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-black"
      >
        {link.icon}
        {link.label}
      </Link>
    ))
  );

  if (!session) {
    return (
      <header className="shadow-sm bg-white">
        <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} height={80} alt="NeoFreelance Logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {renderNavLinks(NavLinks)}
            </div>
            <div className="flex space-x-2">
              <Button asChild variant="outline" className="px-4 py-2">
                <Link href="/auth/sign-in">Login</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="shadow-sm bg-white">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} height={80} alt="NeoFreelance Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            {renderNavLinks(NavLinks)}
            {renderNavLinks(AuthenticatedNavLinks)}
          </div>
          <Button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            variant="destructive"
            className="px-4 py-2"
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}