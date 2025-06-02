import { formatMoney, relativeDate, truncateText } from "@/lib/helpers";
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
    currency,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-primary break-words">{truncateText(title, 20)}</h2>
          <p className="text-sm text-muted-foreground break-words">{truncateText(company, 20)}</p>
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
      </div>

      {/* Job Info Blocks */}
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-primary" />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote size={16} className="text-primary" />
          <span>
            {salaryMin && salaryMax
              ? `${formatMoney(salaryMin, currency)} - ${formatMoney(salaryMax, currency)}`
              : "Salary not disclosed"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span>
            {location}
          </span>
        </div>
      </div>
      {/* Bottom Right Clock */}
      <div className="flex justify-end gap-1">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
