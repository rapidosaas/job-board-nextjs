import { formatMoney, relativeDate } from "@/lib/utils";
import { Banknote, Briefcase, Clock, Globe2 } from "lucide-react";
import Badge from "./Badge";

interface JobListItemProps {
  job: {
    _id : number;
    title : string;
    company : string;
    type : string;
    location : string;
    salary : number;
    createdAt : Date;
  };
}

export default function JobListItem({
  job: {
    _id,
    title,
    company,
    type,
    location,
    salary,
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
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
