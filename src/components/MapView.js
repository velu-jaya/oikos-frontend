'use client';

import { useState } from 'react';
import styles from './MapView.module.css';

export default function MapView({
  properties,
  selectedProperty,
  onPropertySelect,
}) {
  const [hoveredProperty, setHoveredProperty] = useState(null);

  // Simple map marker positioning based on property index
  const getMarkerPosition = (index) => {
    const columns = 3;
    const rows = Math.ceil(properties.length / columns);
    const row = Math.floor(index / columns);
    const col = index % columns;

    const topPercent = (row * (100 / rows)) + 10;
    const leftPercent = (col * (100 / columns)) + 10;

    return {
      top: `${topPercent}%`,
      left: `${leftPercent}%`,
    };
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBackground}>
        {/* Background map gradient */}
        <svg
          className={styles.mapSvg}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8f4f8" />
              <stop offset="100%" stopColor="#d4e9f1" />
            </linearGradient>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="#c9dfe5"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="url(#mapGradient)" />
          <rect width="1000" height="1000" fill="url(#grid)" />
        </svg>

        {/* Property markers */}
        {properties.map((property, index) => {
          const position = getMarkerPosition(index);
          const isSelected = selectedProperty?.id === property.id;
          const isHovered = hoveredProperty?.id === property.id;

          return (
            <div key={property.id}>
              {/* Marker pin */}
              <div
                className={`${styles.marker} ${isSelected ? styles.selected : ''} ${
                  isHovered ? styles.hovered : ''
                }`}
                style={position}
                onClick={() => onPropertySelect(property)}
                onMouseEnter={() => setHoveredProperty(property)}
                onMouseLeave={() => setHoveredProperty(null)}
              >
                <i className="fas fa-map-marker-alt"></i>
              </div>

              {/* Price tooltip on hover */}
              {(isSelected || isHovered) && (
                <div
                  className={styles.tooltip}
                  style={{
                    top: `calc(${position.top} - 40px)`,
                    left: `calc(${position.left} - 30px)`,
                  }}
                >
                  <div className={styles.tooltipPrice}>
                    {property.price}
                  </div>
                  <div className={styles.tooltipLocation}>
                    {property.city}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendMarker} ${styles.normal}`} />
          <span>Available Property</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendMarker} ${styles.selected}`} />
          <span>Selected Property</span>
        </div>
      </div>
    </div>
  );
}
