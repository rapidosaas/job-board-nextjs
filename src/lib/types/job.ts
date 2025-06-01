interface Job {
    _id: number;
    slug: string;
    title: string;
    skills: string[];
    description: string;
    company: string;
    type: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    status: 'open' | 'closed' | 'draft';
    percentage: number;
    urlToApply: string;
    createdAt: Date;
    userId: string; // Assuming userId is a string, adjust if it's an ObjectId
}
export default Job;