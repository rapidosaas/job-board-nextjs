import { z } from "zod";
import { jobTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    company: requiredString.max(100),
    description: z.string().min(4, {message: "Description must be at least 10 characters.",}).max(250, {message: "Description can't be longer than 250 characters.",}),
    salaryMin: numericRequiredString.max(9,"Number can't be longer than 9 digits",),
    salaryMax: numericRequiredString.max(9,"Number can't be longer than 9 digits",),
    location: requiredString.max(100),
    skills: z.array(z.string().max(100)).max(3, "You can't add more than 3 skills"),
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
