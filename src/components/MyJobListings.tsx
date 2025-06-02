"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { truncateText } from "@/lib/helpers";

interface Job {
  _id: string; // Assuming _id is a string, adjust if it's an ObjectId or another type
  title: string;
  slug: string;
  status: 'open' | 'closed' | 'draft';
}

const MyJobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
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
              throw new Error(data.error ?? 'Failed to fetch jobs');
          }

          // Ensure jobs is an array, default to empty array if undefined or null
          return data.jobs ?? [];
      };
      try {
        
        const jobsData = await fetchUserJobs();
        setJobs(jobsData);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Loading jobs...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error} Failed to load jobs.</div>;
  }

  if (jobs.length === 0) {
    return <div className="p-4 text-center text-gray-500">You haven&apos;t posted any jobs yet.</div>;
  }

  // Helper function to get status badge styles
  const getStatusClasses = (status: Job['status']) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <ul className="flex flex-col gap-4">
        {jobs.map(job => (
          <li key={job._id.toString()} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-150 ease-in-out flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 relative">
            {/* Status badge at top right */}
            <span
              className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full capitalize z-10 ${getStatusClasses(job.status)}`}
            >
              {job.status}
            </span>
            <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
              <Link href={`/dashboard/jobs/${job.slug}`} className="text-lg font-semibold text-gray-800 hover:underline truncate max-w-xs md:max-w-md lg:max-w-lg">
                <span className="block md:hidden">{truncateText(job.title, 20)}</span>
                <span className="hidden md:block">{job.title}</span>
              </Link>
            </div>
            <div className="flex flex-row flex-wrap gap-2 md:gap-2 md:flex-nowrap md:items-center">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                onClick={() => window.location.href = `/dashboard/jobs/${job.slug}`}
              >
                View
              </button>
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                onClick={() => window.location.href = `/dashboard/jobs/edit/${job.slug}`}
              >
                Modify
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                onClick={async (e) => {
                  e.preventDefault();
                  if (!confirm('Are you sure you want to delete this job?')) return;
                  try {
                    const res = await fetch('/api/dashboard/jobs', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ jobId: job._id })
                    });
                    if (res.ok) {
                      setJobs(jobs.filter(j => j._id !== job._id));
                    } else {
                      const data = await res.json();
                      alert(data.error ?? 'Failed to delete job');
                    }
                  } catch {
                    alert('Error deleting job');
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyJobListings;
