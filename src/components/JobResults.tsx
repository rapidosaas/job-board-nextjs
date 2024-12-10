import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

const jobsPerPage = 5;
const totalResults = 10;
const jobs = Array.from({ length: jobsPerPage }, (_, i) => ({
  id: i,
  title: "Senior Frontend Developer",
  companyName: "Flow",
  type: "Full-time",
  locationType: "Full Remote",
  location: "Worldwide",
  salary: 250,
  createdAt: new Date().toISOString(),
  slug: "senior-frontend-developer",
}));

export default async function JobResults({
  filterValues,
  page = 1,
}: Readonly<JobResultsProps>) {

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
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
  filterValues: { q, type, location, remote },
}: Readonly<PaginationProps>) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
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
