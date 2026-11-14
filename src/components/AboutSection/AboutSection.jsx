
import React, { useEffect, useRef } from "react";
import defaultBgImage from "../assets/image.jpg";
import defaultMediaImage from "../assets/floating.png";
import "./AboutSection.css";

export const AboutSection = ({
  bgImageSrc = defaultBgImage,
  mediaImageSrc = defaultMediaImage,
  titleFirst = "ABOUT",
  titleRest = "ME",
  headline = "CREATING WEBSITES THAT FEEL ALIVE.",
  location = "ALWAYS LEARNING. ALWAYS CREATING. ALWAYS EVOLVING.",
  disciplineLabel = "DISCIPLINE & CRAFT",
  disciplines = "REACT • PYTHON • FLASK • MYSQL • FRONT-END DEVELOPMENT • CANVA • EXCEL",
  description = "I’m a creative designer and full-stack web developer passionate about transforming ideas into meaningful digital experiences. I combine modern frontend development, backend technologies, and visual design to build functional, intuitive web applications. I’m constantly learning, experimenting, and refining my skills • to create websites that feel as good as they work •",
  contactButtonText = "GET IN TOUCH",
  onContactClick,
  contactHref = "#contact",
  id = "about",
  className = "",
}) => {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const mediaBlurRef = useRef(null);
  const mediaOverlayRef = useRef(null);
  const titleFirstRef = useRef(null);
  const titleRestRef = useRef(null);
  const dateTagRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const mediaContentRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const DESKTOP_ASPECT = 1024 / 546;
    let isMobile = window.innerWidth < 768;
    let rafScheduled = false;

    const applyFrame = (progress) => {
      // 1. Initial Dimensions (Before scroll)
      const startW = isMobile ? Math.min(window.innerWidth - 64, 280) : 320;
      const startH = isMobile ? 360 : 420;

      // 2. Final Dimensions (Expanded State)
      // Mobile: Leaves clean 14px side margins (100vw - 28px) and uses 82dvh vertical space
      // Desktop: Retains the cinematic 16:9 widescreen layout
      let endW, endH;
      if (isMobile) {
        endW = window.innerWidth - 28;
        endH = Math.min(window.innerHeight * 0.82, 640);
      } else {
        const maxWByViewport = window.innerWidth * 0.90;
        const maxWByHeight = window.innerHeight * 0.82 * DESKTOP_ASPECT;
        endW = Math.min(maxWByViewport, maxWByHeight);
        endH = endW / DESKTOP_ASPECT;
      }

      const currentW = startW + progress * (endW - startW);
      const currentH = startH + progress * (endH - startH);

      if (mediaContainerRef.current) {
        mediaContainerRef.current.style.width = `${currentW.toFixed(1)}px`;
        mediaContainerRef.current.style.height = `${currentH.toFixed(1)}px`;
        const borderOpacity = (0.15 + (1 - progress) * 0.35).toFixed(2);
        mediaContainerRef.current.style.borderColor = `rgba(255, 255, 255, ${borderOpacity})`;
      }

      // 3. Hardware Unblur Crossfade
      if (mediaBlurRef.current) {
        if (progress < 0.60) {
          mediaBlurRef.current.style.visibility = "visible";
          mediaBlurRef.current.style.opacity = Math.max(0, 1 - progress * 1.66).toFixed(3);
        } else {
          mediaBlurRef.current.style.opacity = "0";
          mediaBlurRef.current.style.visibility = "hidden";
        }
      }

      // 4. Background and Card Dark Overlay Contrast
      if (bgImgRef.current) {
        bgImgRef.current.style.opacity = Math.max(0.12, 1 - progress * 1.15).toFixed(3);
      }
      if (mediaOverlayRef.current) {
        mediaOverlayRef.current.style.opacity = Math.max(0.45, 0.90 - progress * 0.35).toFixed(3);
      }

      // 5. Splitting Typography (ABOUT ME)
      const maxShift = isMobile ? 110 : 130;
      const textShift = (progress * maxShift).toFixed(1);
      const titleOpacity = Math.max(0, 1 - progress * 1.8).toFixed(3);

      if (titleFirstRef.current) {
        titleFirstRef.current.style.transform = `translateX(-${textShift}vw) translateZ(0)`;
        titleFirstRef.current.style.opacity = titleOpacity;
      }
      if (titleRestRef.current) {
        titleRestRef.current.style.transform = `translateX(${textShift}vw) translateZ(0)`;
        titleRestRef.current.style.opacity = titleOpacity;
      }

      // 6. Subtitles & Prompt
      const subOpacity = Math.max(0, 1 - progress * 2.5).toFixed(3);
      if (dateTagRef.current) {
        dateTagRef.current.style.transform = `translateX(-${textShift}vw) translateZ(0)`;
        dateTagRef.current.style.opacity = subOpacity;
      }
      if (scrollPromptRef.current) {
        scrollPromptRef.current.style.transform = `translateX(${textShift}vw) translateZ(0)`;
        scrollPromptRef.current.style.opacity = subOpacity;
      }

      // 7. Interior Card Content Fade-in
      if (mediaContentRef.current) {
        if (progress >= 0.68) {
          const contentProg = Math.min(1, (progress - 0.68) / 0.32);
          mediaContentRef.current.style.opacity = contentProg.toFixed(3);
          mediaContentRef.current.style.pointerEvents = contentProg > 0.6 ? "auto" : "none";
          mediaContentRef.current.style.transform = `translateY(${((1 - contentProg) * 10).toFixed(1)}px)`;
        } else {
          mediaContentRef.current.style.opacity = "0";
          mediaContentRef.current.style.pointerEvents = "none";
          mediaContentRef.current.style.transform = "translateY(12px)";
        }
      }
    };

    const renderFrame = () => {
      rafScheduled = false;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = section.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const scrolledPast = -rect.top;
      let target = 0;

      if (scrolledPast <= 0) {
        target = 0;
      } else if (scrolledPast >= scrollableDistance) {
        target = 1;
      } else {
        target = scrolledPast / scrollableDistance;
      }

      applyFrame(target);
    };

    const onScroll = () => {
      if (!rafScheduled) {
        rafScheduled = true;
        window.requestAnimationFrame(renderFrame);
      }
    };

    const onResize = () => {
      isMobile = window.innerWidth < 768;
      renderFrame();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    renderFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleContactClick = (e) => {
    if (onContactClick) {
      e.preventDefault();
      onContactClick(e);
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`about-section-root relative w-full bg-[#0D0D0D] text-white ${className}`}
      style={{ minHeight: "300vh" }}
    >
      {/* Sticky Viewport Stage (100dvh for mobile dynamic toolbar safety) */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-start z-10">

        {/* Background Ambient Layer */}
        <div
          ref={bgImgRef}
          className="absolute inset-0 z-0 h-full w-full pointer-events-none transition-opacity duration-75 ease-out"
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <img
            src={bgImageSrc}
            alt="Ambient Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Centered Interactive Stage Container */}
        <div className="w-full flex flex-col items-center justify-start relative z-10 h-full px-3.5 sm:px-6">
          <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

            {/* Expanding Media Card */}
            <div
              ref={mediaContainerRef}
              className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#07090E]"
              style={{
                width: "280px",
                height: "360px",
                maxWidth: "calc(100vw - 28px)",
                maxHeight: "84dvh",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255,255,255,0.35)",
                willChange: "width, height",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center bg-[#07090E]">

                {/* Real Foreground Artwork */}
                <img
                  src={mediaImageSrc}
                  alt="Sohil - Creative Developer & Designer"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  style={{
                    transform: "scale(1.02) translateZ(0)",
                    transformOrigin: "center",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />

                {/* Pre-blurred layer */}
                <img
                  ref={mediaBlurRef}
                  src={mediaImageSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
                  style={{
                    filter: "blur(18px)",
                    transform: "scale(1.06) translateZ(0)",
                    transformOrigin: "center",
                    opacity: 1,
                    willChange: "opacity",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />

                {/* Dark Gradient Overlay for high readability */}
                <div
                  ref={mediaOverlayRef}
                  className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/95 rounded-xl sm:rounded-2xl pointer-events-none"
                />

                {/* Perimeter Content Layout - Fully Responsive Flow */}
                <div
                  ref={mediaContentRef}
                  className="absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-7 md:p-9 pointer-events-none opacity-0 select-none overflow-y-auto"
                >
                  {/* Top Bar inside Card */}
                  <div className="flex flex-col gap-1.5 border-b border-white/15 pb-2.5 sm:pb-3.5">
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-extrabold uppercase tracking-tight text-white leading-snug">
                      {headline}
                    </h3>
                    <p className="text-[10px] xs:text-[11px] sm:text-xs font-mono tracking-wider uppercase text-neutral-300 leading-relaxed">
                      {location}
                    </p>
                  </div>

                  {/* Flexible Center Spacer */}
                  <div className="flex-1 min-h-[30px] xs:min-h-[45px] sm:min-h-[100px] pointer-events-none" />

                  {/* Bottom Bar inside Card */}
                  <div className="pt-2.5 sm:pt-4 border-t border-white/15 flex flex-col gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-300 shrink-0">
                          {disciplineLabel}
                        </span>
                        <span className="hidden sm:inline-block h-px bg-white/20 w-4 sm:w-6" />
                        <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-300 break-words">
                          {disciplines}
                        </span>
                      </div>
                      <p
                        className="text-[11px] xs:text-xs sm:text-[13px] font-normal leading-relaxed tracking-wide uppercase text-neutral-200"
                        style={{ wordSpacing: "0.50em" }}
                      >
                        {description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-row items-center gap-3 pt-2">
                      <a
                        href={contactHref}
                        onClick={handleContactClick}
                        className="pointer-events-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>{contactButtonText}</span>
                        <svg
                          className="w-3.5 h-3.5 text-black"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Subtitles (Above bottom edge on mobile) */}
            <div className="absolute z-30 bottom-10 xs:bottom-14 sm:bottom-20 flex flex-col items-center text-center pointer-events-none px-4">
              <p
                ref={dateTagRef}
                className="text-sm xs:text-base sm:text-lg md:text-xl text-neutral-300 font-semibold tracking-wider uppercase drop-shadow-lg"
              >
                BACKGROUND & VISION
              </p>
              <p
                ref={scrollPromptRef}
                className="text-neutral-400 font-medium text-[10px] xs:text-xs tracking-widest uppercase mt-1 drop-shadow-lg"
              >
                SCROLL TO EXPAND
              </p>
            </div>

            {/* Splitting Title (ABOUT ME) */}
            <div
              className="absolute inset-0 flex items-center justify-center text-center gap-1 sm:gap-4 w-full z-30 pointer-events-none flex-col px-4"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <h2
                ref={titleFirstRef}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]"
                style={{ willChange: "transform, opacity" }}
              >
                {titleFirst}
              </h2>
              <h2
                ref={titleRestRef}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]"
                style={{ willChange: "transform, opacity" }}
              >
                {titleRest}
              </h2>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
