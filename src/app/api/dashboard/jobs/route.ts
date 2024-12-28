import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/db";
import Job from '@/lib/models/Job';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

         // Vérification supplémentaire de l'ID utilisateur
         if (!session.user.id) {
            return NextResponse.json({ error: 'User ID not found' }, { status: 403 });
        }

        await connectDB();

       

        // Filtrer explicitement par userId
        const jobs = await Job.find({ 
            userId: session.user.id  // Utilisez directement l'ID de la session
        }).sort({ createdAt: -1 });

        return NextResponse.json({ 
            jobs: jobs.map(job => ({
                _id: job._id.toString(),
                title: job.title,
                company: job.company,
                type: job.type,
                location: job.location,
                salary: job.salary,
                createdAt: job.createdAt,
                slug: job.slug
            }))
        });

    } catch (error) {
        console.error('Error fetching user jobs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Vérification supplémentaire de l'ID utilisateur
        if (!session.user.id) {
            return NextResponse.json({ error: 'User ID not found' }, { status: 403 });
        }

        await connectDB();
        const body = await request.json();
        console.log(body);
        const job = await Job.findOneAndDelete({ _id: body.jobId });
        console.log(job);

        return NextResponse.json({ message: 'Job deleted' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting job:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}