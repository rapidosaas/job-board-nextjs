interface Profile {
    _id?: string;
    userId: string;
    bio: string;
    skills: string[];
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    }
export default Profile;