"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// Icons for dashboard blocks (using Heroicons or similar)
import {
  BriefcaseIcon,
  StarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  UserGroupIcon,
  GiftIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            redirect('/');
        }
    }, [session]);

    if (!session) {
        return null;
    }

    const dashboardBlocks = [
        {
            title: "My Published Jobs",
            description: "View all job offers you've posted",
            icon: <BriefcaseIcon className="w-12 h-12 text-blue-500" />,
            count: 0, // Replace with actual count
            link: "/jobs"
        },
        {
            title: "My Applications",
            description: "Track your job applications",
            icon: <DocumentTextIcon className="w-12 h-12 text-green-500" />,
            count: 0, // Replace with actual count
            link: "/applications"
        },
        {
            title: "Favorites",
            description: "Jobs you've saved",
            icon: <StarIcon className="w-12 h-12 text-yellow-500" />,
            count: 0, // Replace with actual count
            link: "/favorites"
        },
        {
            title: "Messages",
            description: "Your job-related communications",
            icon: <ChatBubbleLeftRightIcon className="w-12 h-12 text-purple-500" />,
            count: 0, // Replace with actual count
            link: "/messages"
        },
        {
            title: "Settings",
            description: "Manage your account preferences",
            icon: <CogIcon className="w-12 h-12 text-gray-500" />,
            count: 0, // Replace with actual count
            link: "/settings"
        },
        {
            title: "Affiliates",
            description: "Manage your business referrals",
            icon: <UserGroupIcon className="w-12 h-12 text-teal-500" />,
            count: 0, // Replace with actual count
            link: "/affiliates"
        },
        {
            title: "Sponsors",
            description: "Support and donations",
            icon: <GiftIcon className="w-12 h-12 text-pink-500" />,
            count: 0, // Replace with actual count
            link: "/sponsors"
        },
        {
            title: "Gamification Level",
            description: "Your mission success achievements",
            icon: <TrophyIcon className="w-12 h-12 text-orange-500" />,
            count: 0, // Replace with actual count
            link: "/gamification"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dashboardBlocks.map((block, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => window.location.href = block.link}
                    >
                        <div className="flex items-center mb-4">
                            {block.icon}
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold">{block.title}</h2>
                                <p className="text-gray-500 text-sm">{block.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-700">{block.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
