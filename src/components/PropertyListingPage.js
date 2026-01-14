'use client';

import { useState, useEffect } from 'react';
import styles from './PropertyListingPage.module.css';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import { getProperties } from '@/lib/api';
// import sampleProperties from '@/data/properties'; // Keeping for reference or fallback if needed

export default function PropertyListingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState({
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 2500000,
    beds: 0,
    baths: 0,
    location: '',
  });

  // Fetch properties from API
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProperties();
        // Transform data if necessary to match component expectations
        // Backend returns images as list property.images
        // Backend returns amenities as list property.amenities
        // Backend returns price as string "250000"

        // Add some formatting if needed or leave as is. 
        // Existing code expects price to have $ maybe? 
        // Logic: parseInt(property.price.replace(/[$,]/g, ''))
        // If "250000", replace does nothing, parseInt works.

        // Ensure image property exists (backend returns images list, frontend expects image for card?)
        // PropertyCard might expect 'image' (single string)
        const formattedData = data.map(p => ({
          ...p,
          // Helper to get valid image URL
          image: p.images && p.images.length > 0
            ? (p.images[0].startsWith('http') ? p.images[0] : `https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80`)
            : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
          price: `$${parseInt(p.price).toLocaleString()}`, // Format price to $250,000
          beds: p.bedrooms,
          baths: p.bathrooms,
          user_type: p.role // if needed
        }));

        setProperties(formattedData);
        setFilteredProperties(formattedData);
        if (formattedData.length > 0) setSelectedProperty(formattedData[0]);
      } catch (error) {
        console.error("Failed to load properties", error);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

      const matchesLocation =
        filters.location === '' || property.city.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesPrice && matchesBeds && matchesBaths && matchesLocation;
    });

    setFilteredProperties(filtered);
    if (filtered.length > 0) {
      setSelectedProperty(filtered[0]);
    }
  }, [searchTerm, filters, properties]);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className={styles.buyerPage}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.mapSection}>
            {/* Filter Bar on Top of Map */}
            <div className={styles.mapFilterBar}>
              {/* Property Type */}
              <div className={styles.filterDropdown}>
                <button
                  className={styles.filterButton}
                  onClick={() => toggleDropdown('propertyType')}
                >
                  <i className="fas fa-home"></i>
                  <span>Property Type</span>
                  <i className={`fas fa-chevron-down ${openDropdown === 'propertyType' ? styles.open : ''}`}></i>
                </button>
                {openDropdown === 'propertyType' && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('propertyType', 'all')}>All Types</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('propertyType', 'house')}>House</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('propertyType', 'apartment')}>Apartment</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('propertyType', 'condo')}>Condo</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('propertyType', 'villa')}>Villa</div>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className={styles.filterDropdown}>
                <button
                  className={styles.filterButton}
                  onClick={() => toggleDropdown('price')}
                >
                  <i className="fas fa-dollar-sign"></i>
                  <span>Price</span>
                  <i className={`fas fa-chevron-down ${openDropdown === 'price' ? styles.open : ''}`}></i>
                </button>
                {openDropdown === 'price' && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.priceInputGroup}>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 2500000)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bedrooms */}
              <div className={styles.filterDropdown}>
                <button
                  className={styles.filterButton}
                  onClick={() => toggleDropdown('beds')}
                >
                  <i className="fas fa-bed"></i>
                  <span>Beds</span>
                  <i className={`fas fa-chevron-down ${openDropdown === 'beds' ? styles.open : ''}`}></i>
                </button>
                {openDropdown === 'beds' && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 0)}>Any</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 1)}>1+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 2)}>2+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 3)}>3+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 4)}>4+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('beds', 5)}>5+</div>
                  </div>
                )}
              </div>

              {/* Bathrooms */}
              <div className={styles.filterDropdown}>
                <button
                  className={styles.filterButton}
                  onClick={() => toggleDropdown('baths')}
                >
                  <i className="fas fa-bath"></i>
                  <span>Baths</span>
                  <i className={`fas fa-chevron-down ${openDropdown === 'baths' ? styles.open : ''}`}></i>
                </button>
                {openDropdown === 'baths' && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('baths', 0)}>Any</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('baths', 1)}>1+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('baths', 2)}>2+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('baths', 3)}>3+</div>
                    <div className={styles.menuItem} onClick={() => handleFilterChange('baths', 4)}>4+</div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className={styles.filterDropdown}>
                <button
                  className={styles.filterButton}
                  onClick={() => toggleDropdown('location')}
                >
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Location</span>
                  <i className={`fas fa-chevron-down ${openDropdown === 'location' ? styles.open : ''}`}></i>
                </button>
                {openDropdown === 'location' && (
                  <div className={styles.dropdownMenu}>
                    <input
                      type="text"
                      placeholder="Search city or area..."
                      className={styles.searchInput}
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>
            </div>

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
                    className={`${styles.propertyItem} ${selectedProperty?.id === property.id
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
    </div>
  );
}
