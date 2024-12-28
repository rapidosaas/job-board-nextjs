"use client"
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import JobListItemPublished from "@/components/JobListItemPublished";

interface Job {
    _id: number;
    title: string;
    skills: string[];
    description: string;
    company: string;
    type: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    createdAt: Date;
}

export default function MyPublishedJobs() {
    const { data: session, status } = useSession();
    const [userJobs, setUserJobs] = useState<Job[]>([]);

    // Log the session object for debugging
    console.log('status:', status);
    console.log('Session my jobs:', session);

    useEffect(() => {
        // Fetch jobs posted by the current user
        const fetchUserJobs: () => Promise<Job[]> = async () => {
            const response = await fetch('/api/dashboard/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            // Log the entire response for debugging
            console.log('API Response:', data);

            // Check if response is successful and has jobs
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch jobs');
            }

            // Ensure jobs is an array, default to empty array if undefined
            return data.jobs || [];
        };

        fetchUserJobs()
        .then(jobs => {
            console.log('Fetched Jobs:', jobs);
            setUserJobs(jobs);
        })
        .catch(error => {
            console.error('Error fetching user jobs:', error);
            // Optionally set an error state or show a user-friendly message
            setUserJobs([]); // Prevent undefined errors
        });
    }, [session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        redirect('/');
        return;
    }

    if (!session?.user?.id) {
        console.error('No user ID found in session');
        console.error('Session Details:', JSON.stringify(session, null, 2));
        return;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My posted jobs</h1>
            </div>

            {userJobs.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have no posted job.
                </p>
            ) : (
                <div className="space-y-4">
                    {userJobs.map((job) => (
                        <div key={job._id}>
                        <JobListItemPublished
                            key={job._id} 
                            job={job}
                        />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}