'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VendorRegistrationModal from '@/components/VendorRegistrationModal';
import styles from './page.module.css';

export default function VendorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const vendorCategories = [
    { icon: 'fa-bolt', name: 'Electrician', color: '#FFB800' },
    { icon: 'fa-wrench', name: 'Plumber', color: '#0066CC' },
    { icon: 'fa-paint-roller', name: 'Painter', color: '#FF6B6B' },
    { icon: 'fa-hammer', name: 'Carpenter', color: '#8B4513' },
    { icon: 'fa-sofa', name: 'Interior Designer', color: '#9B59B6' },
  ];

  const howItWorks = [
    {
      number: '1',
      title: 'Register',
      description: 'Create your vendor account with basic information and choose your service category.'
    },
    {
      number: '2',
      title: 'Choose Plan',
      description: 'Select a subscription plan that fits your business needs and budget.'
    },
    {
      number: '3',
      title: 'Create Profile',
      description: 'Build a complete vendor profile with photos, experience, and service areas.'
    },
    {
      number: '4',
      title: 'Get Leads',
      description: 'Start receiving inquiries from verified buyers and sellers in your area.'
    },
  ];

  const whyJoinUs = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Local Visibility',
      description: 'Your profile appears to users in your service area, connecting you with local opportunities.'
    },
    {
      icon: 'fa-phone-alt',
      title: 'Direct Contact',
      description: 'Buyers & sellers call or WhatsApp you directly for a personal connection.'
    },
    {
      icon: 'fa-star',
      title: 'Build Trust',
      description: 'Reviews & ratings increase your credibility and chances of winning more projects.'
    },
    {
      icon: 'fa-clock',
      title: 'Save Time',
      description: 'Stop searching for leads. Let qualified buyers and sellers find you on Qilo.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Grow Your Business',
      description: 'Expand your customer base and increase your revenue with consistent leads.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Safe & Secure',
      description: 'All transactions and personal information are protected with enterprise-grade security.'
    },
  ];

  const profileIncludes = [
    'Professional profile photo / logo',
    'Your name & business name',
    'Service category & specializations',
    'Years of experience',
    'Service areas (coverage zones)',
    'Portfolio with work photos',
    'Direct contact button (Call / WhatsApp)',
    'Reviews & rating from customers',
  ];

  const faqs = [
    {
      question: 'How much does it cost to join Qilo as a vendor?',
      answer: 'Joining Qilo is free! We offer flexible subscription plans starting from basic to premium tiers. Choose the plan that works best for your business.'
    },
    {
      question: 'How do I get leads on Qilo?',
      answer: 'Once you create your vendor profile, buyers and sellers in your service area can directly contact you. The more complete your profile, the more inquiries you receive.'
    },
    {
      question: 'Can I work in multiple service categories?',
      answer: 'Yes! You can list multiple services on your vendor profile. For example, if you\'re both a painter and interior designer, you can offer both services.'
    },
    {
      question: 'How are my contact details protected?',
      answer: 'Your phone number is visible only to verified and logged-in users on the platform. We verify all users before they can see your contact information.'
    },
    {
      question: 'What if I want to change my service areas?',
      answer: 'You can update your service areas anytime from your vendor dashboard. Changes take effect immediately.'
    },
    {
      question: 'How do reviews and ratings work?',
      answer: 'After completing a project, customers can leave reviews and ratings on your profile. This helps build your reputation and attracts more leads.'
    },
    {
      question: 'Can I upload before and after photos?',
      answer: 'Absolutely! We encourage you to upload a portfolio of your work. High-quality before and after photos significantly increase your lead conversion rate.'
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes! Our support team is available 24/7 to help with any questions about your vendor account or the Qilo platform.'
    },
  ];

  return (
    <div>
      <Header />
      <main className={styles.vendorPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Get More Local Work from Property Buyers & Sellers</h1>
              <p className={styles.heroDescription}>
                Connect with verified buyers and sellers actively looking for professionals like you. Build your reputation, get leads, and grow your business on Qilo.
              </p>
              <button className={styles.ctaButton} onClick={() => setIsModalOpen(true)}>
                Join as Vendor
              </button>
            </div>
            <div className={styles.heroIllustration}>
              <i className="fas fa-briefcase"></i>
            </div>
          </div>
        </section>

        {/* Vendor Categories Section */}
        <section className={styles.categoriesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>What Services Do You Provide?</h2>
              <p>We work with professionals across multiple service categories</p>
            </div>
            <div className={styles.categoriesGrid}>
              {vendorCategories.map((category, index) => (
                <div key={index} className={styles.categoryCard}>
                  <div 
                    className={styles.categoryIcon}
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <i className={`fas ${category.icon}`}></i>
                  </div>
                  <h3>{category.name}</h3>
                  <p>Connect with customers looking for {category.name.toLowerCase()} services</p>
                </div>
              ))}
            </div>
            <p className={styles.expandNote}>
              Don't see your service? <a href="#contact">Contact us</a> to add more categories.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>How It Works</h2>
              <p>Four simple steps to start getting leads</p>
            </div>
            <div className={styles.stepsContainer}>
              {howItWorks.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  {index < howItWorks.length - 1 && <div className={styles.stepArrow}>→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className={styles.whyJoinSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Why Join Qilo?</h2>
              <p>Get more work and build your professional reputation</p>
            </div>
            <div className={styles.benefitsGrid}>
              {whyJoinUs.map((benefit, index) => (
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

        {/* Vendor Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>What Goes in Your Vendor Profile</h2>
              <p>Create a complete profile to attract more customers</p>
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileIllustration}>
                <div className={styles.profileCard}>
                  <div className={styles.profileImage}>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className={styles.profileInfo}>
                    <h4>John's Plumbing Services</h4>
                    <p className={styles.rating}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span>4.8 (47 reviews)</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.profileList}>
                <ul>
                  {profileIncludes.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.privacyNote}>
                  <i className="fas fa-lock"></i>
                  <p>Your phone number is visible only to logged-in users on the platform</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Contact Them Section */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Who Can Contact You?</h2>
              <p>Your profile is safe and secure</p>
            </div>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Verified Buyers</h3>
                <p>Only users who have verified their identity and email can contact you.</p>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Verified Sellers</h3>
                <p>Property owners and sellers who have completed our verification process.</p>
              </div>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Safe & Secure</h3>
                <p>All communications are monitored and protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps to Success Section */}
        <section className={styles.successSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Steps to Success</h2>
              <p>Build your vendor profile and start getting leads</p>
            </div>
            <div className={styles.successSteps}>
              <div className={styles.successStep}>
                <div className={styles.successStepNumber}>1</div>
                <h3>Complete Your Profile</h3>
                <p>Add a professional photo, service areas, and your experience details.</p>
              </div>
              <div className={styles.successStep}>
                <div className={styles.successStepNumber}>2</div>
                <h3>Upload Portfolio</h3>
                <p>Showcase your best work with high-quality before and after photos.</p>
              </div>
              <div className={styles.successStep}>
                <div className={styles.successStepNumber}>3</div>
                <h3>Get Inquiries</h3>
                <p>Receive calls and WhatsApp messages from interested buyers and sellers.</p>
              </div>
              <div className={styles.successStep}>
                <div className={styles.successStepNumber}>4</div>
                <h3>Deliver Excellence</h3>
                <p>Complete projects and collect reviews to build your reputation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Frequently Asked Questions</h2>
              <p>Get answers to common questions about becoming a vendor on Qilo</p>
            </div>
            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-down ${activeAccordion === index ? styles.rotated : ''}`}></i>
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

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Get More Work?</h2>
              <p>Join thousands of professionals on Qilo and grow your business today.</p>
              <div className={styles.ctaButtons}>
                <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>Join as Vendor</button>
                <button className={styles.secondaryButton}>Learn More</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VendorRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
}
