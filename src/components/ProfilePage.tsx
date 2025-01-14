"use client";

import { formatMoney } from "@/lib/helpers";
import { Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import Badge from "./Badge";
import Profile from "@/lib/types/profile";

interface JobPageProps {
  readonly username: string;
}

export default function JobPage({
  username,
}: JobPageProps) {

  const [profile, setProfile] = useState<Profile | undefined>();

    useEffect(() => {
        fetch("/api/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        })
        .then((res) => res.json())
        .then((data) => {
        console.log(data);
        setProfile(data.profile);
        })
        .catch((err) => console.log(err));
    }, [username]);

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <div>
          <div>
            <h1 className="text-xl font-bold">{profile?.username}</h1>
            <p className="font-semibold">
                <span>{profile?.name}</span>
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(profile?.salary ?? 0)} 
            </p>
            <p className="flex items-center gap-1">
              {profile?.skills.map((skill: string) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div>{profile?.bio}</div>
    </section>
  );
}