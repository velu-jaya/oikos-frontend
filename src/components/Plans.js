import styles from "../app/page.module.css";

export default function Plans() {
  return (
    <section id="plans" className={styles.plansSection}>
      <h2>Choose a Subscription Plan</h2>
      <div className={styles.plansGrid}>
        <div className={styles.planCard}>
          <h3>Buyer</h3>
          <p className={styles.planPrice}>Free</p>
          <ul>
            <li>Search listings</li>
            <li>Saved searches & alerts</li>
            <li>Messages & offers</li>
          </ul>
          <button className={styles.btnPrimary}>Get Started</button>
        </div>
        <div className={styles.planCard}>
          <h3>Seller</h3>
          <p className={styles.planPrice}>$29/mo</p>
          <ul>
            <li>Featured listings</li>
            <li>Listing management</li>
            <li>Offer analytics</li>
          </ul>
          <button className={styles.btnPrimaryAlt}>Choose Plan</button>
        </div>
        <div className={styles.planCard}>
          <h3>Vendor</h3>
          <p className={styles.planPrice}>$49/mo</p>
          <ul>
            <li>Business profile</li>
            <li>Leads & CRM</li>
            <li>Exclusive partnerships</li>
          </ul>
          <button className={styles.btnPrimaryAlt}>Choose Plan</button>
        </div>
      </div>
    </section>
  );
}
