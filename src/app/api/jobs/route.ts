import { connect } from "@/utils/config/db";
import Job from "@/utils/models/Job";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {

    const body = await request.json();
    console.log(body);

    if (body) {
        const jobs = await Job.find({ ...body }).sort({ createdAt: -1 });
        return NextResponse.json({ jobs }, { status: 200 });
    } else {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ jobs }, { status: 200 });
    }

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }