'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.css';

export default function FilterPanel({ isOpen, onClose, onFilterChange, filters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    'All Types',
    'Apartment',
    'House',
    'Villa',
    'Condo',
    'Townhouse',
    'Land',
    'Commercial'
  ];

  const locations = [
    'All Locations',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio'
  ];

  const handleFilterChange = (filterName, value) => {
    const updated = { ...localFilters, [filterName]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handlePriceChange = (e) => {
    const updated = { ...localFilters, maxPrice: parseInt(e.target.value) };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetFilters = {
      propertyType: 'All Types',
      location: 'All Locations',
      minPrice: 0,
      maxPrice: 2000000,
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
          {/* Property Type */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Property Type</label>
            <select
              value={localFilters.propertyType || 'All Types'}
              onChange={(e) =>
                handleFilterChange('propertyType', e.target.value)
              }
              className={styles.select}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range with Slider */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>
              Price Range: ${(localFilters.minPrice || 0).toLocaleString()} - ${(localFilters.maxPrice || 2000000).toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={localFilters.maxPrice || 2000000}
              onChange={handlePriceChange}
              className={styles.slider}
            />
            <div className={styles.sliderTrack}></div>
          </div>

          {/* Bedrooms */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Bedrooms</label>
            <select
              value={localFilters.beds || 0}
              onChange={(e) =>
                handleFilterChange('beds', parseInt(e.target.value))
              }
              className={styles.select}
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
              value={localFilters.baths || 0}
              onChange={(e) =>
                handleFilterChange('baths', parseInt(e.target.value))
              }
              className={styles.select}
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Location */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Location</label>
            <select
              value={localFilters.location || 'All Locations'}
              onChange={(e) =>
                handleFilterChange('location', e.target.value)
              }
              className={styles.select}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.panelFooter}>
          <button className={styles.applyButton} onClick={onClose}>
            Apply Filters
          </button>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset All
          </button>
        </div>
      </div>
    </>
  );
}
