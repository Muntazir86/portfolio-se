'use client';

import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/common/Navigation';
import { ScrollToTop } from '@/components/common/ScrollToTop';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <ScrollToTop />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
