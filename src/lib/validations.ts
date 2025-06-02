import { z } from "zod";
import { jobTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    company: requiredString.max(100),
    description: z.string().min(4, {message: "Description must be at least 10 characters.",}).max(250, {message: "Description can't be longer than 250 characters.",}),
    currency: z.enum(["USD", "EUR", "DZD"]).default("EUR"),
    salaryMin: z.preprocess(
      (val) => val === '' || val === undefined || val === null ? undefined : Number(val),
      z.number().int().min(0, "Min rate must be at least 0").max(999999999, "Number can't be longer than 9 digits")
    ),
    salaryMax: z.preprocess(
      (val) => val === '' || val === undefined || val === null ? undefined : Number(val),
      z.number().int().min(0, "Max rate must be at least 0").max(999999999, "Number can't be longer than 9 digits")
    ),
    location: requiredString.max(100),
    skills: z.array(z.string().max(100)).max(3, "You can't add more than 3 skills"),
    urlToApply: z.string().url("Must be a valid URL").optional(),
    percentage: z.preprocess(
      (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
      z.number().int().min(0, "Percentage must be at least 0").max(100, "Percentage can't be more than 100")
    ),
    status: z.enum(["open", "closed", "draft"]).default("draft"),
  })

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

export const singInSchema = z.object({
  email: z.string().email(),
});

export const profileSchema = z.object({
  username: requiredString.max(100),
  name: requiredString.max(100),
  bio: z.string().max(250),
  skills: z.array(z.string().max(100)).max(3),
  salary: z.number().int().min(1),
  image: z.string(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
