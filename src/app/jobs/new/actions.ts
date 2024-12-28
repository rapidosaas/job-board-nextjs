"use server";

import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createJobPosting(formData: FormData) {
    try {
        // Récupérer la session de l'utilisateur
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error("Utilisateur non authentifié");
        }

        await connectDB();

        const values = Object.fromEntries(formData.entries());

        console.log(values);

        await Job.collection.insertOne({
            title: values.title,
            slug: `${toSlug(values.title as string)}-${nanoid(10)}`,
            skills: Array.isArray(values.skills) ? values.skills : String(values.skills).split(","),
            type: values.type,
            company: values.company,
            location: values.location,
            salaryMin: values.salaryMin,
            salaryMax: values.salaryMax,
            description: values.description,
            createdAt: new Date(),
            // Ajouter l'ID de l'utilisateur
            userId: session.user.id,
        });

        console.log("Job posting created successfully");

    } catch (error) {
        console.error("Error creating job posting:", error);
        throw error; // Relancer l'erreur pour la gestion côté client
    }
}