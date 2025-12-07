import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FeaturedProperties from "../components/FeaturedProperties";
import Plans from "../components/Plans";
import Footer from "../components/Footer";
import sampleProperties from "../data/properties";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Hero />
        <SearchBar />
        <FeaturedProperties properties={sampleProperties} />
        <Plans />
      </main>

      <Footer />
    </div>
  );
}
