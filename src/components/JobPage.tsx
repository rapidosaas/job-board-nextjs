"use client";

import { formatMoney } from "@/lib/utils";
import { Banknote, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

type Job = {
  _id: number;
  title: string;
  description: string;
  company: string;
  type: string;
  location: string;
  salary: number;
  createdAt: Date;
};

interface JobPageProps {
  readonly slug: string;
}

export default function JobPage({
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
            <h1 className="text-xl font-bold">{job?.title}</h1>
            <p className="font-semibold">
                <span>{job?.company}</span>
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {job?.type}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(job?.salary ?? 0)}
            </p>
          </div>
        </div>
      </div>
      <div>{job?.description}</div>
    </section>
  );
}