"use client";
import Link from "next/link";
import { Globe, Briefcase, Users, Landmark, MessageSquare } from 'lucide-react';

export default function PP() {
    return (
        <main className="m-auto my-10 max-w-5xl space-y-8 px-3 text-center">
            <h1 className="text-4xl font-bold flex items-center justify-center">
                <Users className="w-10 h-10 mr-3 text-blue-500" /> About neoFreelance
            </h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <Users className="w-6 h-6 mr-2 text-gray-700" /> What is neoFreelance?
                </h2>
                <p className="mb-2">
                    neoFreelance is a place to connect Talents with Opportunities.
                    You can <Link href="/jobs" className="text-blue-500 hover:underline">find jobs</Link> or <Link href="/u" className="text-blue-500 hover:underline">browse profiles</Link>.
                </p>
                <p>
                    neoFreelance is a free and open-source project. It is not affiliated with any company or organization.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <Landmark className="w-6 h-6 mr-2 text-gray-700" /> Our Business Model
                </h2>
                <p className="mb-2">
                    The business model is based on donations and sponsorships.
                </p>
                <p className="mb-2">
                    The business you can make with neoFreelance is yours. We do not take any commission on your earnings (maybe later, no one knows).
                </p>
                <p className="mb-2">
                    When posting a job, you just have to provide a percentage you take on the daily rate of freelances.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 mr-2 text-gray-700" /> Key Features
                </h2>
                    <p>You can post jobs in USD, EUR, and DZD.</p>
                    <p>Add up to three main skills per job (but you can add as many skills as you want in the description for future management).</p>
                    <p>Profile daily rates are in EUR for consistency across all freelances.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <Globe className="w-6 h-6 mr-2 text-gray-700" /> How to be contacted by the users
                </h2>
                    <p>If you are a business provider, use an apply link to Google Form, Tally or TypeForm.</p>
                    <p>If you are a freelance provide a link to your portfolio, LinkedIn or GitHub.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-gray-700" /> Connect With Us
                </h2>
                <p>
                  If you find a bug, please open an issue on <Link href="https://github.com/rapidosaas" className="text-blue-500 hover:underline ml-1">GitHub</Link>.
                </p>
                <p>
                    If you have any questions or suggestions, feel free to contact us on <Link href="https://www.facebook.com/CodeurGrosArgent" className="text-blue-500 hover:underline ml-1">Facebook</Link>.
                </p>
            </section>

            <p className="mt-6">
                Thank you for using neoFreelance!
            </p>
        </main>
    )
}