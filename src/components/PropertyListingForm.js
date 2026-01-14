'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createProperty } from '@/lib/api';
import PropertyListingFormStyles from './PropertyListingForm.module.css';

export default function PropertyListingForm({ onClose }) {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    title: '',
    description: '',
    price: '',
    propertyType: '',

    // Step 2: Property Details
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    lotSize: '',
    stories: '',
    parking: '',

    // Step 3: Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    latitude: '',
    longitude: '',

    // Step 4: Images
    images: [],

    // Step 5: Features & Amenities
    features: [],
    amenities: [],

    // Step 6: Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactMethod: 'email',

    // Step 7: Additional Information
    listingType: 'sale', // sale, rent, lease
    availabilityDate: '',
    petFriendly: false,
    smokingAllowed: false,
    furnished: false
  });

  const [errors, setErrors] = useState({});

  const totalSteps = 7;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.price.trim()) newErrors.price = 'Price is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        break;
      case 2:
        if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
        if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
        if (!formData.area) newErrors.area = 'Area is required';
        break;
      case 3:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
      case 6:
        if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
        if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        // Prepare data for backend
        const propertyData = {
          ...formData,
          seller_id: user?.id || 'anonymous', // Should come from auth context
          images: formData.images.map(file => file.name), // Sending filenames for now
          // Ensure numeric values are numbers
          price: formData.price.toString(),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseFloat(formData.bathrooms),
          area: parseInt(formData.area),
          year_built: parseInt(formData.yearBuilt) || null,
          property_size: parseFloat(formData.propertySize) || null,
          stories: parseInt(formData.stories) || null,
        };

        await createProperty(propertyData);
        alert('Property listing submitted successfully!');
        if (onClose) onClose();
        router.refresh(); // Refresh to show new data if on listing page
      } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit listing. Please try again.');
      }
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className={PropertyListingFormStyles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
          <div
            key={step}
            className={`${PropertyListingFormStyles.step} ${step === currentStep ? PropertyListingFormStyles.active :
              step < currentStep ? PropertyListingFormStyles.completed : ''
              }`}
          >
            {step}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Basic Information</h2>
            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="title">Property Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Beautiful 3BR Home in Downtown"
                className={errors.title ? PropertyListingFormStyles.error : ''}
              />
              {errors.title && <span className={PropertyListingFormStyles.errorText}>{errors.title}</span>}
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="propertyType">Property Type *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className={errors.propertyType ? PropertyListingFormStyles.error : ''}
              >
                <option value="">Select property type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
              {errors.propertyType && <span className={PropertyListingFormStyles.errorText}>{errors.propertyType}</span>}
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 250000"
                className={errors.price ? PropertyListingFormStyles.error : ''}
              />
              {errors.price && <span className={PropertyListingFormStyles.errorText}>{errors.price}</span>}
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="listingType">Listing Type</label>
              <select
                id="listingType"
                name="listingType"
                value={formData.listingType}
                onChange={handleInputChange}
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="lease">For Lease</option>
              </select>
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property in detail..."
                rows="6"
                className={errors.description ? PropertyListingFormStyles.error : ''}
              />
              {errors.description && <span className={PropertyListingFormStyles.errorText}>{errors.description}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Property Details</h2>
            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="bedrooms">Bedrooms *</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className={errors.bedrooms ? PropertyListingFormStyles.error : ''}
                />
                {errors.bedrooms && <span className={PropertyListingFormStyles.errorText}>{errors.bedrooms}</span>}
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="bathrooms">Bathrooms *</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  className={errors.bathrooms ? PropertyListingFormStyles.error : ''}
                />
                {errors.bathrooms && <span className={PropertyListingFormStyles.errorText}>{errors.bathrooms}</span>}
              </div>
            </div>

            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="area">Area (sq ft) *</label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000"
                  className={errors.area ? PropertyListingFormStyles.error : ''}
                />
                {errors.area && <span className={PropertyListingFormStyles.errorText}>{errors.area}</span>}
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
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
            </div>

            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="lotSize">Lot Size (sq ft)</label>
                <input
                  type="number"
                  id="lotSize"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 5000"
                />
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="stories">Stories</label>
                <input
                  type="number"
                  id="stories"
                  name="stories"
                  value={formData.stories}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="parking">Parking</label>
              <select
                id="parking"
                name="parking"
                value={formData.parking}
                onChange={handleInputChange}
              >
                <option value="">Select parking type</option>
                <option value="garage">Garage</option>
                <option value="driveway">Driveway</option>
                <option value="carport">Carport</option>
                <option value="street">Street Parking</option>
                <option value="none">No Parking</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Location</h2>
            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., 123 Main Street"
                className={errors.address ? PropertyListingFormStyles.error : ''}
              />
              {errors.address && <span className={PropertyListingFormStyles.errorText}>{errors.address}</span>}
            </div>

            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., New York"
                  className={errors.city ? PropertyListingFormStyles.error : ''}
                />
                {errors.city && <span className={PropertyListingFormStyles.errorText}>{errors.city}</span>}
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g., NY"
                  className={errors.state ? PropertyListingFormStyles.error : ''}
                />
                {errors.state && <span className={PropertyListingFormStyles.errorText}>{errors.state}</span>}
              </div>
            </div>

            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="zipCode">ZIP Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="e.g., 10001"
                  className={errors.zipCode ? PropertyListingFormStyles.error : ''}
                />
                {errors.zipCode && <span className={PropertyListingFormStyles.errorText}>{errors.zipCode}</span>}
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="USA"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Property Images</h2>
            <div className={PropertyListingFormStyles.imageUpload}>
              <div className={PropertyListingFormStyles.uploadArea}>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="images" className={PropertyListingFormStyles.uploadLabel}>
                  <div className={PropertyListingFormStyles.uploadIcon}>📸</div>
                  <p>Click to upload images</p>
                  <small>Upload multiple high-quality photos of your property</small>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className={PropertyListingFormStyles.imagePreview}>
                  <h3>Uploaded Images ({formData.images.length})</h3>
                  <div className={PropertyListingFormStyles.imageGrid}>
                    {formData.images.map((image, index) => (
                      <div key={index} className={PropertyListingFormStyles.imageItem}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Property ${index + 1}`}
                          className={PropertyListingFormStyles.previewImage}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className={PropertyListingFormStyles.removeImage}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Features & Amenities</h2>

            <div className={PropertyListingFormStyles.checkboxGroup}>
              <h3>Property Features</h3>
              <div className={PropertyListingFormStyles.checkboxGrid}>
                {[
                  'Air Conditioning', 'Heating', 'Hardwood Floors', 'Carpet', 'Tile Floors',
                  'Fireplace', 'Dishwasher', 'Washer/Dryer', 'Microwave', 'Refrigerator',
                  'Balcony', 'Patio', 'Garden', 'Pool', 'Gym', 'Elevator', 'Security System'
                ].map(feature => (
                  <label key={feature} className={PropertyListingFormStyles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className={PropertyListingFormStyles.checkboxGroup}>
              <h3>Amenities & Rules</h3>
              <div className={PropertyListingFormStyles.checkboxGrid}>
                <label className={PropertyListingFormStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="petFriendly"
                    checked={formData.petFriendly}
                    onChange={handleInputChange}
                  />
                  Pet Friendly
                </label>
                <label className={PropertyListingFormStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="smokingAllowed"
                    checked={formData.smokingAllowed}
                    onChange={handleInputChange}
                  />
                  Smoking Allowed
                </label>
                <label className={PropertyListingFormStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={formData.furnished}
                    onChange={handleInputChange}
                  />
                  Furnished
                </label>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Contact Information</h2>
            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="contactName">Full Name *</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={errors.contactName ? PropertyListingFormStyles.error : ''}
              />
              {errors.contactName && <span className={PropertyListingFormStyles.errorText}>{errors.contactName}</span>}
            </div>

            <div className={PropertyListingFormStyles.formRow}>
              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="contactEmail">Email *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={errors.contactEmail ? PropertyListingFormStyles.error : ''}
                />
                {errors.contactEmail && <span className={PropertyListingFormStyles.errorText}>{errors.contactEmail}</span>}
              </div>

              <div className={PropertyListingFormStyles.formGroup}>
                <label htmlFor="contactPhone">Phone *</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  className={errors.contactPhone ? PropertyListingFormStyles.error : ''}
                />
                {errors.contactPhone && <span className={PropertyListingFormStyles.errorText}>{errors.contactPhone}</span>}
              </div>
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="contactMethod">Preferred Contact Method</label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="both">Both Email and Phone</option>
              </select>
            </div>

            <div className={PropertyListingFormStyles.formGroup}>
              <label htmlFor="availabilityDate">Available From</label>
              <input
                type="date"
                id="availabilityDate"
                name="availabilityDate"
                value={formData.availabilityDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className={PropertyListingFormStyles.stepContent}>
            <h2>Review & Submit</h2>
            <div className={PropertyListingFormStyles.reviewSection}>
              <h3>Basic Information</h3>
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Type:</strong> {formData.propertyType}</p>
              <p><strong>Price:</strong> ${formData.price}</p>
              <p><strong>Description:</strong> {formData.description.substring(0, 100)}...</p>
            </div>

            <div className={PropertyListingFormStyles.reviewSection}>
              <h3>Property Details</h3>
              <p><strong>Bedrooms:</strong> {formData.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {formData.bathrooms}</p>
              <p><strong>Area:</strong> {formData.area} sq ft</p>
              <p><strong>Year Built:</strong> {formData.yearBuilt || 'Not specified'}</p>
            </div>

            <div className={PropertyListingFormStyles.reviewSection}>
              <h3>Location</h3>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>City:</strong> {formData.city}, {formData.state} {formData.zipCode}</p>
            </div>

            <div className={PropertyListingFormStyles.reviewSection}>
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> {formData.contactName}</p>
              <p><strong>Email:</strong> {formData.contactEmail}</p>
              <p><strong>Phone:</strong> {formData.contactPhone}</p>
            </div>

            <div className={PropertyListingFormStyles.submitNote}>
              <p>By submitting this listing, you agree to our terms and conditions.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={PropertyListingFormStyles.formContainer}>
      {renderStepIndicator()}

      <form onSubmit={handleSubmit} className={PropertyListingFormStyles.form}>
        {renderStepContent()}

        <div className={PropertyListingFormStyles.buttonGroup}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={PropertyListingFormStyles.prevButton}
            >
              Previous
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className={PropertyListingFormStyles.nextButton}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={PropertyListingFormStyles.submitButton}
            >
              Submit Listing
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
