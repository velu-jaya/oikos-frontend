"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { setLoginModalOpen, setRegisterModalOpen, user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.brand}>
        <a href="/"><img src="/qilo.svg" width="100" height="50" alt="Qilo" /></a>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/buyer">For Buyer</a></li>
          <li><a href="/seller">For Seller</a></li>
          <li><a href="/agent">For Real Estate Expert</a></li>
          <li><a href="/vendor">For Vendor</a></li>
        </ul>
      </nav>
      <div className={styles.actions}>
        {user ? (
          <>
            <button
              className={styles.login}
              onClick={() => router.push('/dashboard')}
            >
              Dashboard
            </button>
            <button
              className={styles.register}
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.login}
              onClick={() => setLoginModalOpen(true)}
            >
              Login
            </button>
            <button
              className={styles.register}
              onClick={() => setRegisterModalOpen(true)}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
