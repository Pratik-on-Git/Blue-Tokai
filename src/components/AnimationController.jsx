import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const AnimationController = () => {
  useEffect(() => {
    // Set initial state for .hero to prevent flicker
    gsap.set(".hero", { opacity: 0, y: 100 });
    // Unique fade-in from bottom for .hero section on every refresh
    const randomDelay = 0.4; // 0.1s to 0.8s
    const randomDuration = 0.8; // 0.8s to 1.5s
    gsap.to(
      ".hero",
      {
        opacity: 1,
        y: 0,
        duration: randomDuration,
        delay: randomDelay,
        ease: "power3.out"
      }
    );

    // Complex logo animation on every refresh
    const logoDelay = 0.8; // 0.2s to 0.7s
    const logoDuration = 1.9; // 1.1s to 1.9s
    gsap.fromTo(
      ".hero-logo",
      {
        scale: 0.6,
        rotate: -40,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: logoDuration,
        delay: logoDelay,
        ease: "expo.out",
        clearProps: "all"
      }
    );

    // --- Scroll-based Animations ---
    gsap.fromTo(
      ".header-rows",
      { y: 60, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: ".info",
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        ease: "none"
      }
    );

    gsap.fromTo(
      ".header-info",
      { x: -80, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        scrollTrigger: {
          trigger: ".header-info",
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        ease: "power2.out"
      }
    );

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      smooth: true,
      smoothTouch: true,
      lerp: 0.08,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      endTrigger: ".whitespace",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const rotation = self.progress * 360;
        gsap.set(".revealer", { rotation });
      },
    });
    ScrollTrigger.create({
      trigger: ".pinned",
      start: "top top",
      endTrigger: ".header-info",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;
        gsap.to(".revealer-1, .revealer-2, .revealer-3, .revealer-4", {
          clipPath: clipPath,
          ease: "none",
          duration: 0
        });
      },
    });
    ScrollTrigger.create({
      trigger: ".header-info",
      start: "top top",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const left = 35 + 15 * progress;
        gsap.to(".revealer", {
          left: `${left}%`,
          ease: "none",
          duration: 0,
        });
      },
    });
    ScrollTrigger.create({
      trigger: ".whitespace",
      start: "top 50%",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 12 * self.progress;
        gsap.to(".revealer", {
          scale: scale,
          ease: "none",
          duration: 0,
        });
      },
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default AnimationController; 