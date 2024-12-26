'use client'
 
import { useSearchParams } from 'next/navigation'
import JobFilterSidebar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validations";

function getTitle({ title, type }: JobFilterValues) {
  let titlePrefix;
  if (title) {
    titlePrefix = `${title}`;
  } else if (type) {
    titlePrefix = `${type} freelance`;
  } else {
    titlePrefix = "All freelance";
  }

  const titleSuffix = " jobs";

  return `${titlePrefix}${titleSuffix}`;
}

export default function Home() {
  
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const type = searchParams.get('type');
  const page = searchParams.get('page');

  const filterValues = {
    title: title ?? undefined,
    type: type ?? undefined,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{getTitle(filterValues)}</h1>
        <p className="text-muted-foreground">Find your dream mission.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}