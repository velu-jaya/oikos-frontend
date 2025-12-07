import Image from "next/image";
import styles from "../app/page.module.css";

export default function PropertyCard({ property }) {
  return (
    <article className={styles.propCard}>
      <div className={styles.propImage}>
        <Image src={property.image} alt={property.title} width={360} height={220} />
           <div className={styles.priceBadge}>{property.price}</div>
           {property.featured && <div className={styles.featureTag}>FEATURED</div>}
      </div>
      <div className={styles.propBody}>
        <h3>{property.title}</h3>
        <p className={styles.propCity}>{property.city}</p>
        <div className={styles.propMeta}>
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          <span>{property.area} sqft</span>
        </div>
        <div className={styles.propFooter}>
          <div className={styles.price}>{property.price}</div>
          <a className={styles.btnLink} href="#">View Details</a>
        </div>
      </div>
    </article>
  );
}
