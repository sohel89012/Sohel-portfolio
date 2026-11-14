import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const typographyRef = useRef(null);
  const frontWaveRef = useRef(null);
  const backWaveRef = useRef(null);
  const counterRef = useRef(null);
  const percentTextRef = useRef(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
            if (onComplete) onComplete();
          },
        });
        return;
      }

      // Horizontal wave lehrana
      gsap.to(frontWaveRef.current, {
        x: -1,
        duration: 2.2,
        repeat: -1,
        ease: "none",
      });

      gsap.to(backWaveRef.current, {
        x: 1,
        duration: 2.8,
        repeat: -1,
        ease: "none",
      });

      const progressTracker = { value: 0 };

      // Master Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          document.body.style.height = originalHeight;
          if (onComplete) onComplete();
        },
      });

      // 0% to 100% counter & water fill
      tl.to(
        progressTracker,
        {
          value: 100,
          duration: 2.4,
          ease: "none",
          onUpdate: () => {
            const currentVal = Math.floor(progressTracker.value);
            if (percentTextRef.current) {
              percentTextRef.current.textContent = `${currentVal}%`;
            }

            const progress = progressTracker.value / 100;
            const currentY = 1.05 - progress * 1.05;

            if (frontWaveRef.current) {
              gsap.set(frontWaveRef.current, { y: currentY });
            }
            if (backWaveRef.current) {
              gsap.set(backWaveRef.current, { y: currentY + 0.02 });
            }
          },
        },
        0
      );

      // Brief rest at 100%
      tl.to({}, { duration: 0.1 });

      // Counter fade out
      tl.to(
        counterRef.current,
        {
          opacity: 0,
          y: -8,
          duration: 0.25,
          ease: "power2.out",
        }
      );

      // Clean Zoom-through Exit (SOHIL scale up & container fade together)
      tl.to(
        typographyRef.current,
        {
          scale: 3.5,
          opacity: 0,
          duration: 0.65,
          ease: "power3.inOut",
        },
        "-=0.1"
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <clipPath id="front-wave-clip" clipPathUnits="objectBoundingBox">
            <path
              ref={frontWaveRef}
              d="M 0 0 C 0.25 0.12, 0.35 -0.12, 0.6 0 C 0.85 0.12, 0.95 -0.12, 1.2 0 C 1.45 0.12, 1.55 -0.12, 1.8 0 C 2.05 0.12, 2.15 -0.12, 2.4 0 L 2.4 2 L 0 2 Z"
            />
          </clipPath>
          <clipPath id="back-wave-clip" clipPathUnits="objectBoundingBox">
            <path
              ref={backWaveRef}
              d="M -1 0 C -0.75 -0.12, -0.65 0.12, -0.4 0 C -0.15 -0.12, -0.05 0.12, 0.2 0 C 0.45 -0.12, 0.55 0.12, 0.8 0 C 1.05 -0.12, 1.15 0.12, 1.4 0 L 1.4 2 L -1 2 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div ref={typographyRef} className={styles.typographyWrapper}>
        <div className={styles.textFrame}>
          <span className={styles.baseText}>SOHIL</span>
          <span className={styles.backWaveText} aria-hidden="true">
            SOHIL
          </span>
          <span className={styles.frontWaveText} aria-hidden="true">
            SOHIL
          </span>
        </div>

        <div ref={counterRef} className={styles.counterWrapper}>
          <span>loading...&nbsp;</span>
          <span ref={percentTextRef} className={styles.counterPercent}>
            0%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;