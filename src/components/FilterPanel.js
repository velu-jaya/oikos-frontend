'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.css';

export default function FilterPanel({ isOpen, onClose, onFilterChange, filters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (filterName, value) => {
    const updated = { ...localFilters, [filterName]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetFilters = {
      minPrice: 0,
      maxPrice: 2500000,
      beds: 0,
      baths: 0,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}></div>
      )}

      {/* Filter Panel */}
      <div className={`${styles.filterPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.panelHeader}>
          <h3 className={styles.title}>Filters</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className={styles.panelContent}>
          {/* Price Range */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Price Range</label>
            <div className={styles.priceInputs}>
              <div className={styles.inputWrapper}>
                <label>Min Price</label>
                <input
                  type="number"
                  min="0"
                  value={localFilters.minPrice}
                  onChange={(e) =>
                    handleFilterChange('minPrice', parseInt(e.target.value) || 0)
                  }
                  placeholder="$0"
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Max Price</label>
                <input
                  type="number"
                  min="0"
                  value={localFilters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange('maxPrice', parseInt(e.target.value) || 0)
                  }
                  placeholder="$2,000,000"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Bedrooms</label>
            <select
              value={localFilters.beds}
              onChange={(e) =>
                handleFilterChange('beds', parseInt(e.target.value))
              }
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Bathrooms</label>
            <select
              value={localFilters.baths}
              onChange={(e) =>
                handleFilterChange('baths', parseInt(e.target.value))
              }
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <div className={styles.panelFooter}>
          <button className={styles.resetButton} onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i>
            Reset Filters
          </button>
          <button className={styles.applyButton} onClick={onClose}>
            <i className="fa-solid fa-check"></i>
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
