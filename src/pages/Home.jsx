import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import { ScrollBackground } from '../components/ui/svg-follow-scroll';
import NeuralBackground from '../components/ui/flow-field-background';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const heroEl = heroWrapperRef.current;
    const contentEl = contentWrapperRef.current;
    if (!heroEl || !contentEl) return;

    const ctx = gsap.context(() => {
      // Pin the hero in place so the next section scrolls up over it
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onLeave: () => { heroEl.style.visibility = 'hidden'; },
        onEnterBack: () => { heroEl.style.visibility = 'visible'; },
      });

      // Animate top corners from rounded to flat as content reaches the top
      gsap.fromTo(
        contentEl,
        { borderRadius: '40px 40px 0 0' },
        {
          borderRadius: '0px 0px 0 0',
          ease: 'none',
          scrollTrigger: {
            trigger: contentEl,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <div
        ref={heroWrapperRef}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Hero />
      </div>
      <div
        ref={contentWrapperRef}
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'var(--bg-color, #ffffff)',
          borderRadius: '40px 40px 0 0',
          overflow: 'hidden',
        }}
      >
        <div ref={scrollRef} style={{ position: 'relative' }}>
          <NeuralBackground color="#004e89" trailOpacity={0.15} speed={0.3} particleCount={100} />
          <ScrollBackground containerRef={scrollRef} />
          <WhyUs />
          <Services />
          <CaseStudies />
        </div>
      </div>
    </main>
  );
}
