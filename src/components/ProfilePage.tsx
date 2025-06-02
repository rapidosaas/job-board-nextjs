"use client";

import { formatMoney } from "@/lib/helpers";
import { useEffect, useState } from "react";
import Profile from "@/lib/types/profile";
import Image from "next/image";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

const randomImages = [
  { name: avatar1, source: "avatar-1.png" },
  { name: avatar2, source: "avatar-2.png" },
  { name: avatar3, source: "avatar-3.png" },
];

interface JobPageProps {
  readonly username: string;
}

export default function JobPage({
  username,
}: JobPageProps) {

  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      setLoading(true);
      setError(null);
      fetch(`/api/profile?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Profile not found');
        return res.json();
      })
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  const getAvatarSource = (avatar: string | null) => {
    console.log('Avatar:', avatar);
    const avatarObj = randomImages.find((img) => img.source === avatar);
    console.log('Avatar:', avatarObj);
    return avatarObj ? avatarObj.name.src : avatar1.src;
  };

  if (loading) return <div className="p-4 text-center">Loading profile...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <section className="grid gap-6 max-w-[400px] md:max-w-[500px] mx-auto">
      <div className="rounded-2xl border p-10 text-center shadow-lg">
        <Image 
          src={getAvatarSource(profile?.image ?? null)}
          alt={`${profile?.name}'s avatar`}
          width={100}
          height={100}
          className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"        
        />
        <h1 className="text-xl font-semibold text-slate-800">{profile?.name}</h1>
        <h2 className="font-semibold text-slate-500">{formatMoney(profile?.salary ?? 0)}</h2>
        <p className="inline-block">
              {profile?.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition"
                >
                  {skill}
                </span>
              ))}
            </p>
        <p className="mt-8 text-sm font-normal text-slate-800">
          {profile?.bio ?? "This user has not provided a bio yet."}
        </p>
      </div>
    </section>
  );
}