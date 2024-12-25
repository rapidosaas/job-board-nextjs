import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
    await connectDB();
    const body = await request.json();
    console.log(body);
    const job = await Job.findOne({ ...body });
    console.log(job);
    return NextResponse.json({ job }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }