"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import avatarImage from "@/assets/avatar-1.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();

  console.log('Session NavBar:', session);

  const NavLinks = [
    { 
      href: "/jobs", 
      label: "Jobs", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      )
    },
    { 
      href: "/pricing", 
      label: "Pricing", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
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
            <Image src={logo} height={60} alt="NeoFreelance Logo" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {renderNavLinks(NavLinks)}
            </div>
            <div className="flex space-x-2">
              <Button asChild variant="default" className="px-4 py-2">
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
          <Image src={logo} height={60} alt="NeoFreelance Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            {renderNavLinks(NavLinks)}
            {renderNavLinks(AuthenticatedNavLinks)}
          </div>
          <DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="size-10 cursor-pointer border border-border items-center">
                <AvatarImage src={avatarImage.src} alt="@shadcn" />
								<AvatarFallback>
									{session?.user?.email
										?.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end">
							<DropdownMenuLabel className="flex flex-col">
								My Account
                <span className="text-xs font-normal text-muted-foreground">
                  {session?.user?.email}
                </span>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Profile
                </DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => signOut({ callbackUrl: '/' })}
							>
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
        </div>
      </nav>
    </header>
  );
}