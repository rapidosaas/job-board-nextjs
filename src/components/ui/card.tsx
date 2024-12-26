// src/components/ui/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
    title: string;
    description: string;
    icon: ReactNode;
    count: number;
    link: string;
    iconColor?: string;
}

const Card: React.FC<CardProps> = ({ 
    title, 
    description, 
    icon, 
    count, 
    link,
    iconColor = 'text-blue-500'
}) => {
    return (
        <div 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => window.location.href = link}
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
            <div className="text-right">
                <span className="text-2xl font-bold text-gray-700">{count}</span>
            </div>
        </div>
    );
};

export default Card;