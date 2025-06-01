"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import MyJobListings from '@/components/MyJobListings';

function Dashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
        if (!session) {
            redirect('/');
        }
    }, [session, status]);

    if (status === "loading") {
        return null; // Or a loading spinner
    }
    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Post a New Job Section */}
            <div className="mb-8 p-6 border rounded-lg shadow-md bg-slate-50">
                <h2 className="text-2xl font-semibold mb-3">Post a New Job</h2>
                <p className="mb-5 text-gray-600">Click here to create a new job listing and find the perfect candidate.</p>
                <Button
                    onClick={() => redirect('/jobs/new')}
                    className="px-6 py-3 text-base" // Increased padding and text size for button
                >
                    Post a Job
                </Button>
            </div>

            {/* My Job Listings Section */}
            <div className="mb-8 border rounded-lg shadow-md bg-slate-50">
                {/* The h2 and MyJobListings component will provide their own padding */}
                <h2 className="text-2xl font-semibold mb-3 p-6 pb-0">My Job Listings</h2>
                <MyJobListings />
            </div>
        </div>
    )
}

export default Dashboard;
