"use client"
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import unsplash from '@/assets/kenny-eliason-hKegPH8_4Rg-unsplash.jpg'

function Hero () {
    return (
        <section
        className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center flex-1"
        >
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div
            className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
            >
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                The best way to manage online business
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block dark:text-white">
                Turn your business dreams into reality with our online business management application. Build a network, expand your reach, and achieve new heights of success.
            </p>

            <div className="mt-4 md:mt-8">
                <Link
                href="/auth/sign-in"
                className={`${buttonVariants({ variant: "default" })}`}
                >
                Get Started Today
                </Link>
            </div>
            </div>
        </div>

        <Image
            alt="Sleep while make money"
            src={unsplash}
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
        </section>
    )
}

export default Hero