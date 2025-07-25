import { useEffect } from 'react';

export default function useGsapContactPage() {
  useEffect(() => {
    let gsap, ScrollTrigger;
    let ctx;
    let mounted = true;
    (async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.default;
      ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Animate the main container
      gsap.from('.contact-main', {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Animate left panel
      gsap.from('.contact-left', {
        x: -120,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.2
      });

      // Animate right panel
      gsap.from('.contact-right', {
        x: 120,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.3
      });

      // Animate form fields stagger
      gsap.from('.form-group', {
        y: 40,
        opacity: 0,
        stagger: 0.13,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.5
      });

      // Animate contact image grayscale to color on scroll
      gsap.fromTo('.contact-img',
        { filter: 'grayscale(1)', scale: 0.95 },
        {
          filter: 'grayscale(0)',
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: '.contact-img',
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );

      // Animate title with bounce
      gsap.from('.contact-title', {
        y: -60,
        opacity: 0,
        duration: 1.1,
        ease: 'bounce.out',
        delay: 0.1
      });

      // Animate send button pulse
      gsap.fromTo('.form-submit',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.7)',
          delay: 1.2
        }
      );
    })();
    return () => {
      mounted = false;
      if (ctx) ctx.revert && ctx.revert();
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
