"use client";

import React, { useState, useEffect } from 'react';

interface Applicant {
  id: string;
  name: string;
  jobTitle: string; // The job they applied to
  skills: string[];
  profileLink: string; // Link to their profile
}

// Helper type for grouping
interface GroupedApplicants {
  [jobTitle: string]: Applicant[];
}

const AppliedFreelancers: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

        // Mock data - replace with actual fetch call
        const mockApplicants: Applicant[] = [
          { id: 'app1', name: 'Alice Wonderland', jobTitle: 'Software Engineer Backend', skills: ['Node.js', 'Python', 'AWS'], profileLink: '/profile/alice' },
          { id: 'app2', name: 'Bob The Builder', jobTitle: 'UX Designer', skills: ['Figma', 'Adobe XD', 'User Research'], profileLink: '/profile/bob' },
          { id: 'app3', name: 'Charlie Brown', jobTitle: 'Software Engineer Backend', skills: ['Java', 'Spring Boot', 'Kubernetes'], profileLink: '/profile/charlie' },
          { id: 'app4', name: 'Diana Prince', jobTitle: 'Product Manager', skills: ['Agile', 'Roadmapping', 'Market Analysis'], profileLink: '/profile/diana' },
          { id: 'app5', name: 'Edward Scissorhands', jobTitle: 'Software Engineer Backend', skills: ['Go', 'Microservices', 'Docker'], profileLink: '/profile/edward' },
          { id: 'app6', name: 'Fiona Gallagher', jobTitle: 'UX Designer', skills: ['Sketch', 'Prototyping', 'Usability Testing'], profileLink: '/profile/fiona' },
        ];

        // Simulate a scenario where no applicants are found
        // const mockApplicants: Applicant[] = [];

        // Simulate an error
        // throw new Error("Simulated API Error while fetching applicants");

        setApplicants(mockApplicants);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching applicants.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading applicants...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600 bg-red-50 rounded-md">Error: {error}. Failed to load applicants.</div>;
  }

  if (applicants.length === 0) {
    return <div className="p-6 text-center text-gray-600 bg-gray-50 rounded-md border border-gray-200">No freelancers have applied to your jobs yet.</div>;
  }

  // Group applicants by job title
  const groupedByJobTitle = applicants.reduce((acc, applicant) => {
    const { jobTitle } = applicant;
    if (!acc[jobTitle]) {
      acc[jobTitle] = [];
    }
    acc[jobTitle].push(applicant);
    return acc;
  }, {} as GroupedApplicants);

  return (
    <div className="p-4 md:p-6"> {/* Increased padding for the component container */}
      {/* <h3 className="text-xl font-semibold mb-4 text-gray-700">Applied Freelancers</h3> */} {/* Removed internal title */}
      {Object.entries(groupedByJobTitle).map(([jobTitle, jobApplicants]) => (
        <div key={jobTitle} className="mb-8 last:mb-0"> {/* Increased bottom margin for separation */}
          <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2"> {/* Enhanced job title heading */}
            {jobTitle}
            <span className="text-base font-normal text-gray-500 ml-2">
              ({jobApplicants.length} {jobApplicants.length === 1 ? 'applicant' : 'applicants'})
            </span>
          </h4>
          <ul className="space-y-4">
            {jobApplicants.map(applicant => (
              <li key={applicant.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-150 ease-in-out">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2">
                  <h5 className="text-lg font-semibold text-blue-700 mb-1 sm:mb-0">{applicant.name}</h5>
                  <a
                      href={applicant.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-indigo-500 text-white text-xs font-medium rounded-md hover:bg-indigo-600 transition-colors whitespace-nowrap" // Button-like styling
                  >
                      View Profile
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
                  {applicant.skills && applicant.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No skills specified.</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AppliedFreelancers;
