"use client"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

function Dashboard () {

        const { data: session } = useSession();

        if (!session) {
                redirect('/');
        }


    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Button>
                <Link href="/jobs/new">Post a job</Link>
            </Button>
        </div>
    )
}

export default Dashboard