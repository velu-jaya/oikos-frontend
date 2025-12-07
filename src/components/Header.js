"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../app/page.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.brand}>
        <Image src="/logo.svg" width={120} height={100} alt="Oikos" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#">Buyer</a></li>
          <li><a href="#">Seller</a></li>
          <li><a href="#">Vendor</a></li>
          <li><a href="#">Agent</a></li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <a className={styles.login} href="#">Login</a>
        <a className={styles.register} href="#">Register</a>
      </div>
    </header>
  );
}
