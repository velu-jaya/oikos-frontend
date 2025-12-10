'use client';

import { useState } from 'react';
import styles from './PropertySearchBar.module.css';
import AIAssistantModal from './AIAssistantModal';
import FilterPanel from './FilterPanel';

export default function PropertySearchBar({ onSearch, onFiltersOpen, onFilterChange, filters }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleAISearch = () => {
    setShowAIModal(true);
  };

  const handleOpenFilters = () => {
    setShowFilterPanel(true);
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by location, property type, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            type="button"
            className={styles.aiSearchButton}
            onClick={handleAISearch}
            title="Search with AI assistance"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            AI Search
          </button>

          <button
            type="button"
            className={styles.filtersButton}
            onClick={handleOpenFilters}
            title="Open filters"
          >
            <i className="fa-solid fa-sliders"></i>
            Filters
          </button>
        </form>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        onFilterChange={onFilterChange}
        filters={filters}
      />
    </>
  );
}
