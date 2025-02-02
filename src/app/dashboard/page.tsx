"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Card from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Rocket } from "lucide-react"

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
            id: "published-jobs",
            title: "My Posted Jobs",
            description: "View all job offers you've posted",
            icon: <BriefcaseBusiness />,
            link: "/dashboard/my-published-jobs",
            iconColor: "text-blue-500"
        },
        {
            id: "business",
            title: "Business providers",
            description: "Apport d'affaires",
            icon: <Rocket />,
            link: "/dashboard/business-providers",
            iconColor: "text-teal-500"
        },
    ];
                        
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex justify-start mb-8">
                    <Button 
                        onClick={() => redirect('/jobs/new')} 
                        className="px-4 py-2"
                    >
                        Post a Job
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dashboardBlocks.map((block) => (
                    <Card 
                        key={block.id}
                        title={block.title}
                        description={block.description}
                        icon={block.icon}
                        link={block.link}
                        iconColor={block.iconColor}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
