"use server";

import { connectDB } from "@/lib/config-db";
import Job from "@/lib/models/Job";
import { auth } from "@/lib/auth";
import { Types } from "mongoose";

export async function updateJobPosting(formData: FormData) {
    try {
        // Récupérer la session de l'utilisateur
        const session = await auth();

        if (!session) {
            throw new Error("Utilisateur non authentifié");
        }

        await connectDB();

        const values = Object.fromEntries(formData.entries());

        // Extract the job ID or slug from the formData
        //const jobId = values._id || values.id || values.jobId || values.slug; // adapt as needed
        const jobId = values._id; // adapt as needed
        console.log("Updating job with ID/slug:", jobId);
        if (!jobId) {
            throw new Error("Job ID/slug manquant pour la mise à jour");
        }

        // Prepare update fields
        const updateFields: Record<string, unknown> = {
            title: values.title,
            // Do not update slug on edit, keep original
            skills: Array.isArray(values.skills) ? values.skills : String(values.skills).split(","),
            type: values.type,
            company: values.company,
            location: values.location,
            salaryMin: values.salaryMin ? Number(values.salaryMin) : undefined,
            salaryMax: values.salaryMax ? Number(values.salaryMax) : undefined,
            description: values.description,
            urlToApply: values.urlToApply ? String(values.urlToApply) : undefined,
            percentage: values.percentage ? Number(values.percentage) : undefined,
            status: values.status,
            updatedAt: new Date(),
        };

        // Remove undefined fields (MongoDB $set will ignore them, but for cleanliness)
        Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

        // Find and update the job by slug (or _id if you prefer)
        const result = await Job.collection.findOneAndUpdate(
            { _id: new Types.ObjectId(typeof jobId === "string" ? jobId : String(jobId)) },
            { $set: updateFields },
            { returnDocument: 'after' }
        );

        console.log("Update result:", result);

        console.log("Job posting updated successfully");

    } catch (error) {
        console.error("Error updating job posting:", error);
        throw error; // Relancer l'erreur pour la gestion côté client
    }
}