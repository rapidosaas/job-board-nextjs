import { formatMoney, relativeDate } from "@/lib/helpers";
import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import Badge from "./Badge";
import Job from "@/lib/types/job";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
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
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <div id={_id.toString()} className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{company}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
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
  );
}
