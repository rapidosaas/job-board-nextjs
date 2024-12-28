"use client"
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Features from '@/components/Features';

function Home() {


  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Hero />
      <Problem />
      <Features />
    </main>
  );
}

export default Home;