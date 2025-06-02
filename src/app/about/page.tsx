"use client";
import Link from "next/link";

export default function PP() {
    return (
        <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
        <h1 className="font-bold">About</h1>
        <p>neoFreelance is a place to connect Talents with Opportunities.</p>
        <p>
          You can find a job, post a job, or browse profiles of freelancers.
        </p>
        <p>
        <Link href="/jobs" className="text-blue-500 hover:underline">
          Browse Jobs
        </Link>
        </p>
        <p>
        <Link href="/u" className="text-blue-500 hover:underline">
          Browse Profiles
        </Link>
        </p>
        <p>
            neoFreelance is a free and open-source project. It is not affiliated with any company or organization.
        </p>
        <p>
            If you find a bug feel free to open an issue on <Link href="https://github.com/rapidosaas" className="text-blue-500 hover:underline">GitHub</Link>.
        </p>
        <p>
            If you have any questions or suggestions, feel free to contact us at <Link href="https://www.facebook.com/CodeurGrosArgent" className="text-blue-500 hover:underline">Facebook</Link>.
        </p>  
      </main>
    )
}