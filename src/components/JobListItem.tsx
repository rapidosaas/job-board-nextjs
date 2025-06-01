import { formatMoney, relativeDate } from "@/lib/helpers";
import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
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
    status,
  },
}: Readonly<JobListItemProps>) {
  return (
    <article
      id={_id.toString()}
      className="relative flex flex-col gap-5 rounded-xl border border-muted bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Job Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground">{company}</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </p>
          {/* Skills */}
          {skills?.length > 0 && (
            <p className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition"
                >
                  {skill}
                </span>
              ))}
            </p>
          )}
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Job Info Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-primary" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote size={16} className="text-primary" />
          <span>
            {salaryMin && salaryMax
              ? `${formatMoney(salaryMin)} - ${formatMoney(salaryMax)}`
              : "Salary not disclosed"}
          </span>
        </div>
      </div>
      {/* Bottom Right Clock */}
      <div className="mt-4 flex justify-end">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
