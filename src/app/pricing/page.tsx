"use client"
import { CheckCircle2, Coffee, Heart, CircleDollarSign } from "lucide-react"
import { fontHeading } from "@/lib/fonts"
import Faq from "@/components/Faq"
import { Button, buttonVariants } from "@/components/ui/button"


function Pricing() {

    const pricingPlans = [
        {
            id: "0",
            name: "Free",
            price: "€0",
            href: "/api/auth/signin",
            subtitle: "enjoy basic features",
            highlight: false,
            callToAction: "Get Started",
            features: [
                "Free access to most of the services",
            ],
        },
        {
            id: "1",
            name: "Premium",
            upcomingPrice: "€99",
            price: "€0",
            href: "/api/auth/signin",
            subtitle: "donate what you want",
            highlight: true,
            callToAction: "Get Started",
            features: [
                "Access to premium services and features",
                "Support the development",
            ],
        },
    ]

    const redirectToSignIn = () => {
        window.location.href = '/auth/sign-in';
    };

    return (
        <>
            <div className="mt-10 flex flex-col items-center gap-10 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    Our pricing plans.
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                    Start for free now!
                </p>
            </div>
            <div className="mt-10 flex flex-row flex-wrap gap-5 px-20 justify-center">
                {pricingPlans.map((p) => (
                    <div
                        className={`shadow dark:border dark:border-slate-800 rounded-3xl flex flex-col items-center p-5 min-w-[350px] ${p.highlight && "shadow-lg"}`}
                        key={p.id}
                    >
                        <div className="text-sm flex flex-row gap-2 items-center">
                            {p.name.toLowerCase() == "premium" ? (
                                <CircleDollarSign className="w-5 h-5 text-red-500 dark:text-red-700" />
                            ) : (
                                <Coffee className="w-5 h-5 text-green-500 dark:text-green-700" />
                            )}
                            {p.name}
                        </div>
                        <div className="mt-5 text-3xl font-bold tracking-tight flex flex-row gap-2">
                            {p.upcomingPrice && (
                                <span className="line-through text-muted-foreground">
                                    {p.upcomingPrice}
                                </span>
                            )}
                            <span>{p.price}</span>
                        </div>
                        {p.subtitle && (
                            <div className="mt-2 text-muted-foreground">
                                {p.subtitle}
                            </div>
                        )}
                        <div className="mt-5 w-full">
                            <Button
                                onClick={()=> redirectToSignIn()}
                                className={`${buttonVariants({
                                    variant: "default",
                                })} w-full`}
                            >
                                {p.callToAction}
                            </Button>
                        </div>
                        {p.features.length > 0 && (
                            <div className="mt-5 w-full text-sm flex flex-col gap-2">
                                {p.features.map((f, idx) => (
                                    <div key={`${p.id}-${idx}`}>
                                    <div className="flex flex-row gap-2 items-center">
                                        {f.startsWith("Support") ? (
                                            <Heart className="text-red-500 dark:text-red-700 w-5 h-5" />
                                        ) : (
                                            <CheckCircle2 className="text-green-400 dark:text-green-800 w-5 h-5" />
                                        )}
                                        <span>{f}</span>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-10 mb-10 flex flex-col items-center gap-10 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    FAQ
                </h1>
                <Faq />
            </div>
        </>
    )
}

export default Pricing