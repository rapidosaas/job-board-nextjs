"use client";

import { formatMoney } from "@/lib/helpers";
import { Banknote, Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Job from "@/lib/types/job";

interface JobPageProps {
  readonly slug: string;
}

export default function JobPagePublished({
  slug,
}: JobPageProps) {

  const [job, setJob] = useState<Job | undefined>();

  useEffect(() => {
      fetch("/api/job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      })
      .then((res) => res.json())
      .then((data) => {
      console.log(data);
      setJob(data.job);
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
            <p className="flex items-center gap-1">
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
              {formatMoney(job?.salaryMin ?? 0)} - {formatMoney(job?.salaryMax ?? 0)}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {job?.location ?? "Worldwide"}
            </p>
          </div>
        </div>
      </div>
      <div>{job?.description}</div>
    </section>
  );
}