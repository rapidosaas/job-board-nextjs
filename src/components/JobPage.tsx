"use client";

import { formatMoney } from "@/lib/helpers";
import { Banknote, Briefcase, MapPin, Handshake } from "lucide-react";
import { useEffect, useState } from "react";
import Job from "@/lib/types/job";
import Link from "next/link";

interface JobPageProps {
  readonly slug: string;
}

export default function JobPage({
  slug,
}: JobPageProps) {

  const [job, setJob] = useState<Job | undefined>();
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
      fetch("/api/job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      })
      .then((res) => res.json())
      .then((data) => {
      setJob(data.job);
      // Fetch username if userId is present
      if (data.job?.userId) {
        fetch(`/api/username`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: data.job.userId }),
        })
          .then((res) => res.json())
          .then((profile) => {
            console.log("Result :", profile);
            setUsername(profile?.username);
            console.log("Username:", profile?.username);
          })
          .catch(() => setUsername(undefined));
      } else {
        setUsername(undefined);
      }
      })
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <div>
          <div>
            <h1 className="text-2xl font-bold">{job?.title}</h1>
            <p className="text-xl">
                <span>{job?.company}</span>
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-2">
              {job?.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition"
                >
                  {skill}
                </span>
              ))}
            </p>
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {job?.type}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(job?.salaryMin ?? 0, job?.currency)} - {formatMoney(job?.salaryMax ?? 0, job?.currency)}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {job?.location ?? "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Handshake size={16} className="shrink-0" />
              %{job?.percentage}
            </p>
          </div>
        </div>
      </div>
      <div>{job?.description}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Posted on {new Date(job?.createdAt ?? '').toLocaleDateString()} by {username ? (
            <Link href={`/u/${username}`} className="underline hover:text-blue-600">@{username}</Link>
          ) : 'unknown'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => window.location.href = `${job?.urlToApply ?? '#'}`}
        >
          Apply Now
        </button>
      </div>
    </section>
  );
}