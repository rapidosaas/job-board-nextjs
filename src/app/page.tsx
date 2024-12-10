import JobFilterSidebar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "../lib/validations";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    page?: string;
  };
}

function getTitle({ q, type }: JobFilterValues) {
  const titlePrefix = q
    ? `${q}`
    : type
      ? `${type} developer`
      : "All developer";

  const titleSuffix = " jobs";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
    })} | Your Job Board`,
  };
}

export default async function Home({
  searchParams: { q, type, page },
}: PageProps) {
  
  const filterValues: JobFilterValues = {
    q,
    type,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{getTitle(filterValues)}</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
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