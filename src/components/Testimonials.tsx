"use client"

const testimonials = [
  {
    quote: "Finding skilled remote talent was a challenge until I found neoFreelance. The platform is intuitive and helped me connect with the perfect freelancer for my project quickly!",
    name: "Alex P.",
    role: "Startup Founder",
  },
  {
    quote: "As a freelance designer, neoFreelance has been a game-changer. I've found incredible remote opportunities and built lasting relationships with clients. Highly recommended!",
    name: "Maria L.",
    role: "Freelance UX/UI Designer",
  },
  {
    quote: "The focus on auto-entrepreneurs is what drew me to neoFreelance. It's refreshing to see a platform that understands the specific needs of independent professionals in the remote space.",
    name: "Jean D.",
    role: "Remote Software Developer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Loved by Businesses & Freelancers
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Hear what our users have to say about their experience on neoFreelance.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex-1">
                <p className="text-lg text-gray-700">{testimonial.quote}</p>
              </div>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
