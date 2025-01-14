import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validations";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";
import Job from "@/lib/types/job";

const jobsPerPage = 5;

interface JobResultsProps {
  jobs: Job[];
  totalJobs: number;
  filterValues: {
    title?: string;
    type?: string;
  };
  page: number;
}

export default function JobResults({
  jobs,
  totalJobs,
  filterValues,
  page = 1,
}: Readonly<JobResultsProps>) {

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

    return `/jobs?${searchParams.toString()}`;
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
