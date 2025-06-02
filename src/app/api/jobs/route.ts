import { connectDB } from "@/lib/config-db";
import Job from "@/lib/models/Job";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log(body);

    const { page = 1, jobsPerPage = 10, ...filters } = body;

    // Calculer les valeurs pour la pagination
    const skip = (page - 1) * jobsPerPage;

    // Build MongoDB filter for flexible search
    const mongoFilters: Record<string, unknown> = { ...filters };
    if (filters.title) {
      mongoFilters.title = { $regex: filters.title, $options: 'i' };
    }
    if (filters.company) {
      mongoFilters.company = { $regex: filters.company, $options: 'i' };
    }
    if (filters.location) {
      mongoFilters.location = { $regex: filters.location, $options: 'i' };
    }
    // Add more fields as needed for partial/case-insensitive search

    // Remove undefined or empty string filters so they don't block other filters
    Object.keys(mongoFilters).forEach((key) => {
      if (
        mongoFilters[key] === undefined ||
        mongoFilters[key] === null ||
        mongoFilters[key] === ''
      ) {
        delete mongoFilters[key];
      }
    });

    // If type is empty string or 'Any', remove it from filters to allow any job type
    if (mongoFilters.type === '' || mongoFilters.type === 'Any') {
      delete mongoFilters.type;
    }

    // Rechercher les jobs avec pagination
    const jobs = await Job.find(mongoFilters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(jobsPerPage);

    console.log(jobs);

    // Obtenir le nombre total de jobs correspondant aux filtres
    const totalJobs = await Job.countDocuments(mongoFilters);

    // Retourner les résultats avec les métadonnées de pagination
    return NextResponse.json(
      { jobs, total: totalJobs },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}