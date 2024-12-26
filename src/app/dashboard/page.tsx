"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Card from "@/components/ui/card";

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
            icon: <BriefcaseIcon />,
            count: 0,
            link: "/jobs",
            iconColor: "text-blue-500"
        },
        {
            title: "My Applications",
            description: "Track your job applications",
            icon: <DocumentTextIcon />,
            count: 0,
            link: "/applications",
            iconColor: "text-green-500"
        },
        {
            title: "Favorites",
            description: "Jobs you've saved",
            icon: <StarIcon />,
            count: 0,
            link: "/favorites",
            iconColor: "text-yellow-500"
        },
        {
            title: "Messages",
            description: "Your job-related communications",
            icon: <ChatBubbleLeftRightIcon />,
            count: 0,
            link: "/messages",
            iconColor: "text-purple-500"
        },
        {
            title: "Settings",
            description: "Manage your account preferences",
            icon: <CogIcon />,
            count: 0,
            link: "/settings",
            iconColor: "text-gray-500"
        },
        {
            title: "Affiliates",
            description: "Manage your business referrals",
            icon: <UserGroupIcon />,
            count: 0,
            link: "/affiliates",
            iconColor: "text-teal-500"
        },
        {
            title: "Sponsors",
            description: "Support and donations",
            icon: <GiftIcon />,
            count: 0,
            link: "/sponsors",
            iconColor: "text-pink-500"
        },
        {
            title: "Gamification Level",
            description: "Your mission success achievements",
            icon: <TrophyIcon />,
            count: 0,
            link: "/gamification",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dashboardBlocks.map((block, index) => (
                    <Card 
                        key={index}
                        title={block.title}
                        description={block.description}
                        icon={block.icon}
                        count={block.count}
                        link={block.link}
                        iconColor={block.iconColor}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
