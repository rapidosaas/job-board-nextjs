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
    createdAt: Date;
}
export default Job;