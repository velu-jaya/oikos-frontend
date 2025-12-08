'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './page.module.css';
import sampleProperties from '../../../data/properties';

export default function PropertyDetailsPage({ params }) {
  const { id } = use(params);
  const property = sampleProperties.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(property?.image || '');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!property) {
    return (
      <div className={styles.notFound}>
        <h1>Property Not Found</h1>
        <Link href="/buyer">← Back to Listings</Link>
      </div>
    );
  }

  const galleryImages = [
    property.image,
    property.image,
    property.image,
    property.image,
    property.image,
    property.image,
  ];

  const amenities = [
    { icon: 'fa-lock', name: 'Security System' },
    { icon: 'fa-tree', name: 'Large Yard' },
    { icon: 'fa-water', name: 'Swimming Pool' },
    { icon: 'fa-car', name: 'Garage' },
    { icon: 'fa-arrow-down', name: 'Basement' },
    { icon: 'fa-fire', name: 'Fireplace' },
  ];

  const nearbyPlaces = [
    { icon: 'fa-graduation-cap', name: 'Schools', distance: '0.5 km away', count: 5 },
    { icon: 'fa-hospital', name: 'Hospitals', distance: '1.2 km away', count: 3 },
    { icon: 'fa-bag-shopping', name: 'Shopping', distance: '0.3 km away', count: 8 },
    { icon: 'fa-utensils', name: 'Restaurants', distance: '0.8 km away', count: 12 },
    { icon: 'fa-bus', name: 'Public Transport', distance: '0.4 km away', count: 2 },
    { icon: 'fa-gopuram', name: 'Religious Place', distance: '1.5 km away', count: 4 },
  ];

  const propertyFeatures = [
    { label: 'Bedrooms', value: property.beds },
    { label: 'Bathrooms', value: property.baths },
    { label: 'Property Size', value: `${property.area} sqft` },
    { label: 'Property Type', value: 'House' },
    { label: 'Year Built', value: '2018' },
    { label: 'Parking Spaces', value: '2' },
  ];

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/buyer">Properties</Link>
          <span>/</span>
          <span>{property.title}</span>
        </div>

        <div className={styles.content}>
          {/* Left Section - Main Content */}
          <div className={styles.mainSection}>
            {/* Gallery */}
            <section className={styles.gallery}>
              <div className={styles.mainImage}>
                <Image
                  src={selectedImage}
                  alt={property.title}
                  width={800}
                  height={500}
                  priority
                  quality={100}
                />
                <span className={styles.featuredBadge}>FEATURED</span>
              </div>

              <div className={styles.thumbnails}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`${styles.thumbnail} ${
                      selectedImage === img ? styles.active : ''
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      width={100}
                      height={80}
                      quality={75}
                    />
                  </button>
                ))}
              </div>

              <button className={styles.viewAllPhotos}>
                View All Photos ({galleryImages.length})
              </button>
            </section>

            {/* Property Overview */}
            <section className={styles.overview}>
              <div className={styles.priceSection}>
                <h1>{property.title}</h1>
                <div className={styles.priceLocation}>
                  <div className={styles.price}>{property.price}</div>
                  <div className={styles.location}>
                    📍 {property.city}
                  </div>
                </div>
              </div>

              <div className={styles.quickStats}>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><i className="fas fa-bed"></i></div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{property.beds}</div>
                    <div className={styles.statLabel}>Bedrooms</div>
                  </div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><i className="fas fa-bath"></i></div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{property.baths}</div>
                    <div className={styles.statLabel}>Bathrooms</div>
                  </div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statIcon}><i className="fas fa-ruler"></i></div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>{property.area.toLocaleString()}</div>
                    <div className={styles.statLabel}>Sqft</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className={styles.description}>
              <h2>About This Property</h2>
              <p>
                This stunning property offers the perfect blend of modern luxury and
                comfortable living. Located in a prime neighborhood with excellent
                schools and amenities nearby. The spacious layout features an open
                concept living area, premium finishes, and a well-maintained outdoor
                space. Perfect for families or professionals looking for a quality home.
              </p>
            </section>

            {/* Features & Amenities */}
            <section className={styles.features}>
              <h2>Property Features</h2>
              <div className={styles.featureGrid}>
                {propertyFeatures.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <span className={styles.featureLabel}>{feature.label}</span>
                    <span className={styles.featureValue}>{feature.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className={styles.amenities}>
              <h2>Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {amenities.map((amenity, idx) => (
                  <div key={idx} className={styles.amenityCard}>
                    <div className={styles.amenityIcon}><i className={`fas ${amenity.icon}`}></i></div>
                    <div className={styles.amenityName}>{amenity.name}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nearby Places */}
            <section className={styles.nearby}>
              <h2>Nearby Places & Accessibility</h2>
              <div className={styles.nearbyGrid}>
                {nearbyPlaces.map((place, idx) => (
                  <div key={idx} className={styles.nearbyCard}>
                    <div className={styles.nearbyHeader}>
                      <span className={styles.nearbyIcon}><i className={`fas ${place.icon}`}></i></span>
                      <h3>{place.name}</h3>
                    </div>
                    <p className={styles.nearbyDistance}>{place.distance}</p>
                    <p className={styles.nearbyCount}>{place.count} places</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
              <h2>Location on Map</h2>
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  📍 {property.city} - Interactive Map Coming Soon
                </div>
              </div>
            </section>
          </div>

          {/* Right Section - Contact & Actions */}
          <aside className={styles.sidebar}>
            {/* Contact Card */}
            <div className={styles.contactCard}>
              <div className={styles.sellerInfo}>
                <div className={styles.sellerAvatar}>👨‍💼</div>
                <div className={styles.sellerDetails}>
                  <h3>Velu Jaya</h3>
                  <p>Real Estate Agent</p>
                  <span className={styles.verified}>✓ Verified</span>
                </div>
              </div>

              <button className={styles.btnPrimary}>
                <i className="fas fa-phone"></i> Call Seller
              </button>
              <button className={styles.btnSecondary}>
                <i className="fas fa-message"></i> Message
              </button>
              <button className={styles.btnSecondary}>
                <i className="fas fa-comments"></i> Chat with Oikos
              </button>
            </div>

            {/* Schedule Tour Card */}
            <div className={styles.actionCard}>
              <h3>Schedule a Tour</h3>
              <p>Interested in viewing this property?</p>
              <button
                className={styles.btnPrimary}
                onClick={() => setShowScheduleModal(true)}
              >
                <i className="fas fa-calendar"></i> Schedule Tour
              </button>
            </div>

            {/* Quick Actions */}
            <div className={styles.actionCard}>
              <h3>Quick Actions</h3>
              <button className={styles.actionButton}>
                <i className="fas fa-heart"></i> Save Property
              </button>
              <button className={styles.actionButton}>
                <i className="fas fa-share"></i> Share Property
              </button>
              <button className={styles.actionButton}>
                <i className="fas fa-envelope"></i> Email Details
              </button>
              <button className={styles.actionButton}>
                <i className="fas fa-images"></i> Request More Photos
              </button>
            </div>

            {/* Virtual Tour Card */}
            <div className={styles.actionCard}>
              <h3>Virtual Tour</h3>
              <p>Experience the property from home</p>
              <button className={styles.btnSecondary}>
                <i className="fas fa-video"></i> View 360° Tour
              </button>
            </div>

            {/* Property Highlights */}
            <div className={styles.highlightsCard}>
              <h3>Highlights</h3>
              <ul className={styles.highlightsList}>
                <li>✓ Recently Updated</li>
                <li>✓ Move-In Ready</li>
                <li>✓ Great Investment</li>
                <li>✓ Prime Location</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className={styles.modalOverlay} onClick={() => setShowScheduleModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setShowScheduleModal(false)}
            >
              ✕
            </button>
            <h2>Schedule a Tour</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input type="date" required />
              </div>
              <div className={styles.formGroup}>
                <label>Time</label>
                <input type="time" required />
              </div>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" required />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input type="tel" required />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea rows="4" placeholder="Any specific questions?"></textarea>
              </div>
              <button type="submit" className={styles.btnPrimary}>
                Confirm Tour Schedule
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
