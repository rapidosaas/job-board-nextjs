import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";
import { useEffect, useState } from "react";

type Job = {
  _id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  salary: number;
  createdAt: Date;
  slug: string;
}
interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

const jobsPerPage = 5;

/**
const jobs = Array.from({ length: jobsPerPage }, (_, i) => ({
  id: i,
  title: "Senior Frontend Developer",
  companyName: "Flow",
  type: "Full-time",
  locationType: "Full Remote",
  location: "Worldwide",
  salary: 250,
  createdAt: new Date(),
  slug: "senior-frontend-developer",
}));
*/

export default function JobResults({
  filterValues,
  page = 1,
}: Readonly<JobResultsProps>) {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...filterValues, page, jobsPerPage }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setJobs(data.jobs);
      setTotalJobs(data.total);
    })
    .catch((err) => console.log(err));
  }, [filterValues, page]);

  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => (
        <Link key={job._id.toString()} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs?.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs?.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalJobs / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { title, type },
}: Readonly<PaginationProps>) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(title && { title }),
      ...(type && { type }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
