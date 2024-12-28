// src/components/ui/Card.tsx
import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
    iconColor?: string;
}

const Card: React.FC<CardProps> = ({ 
    title, 
    description, 
    icon, 
    link,
    iconColor = 'text-blue-500'
}) => {

    const router = useRouter();
    return (
        <div 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[200px]"
            onClick={() => router.push(link)}
        >
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${iconColor}`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-gray-500 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;