import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import RoleNavigation from "../components/RoleNavigation";
import SearchBar from "../components/SearchBar";
import ClosingCreditCalculator from "../components/ClosingCreditCalculator";
import FeaturedProperties from "../components/FeaturedProperties";
import Testimonials from "../components/Testimonials";
import Plans from "../components/Plans";
import Footer from "../components/Footer";
import sampleProperties from "../data/properties";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Hero />
        <RoleNavigation />
        <SearchBar />
        <ClosingCreditCalculator />
        <FeaturedProperties properties={sampleProperties} />
        <Testimonials />
        <Plans />
      </main>

      <Footer />
    </div>
  );
}
