import Link from "next/link";
import styles from "../app/page.module.css";

export default function PropertyCard({ property }) {
  return (
    <article className={styles.propCard}>
      <div className={styles.propImage}>
        <img src={property.image} alt={property.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
        <div className={styles.priceBadge}>{property.price}</div>
        {property.featured && <div className={styles.featureTag}>FEATURED</div>}
      </div>
      <div className={styles.propBody}>
        <h3>{property.title}</h3>
        <p className={styles.propCity}>{property.city}</p>
        <div className={styles.propMeta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}><i className="fas fa-bed"></i></span>
            {property.beds} beds
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}><i className="fas fa-bath"></i></span>
            {property.baths} baths
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}><i className="fas fa-ruler"></i></span>
            {property.area} sqft
          </span>
        </div>
        <div className={styles.propFooter}>
          <div className={styles.price}>{property.price}</div>
          <Link className={styles.btnLink} href={`/property/${property.id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
