"use client";
import Link from "next/link";

export default function PP() {
    return (
        <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
        <h1 className="font-bold">About</h1>
        <p>
            neoFreelance is a place to connect Talents with Opportunities.
        </p>
        <p>
            You can <Link href="/jobs" className="text-blue-500 hover:underline">find jobs</Link> or <Link href="/u" className="text-blue-500 hover:underline">browse profiles</Link>.
        </p>
        <p>
            neoFreelance is a free and open-source project. It is not affiliated with any company or organization.
        </p>
        <p>
            If you find a bug, please open an issue on <Link href="https://github.com/rapidosaas" className="text-blue-500 hover:underline">GitHub</Link>.
        </p>
        <p>
            If you have any questions or suggestions, feel free to contact us at <Link href="https://www.facebook.com/CodeurGrosArgent" className="text-blue-500 hover:underline">Facebook</Link>.
        </p>
        <p>
            Thank you for using neoFreelance!
        </p>
      </main>
    )
}