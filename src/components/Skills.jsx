
import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const skillsList = [
  {
    name: "React",
    category: "UI Architecture",
    iconSrc: "/React.png",
  },
  {
    name: "Front-End",
    category: "Responsive Web Design",
    iconSrc: "/front.png",
  },
  {
    name: "Flask",
    category: "Python Web Framework",
    iconSrc: "/Flask.png",
  },
  {
    name: "Python",
    category: "Core & Scripting (Basic)",
    iconSrc: "/Python.png",
  },
  {
    name: "MySQL",
    category: "Relational Database",
    iconSrc: "/mysql.png",
  },
  {
    name: "Canva",
    category: "Visual Decks & Assets",
    iconSrc: "/canva.png",
  },
];

// Heading & Text reveal variants
const headingWordVariants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.05 },
  },
};

const deckContainerVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Skills = ({ isDarkMode = false, id = "skills" }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(3);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  const scrollAccumulator = useRef(0);
  const snapTimeout = useRef(null);

  // Viewport trigger using IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered]);

  const active = hasTriggered || shouldReduceMotion;

  // Wheel scroll interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const isTrackpad = Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) < 50;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      scrollAccumulator.current += delta;
      const threshold = isTrackpad ? 45 : 85;

      if (Math.abs(scrollAccumulator.current) >= threshold) {
        if (scrollAccumulator.current > 0) {
          setActiveIndex((prev) => Math.min(prev + 1, skillsList.length - 1));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        scrollAccumulator.current = 0;
      }

      clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 150);
    };

    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimeout.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full pt-12 sm:pt-16 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-20 transition-colors duration-300 overflow-hidden flex flex-col justify-center ${
        isDarkMode ? "bg-[#111111] text-white" : "bg-[#FFFFFF] text-[#111111]"
      }`}
    >
      <div className="max-w-[1360px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* Left Side: Animated Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center select-none text-center lg:text-left items-center lg:items-start overflow-hidden">

          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={active ? "visible" : "hidden"}
            className="flex items-center gap-2 mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#9CA3AF] font-bold">
              TECH STACK
            </p>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1]">
            <span className="block overflow-hidden py-1">
              <motion.span
                variants={headingWordVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                className="inline-block cursor-default"
              >
                SKILLS &amp;
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                variants={headingWordVariants}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block cursor-default"
              >
                TOOLSTACK
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[10px] sm:text-[11px] text-neutral-400 font-mono tracking-wider uppercase mt-3.5 hidden lg:block"
          />
        </div>

        {/* Right Side: Animated 3D Deck Entrance */}
        <motion.div
          variants={deckContainerVariants}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
          ref={containerRef}
          className="lg:col-span-7 relative w-full h-[340px] sm:h-[380px] flex items-center justify-center [perspective:1400px] overflow-visible cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, { offset, velocity }) => {
              const swipePower = offset.x + velocity.x * 0.2;
              if (swipePower < -40) {
                setActiveIndex((prev) => Math.min(prev + 1, skillsList.length - 1));
              } else if (swipePower > 40) {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
            }}
            className="relative w-full max-w-[560px] h-full flex items-center justify-center"
          >
            {skillsList.map((skill, index) => {
              const offset = index - activeIndex;
              const isCenter = offset === 0;

              const xTranslation = offset * 84;
              const rotateYAngle = offset * -22;
              const scaleValue = isCenter ? 1.06 : Math.max(0.72, 1 - Math.abs(offset) * 0.13);
              const zIndex = 30 - Math.abs(offset) * 4;
              const opacity = Math.abs(offset) > 2 ? 0.25 : 1;

              return (
                <motion.div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  animate={
                    shouldReduceMotion
                      ? { opacity: isCenter ? 1 : 0.6 }
                      : {
                          x: xTranslation,
                          scale: scaleValue,
                          rotateY: rotateYAngle,
                          zIndex: zIndex,
                          opacity: opacity,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 24,
                    mass: 0.8,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -6,
                          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        }
                  }
                  className={`absolute w-[165px] sm:w-[195px] h-[230px] sm:h-[265px] rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center justify-between select-none border transition-colors duration-300 will-change-transform ${
                    isDarkMode
                      ? "bg-[#181818] border-neutral-800 shadow-[0_22px_45px_rgba(0,0,0,0.65)]"
                      : "bg-[#FFFFFF] border-neutral-200/80 shadow-[0_18px_40px_rgba(0,0,0,0.07)]"
                  } ${isCenter ? "ring-2 ring-blue-500/35" : ""}`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Skill Icon */}
                  <div className="w-full flex-1 flex items-center justify-center p-2">
                    <img
                      src={skill.iconSrc}
                      alt={`${skill.name} icon`}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm pointer-events-none"
                      onError={(e) => {
                        e.currentTarget.src = "/favicon.svg";
                      }}
                    />
                  </div>

                  {/* Bottom Text Area */}
                  <div className="w-full flex flex-col items-center text-center mt-auto">
                    <div className="bg-[#2563EB] text-white text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-md tracking-wide uppercase shadow-sm">
                      {skill.name}
                    </div>

                    <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-tight text-neutral-400 uppercase mt-1.5 line-clamp-1">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
