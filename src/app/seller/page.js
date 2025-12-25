'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyListingForm from '@/components/PropertyListingForm';
import PropertyListingModal from '@/components/PropertyListingModal';
import styles from './page.module.css';

export default function SellerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const infoSteps = [
    {
      icon: 'fa-list-check',
      title: 'Basic Information',
      description: 'Property title, type, price, and detailed description'
    },
    {
      icon: 'fa-house',
      title: 'Property Details',
      description: 'Bedrooms, bathrooms, area, year built, parking, and more'
    },
    {
      icon: 'fa-location-dot',
      title: 'Location Details',
      description: 'Complete address, city, state, ZIP code, and coordinates'
    },
    {
      icon: 'fa-image',
      title: 'High-Quality Images',
      description: 'Upload multiple photos showcasing your property'
    },
    {
      icon: 'fa-sparkles',
      title: 'Features & Amenities',
      description: 'Highlight special features, amenities, and property rules'
    },
    {
      icon: 'fa-phone',
      title: 'Contact Information',
      description: 'Your name, email, phone, and preferred contact method'
    }
  ];

  const benefits = [
    {
      icon: 'fa-rocket',
      title: 'Reach More Buyers',
      description: 'Get your property in front of thousands of potential buyers actively searching for homes'
    },
    {
      icon: 'fa-bolt',
      title: 'Faster Sales',
      description: 'Our platform helps properties sell 40% faster on average with targeted marketing'
    },
    {
      icon: 'fa-comments',
      title: 'Manage Enquiries',
      description: 'Handle all buyer inquiries from one convenient dashboard. Stay organized and responsive'
    },
    {
      icon: 'fa-chart-bar',
      title: 'Detailed Analytics',
      description: 'Track how many people viewed your listing and understand buyer interest patterns'
    },
    {
      icon: 'fa-bullseye',
      title: 'Smart Recommendations',
      description: 'Get AI-powered suggestions to optimize your listing for better visibility and engagement'
    },
    {
      icon: 'fa-shield',
      title: 'Safe & Secure',
      description: 'All transactions and personal information are protected with enterprise-grade security'
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Create Your Listing',
      description: 'Fill out our comprehensive form with all property details, photos, and amenities. Takes about 15 minutes.'
    },
    {
      number: '2',
      title: 'Verify & Optimize',
      description: 'Our system verifies your information and suggests optimizations to make your listing stand out.'
    },
    {
      number: '3',
      title: 'Go Live',
      description: 'Your property is published and instantly visible to thousands of active buyers on the platform.'
    },
    {
      number: '4',
      title: 'Manage Enquiries',
      description: 'Receive and respond to buyer inquiries through our secure messaging system.'
    },
    {
      number: '5',
      title: 'Schedule Viewings',
      description: 'Coordinate property viewings directly with interested buyers and track appointments.'
    },
    {
      number: '6',
      title: 'Close the Deal',
      description: 'Finalize the sale with built-in support and resources to ensure a smooth transaction.'
    }
  ];

  const faqs = [
    {
      question: 'How much does it cost to list a property?',
      answer: 'Listing your property on Oikos is completely free! We only charge a small commission when your property is successfully sold.'
    },
    {
      question: 'How long does it take to list my property?',
      answer: 'You can list your property in as little as 15 minutes by filling out our straightforward form with property details and photos.'
    },
    {
      question: 'What if I need to edit my listing?',
      answer: 'You can edit your listing anytime from your seller dashboard. Changes are reflected immediately on the platform.'
    },
    {
      question: 'How do I upload photos?',
      answer: 'You can upload multiple high-quality images directly from your computer or smartphone. We recommend at least 10 photos for best results.'
    },
    {
      question: 'Can I schedule viewings through the platform?',
      answer: 'Yes! You can schedule and manage viewings directly through your seller dashboard. Buyers can request appointment times.'
    },
    {
      question: 'What if my property doesn\'t sell?',
      answer: 'You can keep your listing active for as long as needed with no recurring fees. We\'ll provide tips to help you attract more buyers.'
    },
    {
      question: 'Is my contact information safe?',
      answer: 'Yes, all contact information is protected with industry-standard encryption. Buyers can only message you through our secure platform.'
    },
    {
      question: 'Can I list multiple properties?',
      answer: 'Absolutely! Sellers can list as many properties as they want on our platform without any restrictions.'
    }
  ];

  return (
    <div>
      <Header />
      <main className={styles.sellerPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>List Your Property</h1>
              <p className={styles.heroDescription}>
                List your property and connect with genuine buyers faster. Our platform helps you showcase your property, manage enquiries, and close deals smoothly.
              </p>
              <button className={styles.ctaButton} onClick={() => setIsModalOpen(true)}>
                Start Listing Now
              </button>
            </div>
          </div>
        </section>

        {/* Information Needed Section */}
        <section className={styles.infoSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>What Information You'll Need</h2>
              <p>Gather these details before you start listing your property</p>
            </div>
            <div className={styles.infoGrid}>
              {infoSteps.map((step, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Why Sell on Oikos?</h2>
              <p>Get the best experience with our seller-first platform</p>
            </div>
            <div className={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <i className={`fas ${benefit.icon}`}></i>
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.processSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>How the Process Works</h2>
              <p>Six simple steps to sell your property</p>
            </div>
            <div className={styles.processSteps}>
              {processSteps.map((step, index) => (
                <div key={index} className={styles.processStep}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && <div className={styles.stepConnector}></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Listing Form Section */}
        <section className={`${styles.formSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Create Your Listing</h2>
              <p>Fill in the details of your property below</p>
            </div>
            <PropertyListingForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Frequently Asked Questions</h2>
              <p>Get answers to common questions about listing on Oikos</p>
            </div>
            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${activeAccordion === index ? styles.active : ''}`}>
                      ▼
                    </span>
                  </button>
                  {activeAccordion === index && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Sell Your Property?</h2>
              <p>Join thousands of successful sellers who have found their perfect buyers on Oikos</p>
              <button className={styles.ctaButtonLarge} onClick={() => document.querySelector('.' + styles.formSection).scrollIntoView({ behavior: 'smooth' })}>
                List Your Property Today
              </button>
            </div>
          </div>
        </section>
      </main>
      <PropertyListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
}
