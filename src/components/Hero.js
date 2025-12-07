import styles from "../app/page.module.css";

export default function Hero({ children }) {
  const stats = [
    { number: "5000+", label: "Properties Listed" },
    { number: "1200+", label: "Verified Vendors" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section className={styles.hero} style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find Your Dream Home with <span className={styles.aiEmphasis}>AI Assistance</span></h1>
          <p className={styles.heroSubtitle}>Buy, Sell, Or Find trusted vendors for your Property needs. Get personalized recommendations powered by AI</p>
          <div className={styles.heroCTAs}>
            <a className={styles.ctaPrimary} href="#search">Search Properties</a>
            <a className={styles.ctaOutlined} href="#plans">Explore Plans</a>
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
