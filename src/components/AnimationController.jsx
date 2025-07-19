import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const AnimationController = () => {
  useEffect(() => {
    // Set initial state for .hero, .hero-background-video, and .hero-logo
    gsap.set(".hero", { opacity: 0, y: 100, willChange: "opacity, transform" });
    gsap.set(".hero-background-video", { opacity: 0, willChange: "opacity" });
    gsap.set(".hero-logo", { willChange: "opacity, transform, filter" });

    // Fade in hero section (container)
    gsap.to(".hero", {
        opacity: 1,
        y: 0,
      duration: 1.8,
      delay: 0.2,
      ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      force3D: true,
      clearProps: "willChange"
    });

    // Fade in video background first, then logo
    gsap.to(".hero-background-video", {
      opacity: 1,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.out",
      clearProps: "willChange"
    });

    // Smoother, slower logo animation after video
    gsap.fromTo(
      ".hero-logo",
      {
        scale: 0.7,
        rotate: -30,
        opacity: 0,
        filter: "blur(8px)",
        willChange: "opacity, transform, filter"
      },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2.2,
        delay: 1.1, // after video fade
        ease: "expo.inOut",
        force3D: true,
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

    // Lenis smooth scroll (slower, more pronounced for all pages)
    const lenis = new Lenis({
      duration: 3, // Slower
      smooth: true,
      smoothTouch: true,
      lerp: 0.04, // Smoother
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