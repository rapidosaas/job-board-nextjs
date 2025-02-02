import { formatMoney, relativeDate } from "@/lib/helpers";
import { Banknote, Briefcase, Clock, Globe2 } from "lucide-react";
import Badge from "./Badge";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface JobListItemProps {
  job: {
    _id : number;
    title : string;
    skills : string[];
    company : string;
    type : string;
    location : string;
    salaryMin : number;
    salaryMax : number;
    createdAt : Date;
  };
}

export default function JobListItemPublished({
  job: {
    _id,
    title,
    skills,
    company,
    type,
    location,
    salaryMin,
    salaryMax,
    createdAt,
  },
}: Readonly<JobListItemProps>) {

   const deleteJob = async (jobId: number) => {
      try {
        console.log('Deleting job:', jobId);
        const response = await fetch(`/api/dashboard/jobs`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobId }),
        });

        if (response.ok) {
            console.log('Job deleted successfully');
        } else {
            console.error('Failed to delete job');
        }
      } catch (error) {
          console.error('Error deleting job:', error);
      } finally {
        redirect('/job-deleted');
      }
  };

  return (
    <div className="flex justify-between gap-3">
    <div>
      <Button variant="destructive" onClick={() => deleteJob(_id)}>Delete</Button>
    </div>
    <article className="flex flex-row gap-3 rounded-lg border p-5 w-full">
      <div id={_id.toString()} className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{company}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salaryMin)} - {formatMoney(salaryMax)}
          </p>
          <p className="flex items-center gap-1">
            {skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>Full Remote</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
    </div>
  );
}
