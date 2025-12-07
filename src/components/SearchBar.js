"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../app/page.module.css";

export default function SearchBar({ overlay = false }) {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  function onSearch(e) {
    e?.preventDefault?.();
    const qs = new URLSearchParams();
    if (city) qs.set("city", city);
    if (address) qs.set("address", address);
    router.push(`/search?${qs.toString()}`);
  }

  return (
    <section id="search" className={overlay ? styles.searchOverlaySection : styles.searchSection}>
      <form className={overlay ? styles.searchOverlayCard : styles.searchCard} onSubmit={onSearch}>
        <h2>Search Properties</h2>
        <div className={styles.searchFields}>
          <input aria-label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={styles.input} />
          <input aria-label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address or ZIP" className={styles.input} />
          <select aria-label="Property Type" className={styles.input}>
            <option value="">Any type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          <input aria-label="Price Max" placeholder="Max price" className={styles.input} />
          <button type="submit" className={styles.btnPrimary}>Search</button>
        </div>
      </form>
    </section>
  );
}
