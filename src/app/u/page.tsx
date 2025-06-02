"use client";
import Profile from '@/lib/types/profile';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatMoney, truncateText } from '@/lib/helpers';

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";

const randomImages = [
  { name: avatar1, source: "avatar-1.png" },
  { name: avatar2, source: "avatar-2.png" },
  { name: avatar3, source: "avatar-3.png" },
];

export default function ProfilesListPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/profiles', { method: 'GET' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profiles');
        return res.json();
      })
      .then(data => {
        // Accept both { profiles: [...] } and { profile: {...} } for compatibility
        if (Array.isArray(data.profiles)) {
          setProfiles(data.profiles);
        } else if (data.profile) {
          setProfiles([data.profile]);
        } else {
          setProfiles([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getAvatarSource = (avatar: string | null) => {
    console.log('Avatar:', avatar);
    const avatarObj = randomImages.find((img) => img.source === avatar);
    console.log('Avatar:', avatarObj);
    return avatarObj ? avatarObj.name.src : avatar1.src;
  };

  if (loading) return <div className="p-4 text-center">Loading profiles...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <main className="max-w-3xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Profiles</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {profiles.length === 0 && <div className="text-center text-muted-foreground col-span-full">No profiles found.</div>}
        {profiles.map(profile => (
          <Link
            key={profile._id ?? profile.username}
            href={`/u/${profile.username}`}
          >
            <section className="grid gap-6 max-w-[400px] md:max-w-[500px] mx-auto">
                <div className="rounded-2xl border p-10 text-center shadow-lg">
                <Image 
                    src={getAvatarSource(profile?.image ?? null)}
                    alt={`${profile?.name}'s avatar`}
                    width={100}
                    height={100}
                    className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"        
                />
                <h1 className="text-xl font-semibold text-slate-800">{truncateText(profile?.name, 10)}</h1>
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
                </div>
            </section>
          </Link>
        ))}
      </div>
    </main>
  );
}
