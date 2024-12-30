"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

const randomImages = [
  { name: avatar1, source: "avatar-1.png" },
  { name: avatar2, source: "avatar-2.png" },
  { name: avatar3, source: "avatar-3.png" },
];

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();

  console.log('Session NavBar:', session);

  const [avatar, setAvatar] = useState<string | null>(avatar1.src);

  useEffect(() => {
    if (session) {
      // Fetch the user's profile data to get the avatar
      fetch("/api/dashboard/avatar", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        })
        .then((response) => { 
          if (response.status === 404) {
            // Profile not found, set a default avatar
            setAvatar(avatar1.src);
            return null;
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data:', data);
          if (!data) return;
          setAvatar(data.avatar);
        })
        .catch((error) => {
          console.error("Error fetching avatar:", error);
        });
    }
  }, [session]);

  const getAvatarSource = (avatar: string | null) => {
    console.log('Avatar:', avatar);
    const avatarObj = randomImages.find((img) => img.source === avatar);
    console.log('Avatar:', avatarObj);
    return avatarObj ? avatarObj.name.src : avatar1.src;
  };

  const NavLinks = [
    { 
      href: "/jobs", 
      label: "Jobs", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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
                <AvatarImage src={getAvatarSource(avatar)} alt="@shadcn" />
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
                    router.push("/dashboard/profile");
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