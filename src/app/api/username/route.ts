import { connectDB } from "@/lib/db";
import Profile from "@/lib/models/Profile";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
    await connectDB();
    const body = await request.json();
    console.log(body);
    const profile = await Profile.findOne({ ...body });
    console.log(profile);
    return NextResponse.json({ profile }, { status: 200 });

    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  }