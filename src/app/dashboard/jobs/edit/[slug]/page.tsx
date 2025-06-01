"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateJobValues, createJobSchema } from "@/lib/validations";
import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobTypes } from "@/lib/job-types";
import LocationInput from "@/components/LocationInput";
import { X } from "lucide-react";
import SkillsInput from "@/components/SkillsInput";
import Job from "@/lib/types/job";

export default function EditJobPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [loadingJob, setLoadingJob] = useState(true);
  const [checkedSession, setCheckedSession] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Job | undefined>({} as Job);

  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    setFocus,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!slug) return;
    setLoadingJob(true);
    fetch("/api/job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.job) {
          reset({
            ...data.job,
            salaryMin: data.job.salaryMin ?? '',
            salaryMax: data.job.salaryMax ?? '',
            percentage: data.job.percentage ?? '',
            urlToApply: data.job.urlToApply ?? '',
            status: data.job.status ?? 'draft',
            skills: Array.isArray(data.job.skills) ? data.job.skills : [],
          });
        }
        setDefaultValues(data.job);
      })
      .finally(() => setLoadingJob(false));
  }, [slug, reset]);

  async function onSubmit(values: CreateJobValues) {
    await fetch("/api/job", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, ...values }),
    });
    router.push("/dashboard");
  }

  useEffect(() => {
    if (session === undefined) return; // Wait for session to resolve
    if (!session) {
      router.push("/");
    } else {
      setCheckedSession(true);
    }
  }, [session, router]);
  if (!checkedSession) return null;
  if (loadingJob) return <div className="p-4 text-center">Loading job...</div>;

  return (
    <main className="m-auto my-10 max-w-4xl space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Edit Job</h1>
        <p className="text-muted-foreground">Update your job posting details.</p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <Form {...form}>
          <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* ...existing form fields, identical to new job form... */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <SkillsInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                      knownskills={defaultValues?.skills}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min daily rate</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value ?? 0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salaryMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max daily rate</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value ?? 0} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Percentage you expect from this job</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} max={100} placeholder="%" value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput onLocationSelected={field.onChange} ref={field.ref} />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true });
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>Description</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about this job"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "open"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="urlToApply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL to apply</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://example.com/apply"
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
