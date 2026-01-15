'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createProperty, updateProperty } from '@/lib/api';
import { supabase } from '@/lib/supabaseClient';
import styles from './PropertyListingModal.module.css';

export default function PropertyListingModal({ isOpen, onClose, isEditMode = false, propertyToEdit = null }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('property');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [addressValidated, setAddressValidated] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    // Property Tab
    address: '',

    // Basic Information Tab
    title: '',
    price: '',
    description: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    propertySize: '',
    homeStyle: '',
    levels: '',
    garage: '',
    garageType: '',
    garageStalls: '',
    patio: '',
    heating: '',
    cooling: '',
    exteriorCovering: '',
    roofCovering: '',
    amenities: [],
    hoaFees: '',

    // Contact Info (New)
    contactName: '',
    contactEmail: '',
    contactPhone: '',

    // Images (New)
    images: [],
    imageUrl: '',
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Gallery State
  // { id: string, type: 'url'|'file'|'existing', src: string (preview/url), file: File, isFeatured: boolean }
  const [galleryItems, setGalleryItems] = useState([]);

  // Load data for edit mode
  useEffect(() => {
    if (isOpen && isEditMode && propertyToEdit) {
      setFormData({
        address: propertyToEdit.address || '',
        title: propertyToEdit.title || '',
        price: propertyToEdit.price?.replace(/[^0-9.]/g, '') || '',
        description: propertyToEdit.description || '',
        propertyType: propertyToEdit.property_type || '', // Matches snake_case from backend
        bedrooms: propertyToEdit.bedrooms || '',
        bathrooms: propertyToEdit.bathrooms || '',
        squareFeet: propertyToEdit.area || '',
        yearBuilt: propertyToEdit.year_built || '',
        propertySize: propertyToEdit.property_size || '',
        homeStyle: propertyToEdit.style || '', // Assuming style mapped or defaulting
        levels: propertyToEdit.stories || '',
        garage: propertyToEdit.parking ? 'yes' : 'no',
        garageType: '',
        garageStalls: propertyToEdit.parking || '',
        patio: '', // Data might be missing in simple schema, default empty
        heating: '',
        cooling: '',
        exteriorCovering: '',
        roofCovering: '',
        amenities: [],
        hoaFees: '',
        contactName: propertyToEdit.contact_name || '',
        contactEmail: propertyToEdit.contact_email || '',
        contactPhone: propertyToEdit.contact_phone || '',
        images: [],
        imageUrl: propertyToEdit.images && propertyToEdit.images.length > 0 ? propertyToEdit.images[0] : ''
      });
      setSelectedAmenities(propertyToEdit.amenities || []);
      setAddressValidated(true);

      // Initialize Gallery
      if (propertyToEdit.images && propertyToEdit.images.length > 0) {
        const items = propertyToEdit.images.map((url, index) => ({
          id: `existing-${index}`,
          type: 'existing',
          url: url,
          src: url,
          file: null,
          isFeatured: index === 0 // Assume first is featured
        }));
        setGalleryItems(items);
      } else {
        setGalleryItems([]);
      }

    } else if (isOpen && !isEditMode) {
      resetForm();
      setGalleryItems([]);
    }
  }, [isOpen, isEditMode, propertyToEdit]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const amenitiesOptions = [
    'Swimming Pool',
    'Gym',
    'Parks',
    'Playground',
    'Tennis Court',
    'Basketball Court',
    'Security Gate',
    'Elevator',
    'Laundry Room',
    'Storage Room',
    'Balcony',
    'Garden'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Gallery Handlers
  const handleFeaturedSet = (id) => {
    setGalleryItems(prev => prev.map(item => ({
      ...item,
      isFeatured: item.id === id
    })));
  };

  const handleRemoveImage = (id) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newItems = newFiles.map(file => ({
        id: `new-${Date.now()}-${Math.random()}`,
        type: 'file',
        url: null,
        src: URL.createObjectURL(file), // Create preview
        file: file,
        isFeatured: false
      }));

      setGalleryItems(prev => {
        // If it's the first image ever, make it featured
        const isFirst = prev.length === 0;
        if (isFirst && newItems.length > 0) newItems[0].isFeatured = true;
        return [...prev, ...newItems];
      });
    }
  };

  const validateAddress = async () => {
    setError('');

    if (!formData.address.trim()) {
      setError('Please enter a valid address.');
      return false;
    }

    // Bypass validation for now as requested
    setAddressValidated(true);
    setActiveTab('basicInfo');
    return true;
  };

  const uploadImages = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      if (publicUrlData) {
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!addressValidated) {
      setError('Please validate your address first.');
      return;
    }

    // Basic validation
    if (!formData.bedrooms || !formData.bathrooms || !formData.squareFeet) {
      setError('Please fill in all required fields in Basic Information tab.');
      return;
    }

    setIsLoading(true);
    try {
      // Upload Images first
      let allImageUrls = [];

      // 1. Add manual URL if present
      if (formData.imageUrl) {
        allImageUrls.push(formData.imageUrl);
      }

      // 2. Upload files to Supabase and get URLs
      // First, handle all items in galleryItems

      // Separate existing URLs and new items to upload
      let finalImages = [];

      // 1. Process existing URLs in galleryItems (excluding those that are new files)
      const existingItems = galleryItems.filter(item => item.type === 'url' || (item.type === 'existing' && item.url));

      // 2. Upload new files
      const newFileItems = galleryItems.filter(item => item.type === 'file' && item.file);
      const newFiles = newFileItems.map(item => item.file);

      let uploadedUrls = [];
      if (newFiles.length > 0) {
        uploadedUrls = await uploadImages(newFiles);
      }

      // Map back uploaded URLs to their items to preserve order if possible, 
      // but simpler to just collect all valid URLs.
      // However, we need to respect the "Featured" selection.

      // Let's reconstruct the list of all URLs (existing + newly uploaded)
      // The issue is uploadImages returns a list of URLs, we need to know which one corresponds to which file to set 'featured' correctly if a new file was chosen as featured.
      // For simplicity:
      // If the featured item was a new file, we need to find its uploaded URL.
      // Refactoring uploadImages to return map or index would be better, but let's stick to simple logic:

      // Just collect all URLs first
      const allUrls = [...existingItems.map(i => i.url), ...uploadedUrls];

      // Now, which one is featured?
      const featuredIndex = galleryItems.findIndex(item => item.isFeatured);

      // If we simply concatenate, the index might shift.
      // Let's do this:
      // We will iterate through galleryItems. If it's a URL/existing, we take the URL.
      // If it's a file, we take the NEXT available URL from uploadedUrls.

      let uploadPtr = 0;
      const orderedUrls = [];
      let featuredUrl = null;

      for (const item of galleryItems) {
        if (item.type === 'url' || item.type === 'existing') {
          orderedUrls.push(item.url);
          if (item.isFeatured) featuredUrl = item.url;
        } else if (item.type === 'file') {
          if (uploadPtr < uploadedUrls.length) {
            const url = uploadedUrls[uploadPtr++];
            orderedUrls.push(url);
            if (item.isFeatured) featuredUrl = url;
          }
        }
      }

      // Ensure featured URL is first
      if (featuredUrl) {
        allImageUrls = [featuredUrl, ...orderedUrls.filter(u => u !== featuredUrl)];
      } else {
        allImageUrls = orderedUrls;
      }

      // Prepare data for backend
      const propertyData = {
        // Explicitly map all fields to match backend PropertyCreate schema
        seller_id: user?.id || 'anonymous',
        title: formData.title,
        description: formData.description,
        price: formData.price.toString(),
        property_type: formData.propertyType || 'single_family',
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        area: parseInt(formData.squareFeet) || 0,
        year_built: parseInt(formData.yearBuilt) || null,
        property_size: parseFloat(formData.propertySize) || 0,
        stories: parseInt(formData.levels) || 1,
        // Parking is string in backend, combining info or just sending count as string
        parking: formData.garage === 'yes' ? `${formData.garageStalls} spaces` : 'None',

        // Address splitting (Simple assumption for now)
        address: formData.address,
        city: 'Austin',
        state: 'TX',
        zip_code: '78701',

        amenities: selectedAmenities,

        // Contact Info
        contact_name: formData.contactName || '',
        contact_email: formData.contactEmail || '',
        contact_phone: formData.contactPhone || '',

        // Final Image List
        images: allImageUrls
      };

      if (isEditMode && propertyToEdit) {
        await updateProperty(propertyToEdit.id, propertyData);
        setSuccessMessage('Property listing updated successfully!');
      } else {
        await createProperty(propertyData);
        setSuccessMessage('Property listing created successfully!');
      }

      setTimeout(() => {
        resetForm();
        onClose();
        // Force refresh if needed, but dashboard might handle state update
        if (isEditMode) window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      address: '',
      title: '',
      price: '',
      description: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      propertySize: '',
      homeStyle: '',
      levels: '',
      garage: '',
      garageType: '',
      garageStalls: '',
      patio: '',
      heating: '',
      cooling: '',
      exteriorCovering: '',
      roofCovering: '',
      amenities: [],
      hoaFees: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      images: [],
      imageUrl: ''
    });
    setSelectedAmenities([]);
    setAddressValidated(false);
    setActiveTab('property');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className={styles.modalHeader}>
          <h2>{isEditMode ? 'Edit Property Listing' : 'Create Your Property Listing'}</h2>
          <p>{isEditMode ? 'Update your property details' : 'Fill in your property details step by step'}</p>
        </div>

        <div className={styles.tabsContainer}>
          {/* Vertical Tabs */}
          <div className={styles.tabsNav}>
            <button
              className={`${styles.tabButton} ${activeTab === 'property' ? styles.active : ''}`}
              onClick={() => setActiveTab('property')}
              disabled={!addressValidated && activeTab !== 'property'}
            >
              <span className={styles.tabIcon}>
                <i className={`fas ${addressValidated ? 'fa-check-circle' : 'fa-location-dot'}`}></i>
              </span>
              <span className={styles.tabLabel}>Property</span>
            </button>

            <button
              className={`${styles.tabButton} ${activeTab === 'basicInfo' ? styles.active : ''}`}
              onClick={() => addressValidated && setActiveTab('basicInfo')}
              disabled={!addressValidated}
            >
              <span className={styles.tabIcon}>
                <i className="fas fa-home"></i>
              </span>
              <span className={styles.tabLabel}>Basic Information</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

            {/* Property Tab */}
            {activeTab === 'property' && (
              <div className={styles.tabPane}>
                <h3>Property Address</h3>
                <p className={styles.tabDescription}>
                  Enter your property address. We'll validate it to ensure accuracy.
                </p>

                <form className={styles.formContainer} onSubmit={(e) => { e.preventDefault(); validateAddress(); }}>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full property address"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.validateButton}
                    disabled={isLoading || !formData.address.trim()}
                  >
                    {isEditMode ? 'Validate & Continue' : (isLoading ? 'Validating...' : 'Validate & Continue')}
                  </button>
                </form>
              </div>
            )}

            {/* Basic Information Tab */}
            {activeTab === 'basicInfo' && (
              <div className={styles.tabPane}>
                <h3>Basic Information</h3>
                <p className={styles.tabDescription}>
                  Tell us about your property details.
                </p>

                <form className={styles.formContainer} onSubmit={handleSubmit}>
                  {/* Row 0 - Title & Price (New Fields) */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="title">Property Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Luxury Downtown Condo"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="price">Price ($) *</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g., 500000"
                      />
                    </div>
                  </div>

                  {/* Row 0.5 - Description & Type */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="propertyType">Property Type *</label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Describe your property..."
                    />
                  </div>

                  {/* Row 1 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="bedrooms">Number of Bedrooms *</label>
                      <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="e.g., 3"
                        min="0"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="bathrooms">Number of Bathrooms *</label>
                      <input
                        type="number"
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="e.g., 2"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="squareFeet">Square Feet of Living Space *</label>
                      <input
                        type="number"
                        id="squareFeet"
                        name="squareFeet"
                        value={formData.squareFeet}
                        onChange={handleInputChange}
                        placeholder="e.g., 2500"
                        min="0"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="yearBuilt">Year Built</label>
                      <input
                        type="number"
                        id="yearBuilt"
                        name="yearBuilt"
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                        placeholder="e.g., 2020"
                        min="1800"
                        max={new Date().getFullYear()}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="propertySize">Size of Property (acres)</label>
                      <input
                        type="number"
                        id="propertySize"
                        name="propertySize"
                        value={formData.propertySize}
                        onChange={handleInputChange}
                        placeholder="e.g., 0.5"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="homeStyle">Style of Home</label>
                      <select
                        id="homeStyle"
                        name="homeStyle"
                        value={formData.homeStyle}
                        onChange={handleInputChange}
                      >
                        <option value="">Select style</option>
                        <option value="modern">Modern</option>
                        <option value="traditional">Traditional</option>
                        <option value="colonial">Colonial</option>
                        <option value="ranch">Ranch</option>
                        <option value="cape-cod">Cape Cod</option>
                        <option value="victorian">Victorian</option>
                        <option value="craftsman">Craftsman</option>
                        <option value="mediterranean">Mediterranean</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="levels">Number of Levels</label>
                      <input
                        type="number"
                        id="levels"
                        name="levels"
                        value={formData.levels}
                        onChange={handleInputChange}
                        placeholder="e.g., 2"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="garage">Garage (Yes / No)</label>
                      <select
                        id="garage"
                        name="garage"
                        value={formData.garage}
                        onChange={handleInputChange}
                      >
                        <option value="">Select option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {formData.garage === 'yes' && (
                      <div className={styles.formGroup}>
                        <label htmlFor="garageType">Garage Attached or Detached</label>
                        <select
                          id="garageType"
                          name="garageType"
                          value={formData.garageType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select type</option>
                          <option value="attached">Attached</option>
                          <option value="detached">Detached</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Row 5 */}
                  {formData.garage === 'yes' && (
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="garageStalls">Number of Garage Stalls</label>
                        <input
                          type="number"
                          id="garageStalls"
                          name="garageStalls"
                          value={formData.garageStalls}
                          onChange={handleInputChange}
                          placeholder="e.g., 2"
                          min="0"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="patio">Patio</label>
                        <select
                          id="patio"
                          name="patio"
                          value={formData.patio}
                          onChange={handleInputChange}
                        >
                          <option value="">Select option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Row 6 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="heating">Heating Source</label>
                      <select
                        id="heating"
                        name="heating"
                        value={formData.heating}
                        onChange={handleInputChange}
                      >
                        <option value="">Select heating type</option>
                        <option value="forced-air">Forced Air</option>
                        <option value="baseboard">Baseboard</option>
                        <option value="radiant">Radiant</option>
                        <option value="wood-stove">Wood Stove</option>
                        <option value="solar">Solar</option>
                        <option value="heat-pump">Heat Pump</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cooling">Cooling Source</label>
                      <select
                        id="cooling"
                        name="cooling"
                        value={formData.cooling}
                        onChange={handleInputChange}
                      >
                        <option value="">Select cooling type</option>
                        <option value="central-ac">Central AC</option>
                        <option value="window-ac">Window AC</option>
                        <option value="ceiling-fans">Ceiling Fans</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 7 */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="exteriorCovering">Exterior Covering Type</label>
                      <select
                        id="exteriorCovering"
                        name="exteriorCovering"
                        value={formData.exteriorCovering}
                        onChange={handleInputChange}
                      >
                        <option value="">Select exterior type</option>
                        <option value="brick">Brick</option>
                        <option value="vinyl-siding">Vinyl Siding</option>
                        <option value="wood-siding">Wood Siding</option>
                        <option value="stucco">Stucco</option>
                        <option value="stone">Stone</option>
                        <option value="metal">Metal</option>
                        <option value="fiber-cement">Fiber Cement</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="roofCovering">Roof Covering Type</label>
                      <select
                        id="roofCovering"
                        name="roofCovering"
                        value={formData.roofCovering}
                        onChange={handleInputChange}
                      >
                        <option value="">Select roof type</option>
                        <option value="asphalt-shingles">Asphalt Shingles</option>
                        <option value="metal">Metal</option>
                        <option value="tile">Tile</option>
                        <option value="slate">Slate</option>
                        <option value="wood-shingles">Wood Shingles</option>
                        <option value="flat-roof">Flat Roof</option>
                      </select>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className={styles.formGroup}>
                    <label>Amenities</label>
                    <p className={styles.subLabel}>Select all that apply</p>
                    <div className={styles.amenitiesGrid}>
                      {amenitiesOptions.map(amenity => (
                        <label key={amenity} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* HOA Fees */}
                  <div className={styles.formGroup}>
                    <label htmlFor="hoaFees">Homeowners Association (fees)</label>
                    <input
                      type="text"
                      id="hoaFees"
                      name="hoaFees"
                      value={formData.hoaFees}
                      onChange={handleInputChange}
                      placeholder="e.g., $250/month"
                    />
                  </div>

                  {/* Action Buttons */}
                  {/* Contact Information */}
                  <div className={styles.sectionHeader}>
                    <h3>Contact Information</h3>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Name</label>
                      <input type="text" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder="Your Name" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} placeholder="(555) 123-4567" />
                  </div>

                  {/* Image Upload */}
                  <div className={styles.sectionHeader}>
                    <h3>Images</h3>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Property Images</label>
                    <p className={styles.subLabel}>Upload images. Select the star to mark as featured.</p>

                    <div className={styles.uploadArea} onClick={() => document.getElementById('gallery-upload').click()}>
                      <div className={styles.uploadIcon}>
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <div className={styles.uploadText}>
                        Click to upload images
                      </div>
                      <input
                        id="gallery-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {galleryItems.length > 0 && (
                      <div className={styles.galleryGrid}>
                        {galleryItems.map(item => (
                          <div key={item.id} className={`${styles.galleryItem} ${item.isFeatured ? styles.featured : ''}`}>
                            <img src={item.src} alt="Property" className={styles.thumbnail} />

                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => handleRemoveImage(item.id)}
                              title="Remove image"
                            >
                              <i className="fas fa-times"></i>
                            </button>

                            {item.isFeatured ? (
                              <div className={styles.featuredBadge}>Featured</div>
                            ) : (
                              <button
                                type="button"
                                className={styles.setFeaturedButton}
                                onClick={() => handleFeaturedSet(item.id)}
                                title="Set as featured"
                              >
                                <i className="far fa-star"></i> Featured
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={() => {
                        setAddressValidated(false);
                        setActiveTab('property');
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={isLoading}
                    >
                      {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Listing' : 'Create Listing')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
