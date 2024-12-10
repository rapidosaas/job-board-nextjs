import JobFilterSidebar from "@/components/JobFilterSideBar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "../lib/validations";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    page?: string;
  };
}

function getTitle({ q, type, location }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
    })} | Your Job Board`,
  };
}

export default async function Home({
  searchParams: { q, type, location, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1>{getTitle(filterValues)}</h1>
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