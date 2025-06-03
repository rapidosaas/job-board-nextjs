"use client"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"

function Hero () {
    return (
    <section className="relative isolate px-6 pt-8 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              We are launching our MVP soon.{' '}
              <Link href="https://www.youtube.com/watch?v=BH8bSjEMLok" className="font-semibold text-blue-600">
                Stay tuned! <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Find Your Next 
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-600">
                Full Remote
              </span>{' '}
              Opportunity or Top Freelance Talent
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
              neoFreelance connects businesses with skilled freelancers and helps professionals find fulfilling remote jobs. We specialize in opportunities for auto-entrepreneurs, offering a seamless platform for posting missions and discovering talent worldwide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/u"
                className={`${buttonVariants({ variant: "default" })}`}
              >
                Find Talent
              </Link>
              <Link
                href="/jobs"
                className={`${buttonVariants({ variant: "outline" })}`}
              >
                Find Opportunity
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>
    
    )
}

export default Hero