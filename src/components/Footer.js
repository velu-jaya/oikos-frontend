import Image from "next/image";
import styles from "../app/page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <div className={styles.brandFooter}>
            <Image src="/logo.svg" width={120} height={36} alt="Oikos" />
          </div>
          <small>© {new Date().getFullYear()} Oikos. All rights reserved.</small>
        </div>
        <div className={styles.footerCenter}>
          <nav className={styles.footerLinks}>
            <a href="/terms" className={styles.footerLink}>Terms and Conditions</a>
            <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
            <a href="/cookies" className={styles.footerLink}>Cookie Policy</a>
            <a href="/contact" className={styles.footerLink}>Contact Us</a>
            <a href="/help" className={styles.footerLink}>Help Center</a>
          </nav>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.socials}>
            <a aria-label="twitter" href="#" className={styles.socialIcon}>
              <Image src="/icons/twitter.svg" width={20} height={20} alt="Twitter" />
            </a>
            <a aria-label="facebook" href="#" className={styles.socialIcon}>
              <Image src="/icons/facebook.svg" width={20} height={20} alt="Facebook" />
            </a>
            <a aria-label="instagram" href="#" className={styles.socialIcon}>
              <Image src="/icons/instagram.svg" width={20} height={20} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
