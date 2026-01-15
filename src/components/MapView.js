'use client';

import dynamic from 'next/dynamic';
import styles from './MapView.module.css';

// Dynamically import the Leaflet map with SSR disabled
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Loading Map...</p>
    </div>
  ),
});

export default function MapView(props) {
  return (
    <div className={styles.mapContainer}>
      <LeafletMap {...props} />
    </div>
  );
}
