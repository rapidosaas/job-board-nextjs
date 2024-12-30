interface Profile {
    _id?: string;
    userId: string;
    bio: string;
    skills: string[];
    salary: number;
    image?: string;
    }
export default Profile;