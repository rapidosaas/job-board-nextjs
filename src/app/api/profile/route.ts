import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/config-db";
import Profile from '@/lib/models/Profile';
import { auth } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
    try {

        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Vérification supplémentaire de l'ID utilisateur
        if (!session.user.id) {
            return NextResponse.json({ error: 'User ID not found' }, { status: 403 });
        }

        const body = await request.json();

        await connectDB();

        // Convert userId to ObjectId
        const userId = new ObjectId(session.user.id);

        // Find the profile by userId and update it, or create a new one if it doesn't exist
        const profile = await Profile.findOneAndUpdate(
            { userId: userId },
            { ...body, userId: userId },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ profile }, { status: 200 });

    } catch (error) {
        console.error('Error saving user profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}