"use client"
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

function Home() {


  return (
    <main className="min-h-screen flex flex-col gap-12 md:gap-16 lg:gap-20">
      <Hero />
      <Problem />
      <Features />
      <Testimonials />
    </main>
  );
}

export default Home;