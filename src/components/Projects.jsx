import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const projectData = {
  category: "Full-Stack Web Application",
  title: "HomeSpot",
  subtitle: "Real Estate & Property Listing Platform",
  description:
    "A full-stack property listing application for browsing properties, viewing property details, submitting enquiries, managing user profiles, and managing property listings through an admin interface, with MySQL relational database.",
  techStack: [
    "React",
    "Python",
    "Flask",
    "MySQL",
    "JWT Authentication",
  ],
  pdfUrl: "/homespot-presentation.pdf",
  imageSrc: "/homespot.webp",
};

// Parent sequence
const sectionContentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Heading reveal
const headingWordVariants = {
  hidden: {
    y: "105%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Project card animation
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Image curtain reveal
const imageCurtainVariants = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    opacity: 0.5,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Image zoom
const imageZoomVariants = {
  hidden: {
    scale: 1.1,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Projects = ({
  isDarkMode = false,
  id = "projects",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Section reference
  const sectionRef = useRef(null);

  // Scroll direction tracking
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("down");

  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    // Detect scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = "down";
      } else if (currentScrollY < lastScrollY.current) {
        scrollDirection.current = "up";
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Observe section visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (
            scrollDirection.current === "down" ||
            shouldReduceMotion
          ) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0,
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id={id}
      className={`relative w-full pt-6 sm:pt-8 pb-16 sm:pb-20 px-5 sm:px-8 md:px-12 lg:px-20 transition-colors duration-300 overflow-hidden ${
        isDarkMode
          ? "bg-[#111111] text-white"
          : "bg-[#FFFFFF] text-[#111111]"
      }`}
    >
      <motion.div
        ref={sectionRef}
        variants={sectionContentVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate={
          shouldReduceMotion
            ? "visible"
            : isVisible
              ? "visible"
              : "hidden"
        }
        className="max-w-[1360px] mx-auto flex flex-col"
      >
        {/* Main Section Heading */}
        <div className="border-t pt-4 sm:pt-6 mb-8 sm:mb-10 border-neutral-700/30 overflow-hidden">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1] select-none">
            <span className="block overflow-hidden py-1">
              <motion.span
                variants={headingWordVariants}
                whileHover={
                  shouldReduceMotion ? {} : { x: 8 }
                }
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="inline-block cursor-default"
              >
                FEATURED
              </motion.span>
            </span>

            <span className="block overflow-hidden py-1">
              <motion.span
                variants={headingWordVariants}
                whileHover={
                  shouldReduceMotion ? {} : { x: 8 }
                }
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="inline-block cursor-default"
              >
                PROJECTS
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Project Card */}
        <motion.div
          variants={cardVariants}
          whileTap={
            shouldReduceMotion ? {} : { scale: 0.99 }
          }
          className={`group relative rounded-3xl border p-5 sm:p-8 lg:p-10 transition-all duration-300 ${
            isDarkMode
              ? "bg-[#161616] border-neutral-800 hover:border-neutral-700"
              : "bg-[#FAFAFA] border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Half */}
            <div className="lg:col-span-7 order-1 overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 relative aspect-[16/10] flex items-center justify-center">
              <motion.div
                variants={imageCurtainVariants}
                className="w-full h-full flex items-center justify-center will-change-[clip-path]"
              >
                <motion.img
                  variants={imageZoomVariants}
                  whileHover={
                    shouldReduceMotion ? {} : { scale: 1.04 }
                  }
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  src={projectData.imageSrc}
                  alt={`${projectData.title} Preview`}
                  className="w-full h-full object-cover object-top will-change-transform"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
              </motion.div>
            </div>

            {/* Content Half */}
            <div className="lg:col-span-5 order-2 flex flex-col justify-between h-full gap-6">
              <div className="space-y-3">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                  {projectData.category}
                </span>

                <motion.h3
                  whileHover={
                    shouldReduceMotion ? {} : { x: 6 }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight"
                >
                  {projectData.title}
                </motion.h3>

                <p
                  className={`text-xs sm:text-sm font-semibold tracking-wide ${
                    isDarkMode
                      ? "text-neutral-200"
                      : "text-neutral-700"
                  }`}
                >
                  {projectData.subtitle}
                </p>

                <p
                  className={`text-xs sm:text-sm font-normal leading-relaxed pt-1 ${
                    isDarkMode
                      ? "text-neutral-400"
                      : "text-neutral-600"
                  }`}
                >
                  {projectData.description}
                </p>
              </div>

              {/* Technology Stack */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Technology Stack:
                </p>

                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.map((tech, tIdx) => (
                    <motion.span
                      key={tIdx}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -3,
                              transition: {
                                duration: 0.2,
                                ease: "easeOut",
                              },
                            }
                      }
                      className={`cursor-default text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md border transition-colors select-none ${
                        isDarkMode
                          ? "bg-[#202020] text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:bg-[#282828]"
                          : "bg-[#F0F0F0] text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-[#E8E8E8]"
                      }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* View Project Button */}
              <div className="pt-2">
                <a
                  href={projectData.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 ${
                    isDarkMode
                      ? "border-neutral-700 bg-neutral-900 text-white hover:border-white"
                      : "border-neutral-300 bg-neutral-100 text-black hover:border-black"
                  }`}
                >
                  <span>VIEW PROJECT</span>

                  <motion.span
                    className="inline-block"
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { x: 3, y: -3 }
                    }
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    ↗
                  </motion.span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;