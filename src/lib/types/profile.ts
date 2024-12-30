interface Profile {
    _id?: string;
    userId: string;
    username: string;
    name: string;
    bio: string;
    skills: string[];
    salary: number;
    image?: string;
    }
export default Profile;