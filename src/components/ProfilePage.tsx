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
    <section className="w-full max-w-3xl mx-auto my-10 px-4">
      <div className="rounded-2xl border p-10 shadow-lg bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <Image 
            src={getAvatarSource(profile?.image ?? null)}
            alt={`${profile?.name}'s avatar`}
            width={120}
            height={120}
            className="mb-6 md:mb-0 h-28 w-28 rounded-full object-cover border-2 border-slate-200 shadow-sm mx-auto md:mx-0"        
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{profile?.name}</h1>
            <div className="text-slate-500 font-medium mb-2">@{profile?.username}</div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              {profile?.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 border border-sky-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
              <span className="inline-block text-lg font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-md">
                {formatMoney(profile?.salary ?? 0)} <span className="text-xs text-green-600">/day</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-slate-700">Website</h2>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Example: Add more fields as needed */}
            <span className="inline-block text-slate-500 text-sm font-mono">{profile?.website}</span>
            {/* Add LinkedIn, website, email, etc. if available in profile */}
          </div>
        </div>
        {/* Bio Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-slate-700">About</h2>
          <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line">
            {profile?.bio ?? "This user has not provided a bio yet."}
          </p>
        </div>
        {/* Optionally, add more sections: portfolio, experience, etc. */}
      </div>
    </section>
  );
}