"use client";

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
      href: "/about", 
      label: "About",
    },
  ];

  const AuthenticatedNavLinks = [
    { 
      href: "/u", 
      label: "Talents",
    },
    {
      href: "/jobs",
      label: "Opportunities",
    }
  ];

  const renderNavLinks = (links: Array<{href: string, label: string}>) => (
    links.map((link) => (
      <Link 
        key={link.href} 
        href={link.href} 
        className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-black"
      >
        {link.label}
      </Link>
    ))
  );

  if (!session) {
    return (
      <header className="shadow-sm bg-white">
        <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
          <Link href="/">
          <h1 className="flex items-center text-2xl font-bold">
            <span className="text-blue-300">neo</span><span className="text-blue-600">Freelance</span>
          </h1>
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
        <Link href="/">
        <h1 className="flex items-center text-2xl font-bold">
          <span className="text-blue-300">neo</span><span className="text-blue-600">Freelance</span>
        </h1>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
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
								<span>My Account</span>
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
                  Dashboard
                </DropdownMenuItem>
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