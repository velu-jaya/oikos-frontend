"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { setLoginModalOpen, setRegisterModalOpen } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.brand}>
        <Image src="/logo.svg" width={120} height={100} alt="Qilo" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/buyer">Buyer</a></li>
          <li><a href="/seller">Seller</a></li>
          <li><a href="/vendor">Vendor</a></li>
          <li><a href="/agent">Agent</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <button 
          className={styles.login} 
          onClick={() => setLoginModalOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
        <button 
          className={styles.register} 
          onClick={() => setRegisterModalOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Register
        </button>
      </div>
    </header>
  );
}
