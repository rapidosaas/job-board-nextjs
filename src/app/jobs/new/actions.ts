"use server";

import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";

export async function createJobPosting(formData: FormData) {
    try {
        await connectDB();

        const values = Object.fromEntries(formData.entries());

        console.log(values);

        await Job.collection.insertOne({
            title: values.title,
            slug: `${toSlug(values.title as string)}-${nanoid(10)}`,
            type: values.type,
            company: values.company,
            salary: values.salary,
            description: values.description,
            createdAt: new Date(),
        });

        console.log("Job posting created successfully");

    } catch (error) {
        console.error("Error creating job posting:", error);
    }
}
