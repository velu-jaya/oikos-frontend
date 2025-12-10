import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.brandLogo}>
            <div className={styles.logoIcon}>
              <i className="fa-solid fa-building"></i>
            </div>
            <h2 className={styles.brandName}>Oikos</h2>
          </div>
          <p className={styles.brandDescription}>
            Your trusted platform for buying, selling, and finding property services.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} title="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className={styles.socialLink} title="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className={styles.socialLink} title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className={styles.socialLink} title="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.linksList}>
            <li><a href="/about">About Us</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/vendors">Vendors</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Services</h3>
          <ul className={styles.linksList}>
            <li><a href="/buy">Buy Property</a></li>
            <li><a href="/sell">Sell Property</a></li>
            <li><a href="/vendors">Find Vendors</a></li>
            <li><a href="/ai-assistance">AI Assistance</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <div className={styles.contactInfo}>
            <p><strong>Address:</strong><br />123 Real Estate Ave<br />New York, NY 10001</p>
            <p><strong>Phone:</strong> <a href="tel:+15551234567">(555) 123-4567</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@oikos.com">info@oikos.com</a></p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>&copy; {currentYear} Oikos. All rights reserved.</p>
      </div>
    </footer>
  );
}
