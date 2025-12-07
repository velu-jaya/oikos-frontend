import styles from "../app/page.module.css";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties({ properties }) {
  return (
    <section className={styles.featuredSection}>
      <h2>Featured Properties</h2>
      <div className={styles.propsGrid}>
        {properties?.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
