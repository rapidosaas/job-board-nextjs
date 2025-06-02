'use client'
 
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import JobFilterSidebar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validations";

function getTitle({ title, type }: JobFilterValues) {
  let titlePrefix;
  if (title) {
    titlePrefix = `${title}`;
  } else if (type) {
    titlePrefix = `${type} Remote`;
  } else {
    titlePrefix = "All Remote";
  }

  const titleSuffix = " Jobs";

  console.log(titlePrefix, titleSuffix);

  return `${titlePrefix}${titleSuffix}`;
}

export default function Jobs() {
  
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const type = searchParams.get('type');
  const page = searchParams.get('page');
  const company = searchParams.get('company');
  const location = searchParams.get('location');

  const filterValues = useMemo(() => ({
    title: title ?? undefined,
    type: type ?? undefined,
    company: company ?? undefined,
    location: location ?? undefined,
  }), [title, type, company, location]);

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...filterValues,
            page: page ? parseInt(page) : 1,
            jobsPerPage: 10,
            status: 'open', // Only fetch open jobs
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.jobs);
        setTotalJobs(data.total);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, [filterValues, page]);

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{getTitle(filterValues)}</h1>
        <p className="text-muted-foreground">Find your dream mission.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults jobs={jobs} totalJobs={totalJobs} filterValues={filterValues} page={page ? parseInt(page) : 1} />
      </section>
    </main>
  );
}