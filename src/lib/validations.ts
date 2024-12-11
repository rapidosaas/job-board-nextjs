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
    description: z.string().min(4, {message: "Description must be at least 10 characters.",}),
    salary: numericRequiredString.max(9,"Number can't be longer than 9 digits",),
  })

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
