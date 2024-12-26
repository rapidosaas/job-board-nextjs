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

function filterJobs(formData: FormData) {

  const values = Object.fromEntries(formData.entries());

  const { title, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(title && { title: title.trim() }),
    ...(type && { type }),
  });

  redirect(`/jobs/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
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
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              defaultValue={defaultValues.type ?? "" }
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
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
