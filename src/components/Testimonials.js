"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";
import testimonials from "../data/testimonials";

export default function Testimonials() {
  const carouselRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const node = carouselRef.current;
    if (!node) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    updateScrollState();

    node.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const handleScroll = (direction) => {
    const node = carouselRef.current;
    if (!node) return;

    const scrollAmount = node.clientWidth * 0.8;
    node.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className={styles.testimonialsSection} aria-label="Customer testimonials">
      <div className={styles.testimonialsTopRow}>
        <div className={styles.testimonialsHeader}>
          <span className={styles.sectionEyebrow}>Testimonials</span>
          <h2>Trusted by residents, sellers, and vendor partners</h2>
          <p>
            Hear how Oikos removes friction from property discovery, renovation, and vendor collaboration
            across India’s most vibrant cities.
          </p>
        </div>
        <div className={styles.testimonialsNav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleScroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous testimonials"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleScroll(1)}
            disabled={!canScrollNext}
            aria-label="Next testimonials"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>

      <div className={styles.testimonialsViewport}>
        <div
          ref={carouselRef}
          className={styles.testimonialsCarousel}
          role="list"
          aria-live="polite"
        >
          {testimonials.map((item) => {
            const initials = item.name
              .split(" ")
              .map((part) => part.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <article key={item.id} className={styles.testimonialCard} role="listitem">
                <p className={styles.testimonialQuote}>“{item.quote}”</p>
                <div className={styles.testimonialRating} aria-label={`Rated ${item.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={index < item.rating ? styles.starFilled : styles.starEmpty}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <footer className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} aria-hidden="true">
                    {initials}
                  </div>
                  <div>
                    <div className={styles.testimonialName}>{item.name}</div>
                    <div className={styles.testimonialRole}>{item.role}</div>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
