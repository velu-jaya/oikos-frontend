'use client';

import { useState, useEffect } from 'react';
import styles from './PropertyListingPage.module.css';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import SearchBar from './SearchBar';
import PropertySearchBar from './PropertySearchBar';
import sampleProperties from '@/data/properties';

export default function PropertyListingPage() {
  const [properties, setProperties] = useState(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [selectedProperty, setSelectedProperty] = useState(sampleProperties[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2500000,
    beds: 0,
    baths: 0,
  });

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase());

      const price = parseInt(property.price.replace(/[$,]/g, ''));
      const matchesPrice =
        price >= filters.minPrice && price <= filters.maxPrice;

      const matchesBeds =
        filters.beds === 0 || property.beds >= filters.beds;

      const matchesBaths =
        filters.baths === 0 || property.baths >= filters.baths;

      return matchesSearch && matchesPrice && matchesBeds && matchesBaths;
    });

    setFilteredProperties(filtered);
    if (filtered.length > 0) {
      setSelectedProperty(filtered[0]);
    }
  }, [searchTerm, filters, properties]);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <PropertySearchBar 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
        filters={filters}
      />
      <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.mapSection}>
          <MapView
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={handlePropertySelect}
          />
        </div>

        <div className={styles.listingSection}>
          <div className={styles.listingHeader}>
            <h2>
              Results
              <span className={styles.count}>{filteredProperties.length}</span>
            </h2>
            
          </div>

          <div className={styles.propertyList}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className={`${styles.propertyItem} ${
                    selectedProperty?.id === property.id
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => handlePropertySelect(property)}
                >
                  <PropertyCard property={property} />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No properties found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
