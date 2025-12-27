'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "../app/page.module.css";

export default function Hero({ children }) {
  const [displayedText, setDisplayedText] = useState('');
  const [userType, setUserType] = useState('buy');
  const [location, setLocation] = useState('');
  const fullText = 'Find Your Dream Home with AI Assistance';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderTextWithHighlight = () => {
    const parts = displayedText.split('AI Assistance');
    if (parts.length === 1) {
      return displayedText;
    }
    
    return (
      <>
        {parts[0]}
        {parts.length > 1 && <span className={styles.aiEmphasis}>AI Assistance</span>}
        {parts[1]}
      </>
    );
  };

  const stats = [
    { number: "5000+", label: "Properties Listed" },
    { number: "1200+", label: "Verified Vendors" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { location, userType });
  };

  return (
    <section className={styles.hero} style={{ backgroundImage: "url('/hero-pg-g.png')" }}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.typingText}>{renderTextWithHighlight()}</span>
          </h1>
          
          {/* Search Bar Section */}
          <div className={styles.heroSearchBox}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              {/* Buy/Sell Toggle */}
              <div className={styles.toggleGroup}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${userType === 'buy' ? styles.active : ''}`}
                  onClick={() => setUserType('buy')}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${userType === 'sell' ? styles.active : ''}`}
                  onClick={() => setUserType('sell')}
                >
                  Sell
                </button>
              </div>

              {/* Location Input */}
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.locationInput}
              />

              {/* Search Button */}
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </form>

            {/* Message */}
            <p className={styles.heroMessage}>
              Buy, sell, or find trusted vendors for your property needs. Get personalized recommendations powered by AI.
            </p>

            {/* CTAs */}
            <div className={styles.heroCTAs}>
              <Link className={styles.ctaPrimary} href="/test-verification">
                Join Now
              </Link>
              <Link className={styles.ctaSecondary} href="#plans">
                List Your Property Free
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroStats}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
