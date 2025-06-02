import { jobTypes } from "@/lib/job-types";
import { JobFilterValues, jobFilterSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {   
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "./ui/select";

// Extend the schema to support company and location
const extendedJobFilterSchema = jobFilterSchema.extend({
  company: jobFilterSchema.shape.title.optional(),
  location: jobFilterSchema.shape.title.optional(),
});

function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { title, type, company, location } = extendedJobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(title && { title: title.trim() }),
    ...(type && { type }),
    ...(company && { company: company.trim() }),
    ...(location && { location: location.trim() }),
  });
  redirect(`/jobs/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues & { company?: string; location?: string };
}

export default function JobFilterSidebar({
  defaultValues,
}: Readonly<JobFilterSidebarProps>) {

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Search by job title"
              defaultValue={defaultValues.title ?? "" }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Search by company"
              defaultValue={defaultValues.company ?? ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Search by location"
              defaultValue={defaultValues.location ?? ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              defaultValue={defaultValues.type ?? ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="Any" value="Any">Any</SelectItem>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
