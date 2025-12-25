'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function AgentPage() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const agentAbilities = [
    {
      icon: 'fa-home',
      title: 'Sell Properties',
      description: 'List residential & commercial properties with photos, details, and specifications. Sell your own properties or client listings.'
    },
    {
      icon: 'fa-search',
      title: 'Find Properties to Buy',
      description: 'Browse thousands of properties, get direct contact with sellers, and make offers'
    },
    {
      icon: 'fa-users',
      title: 'Connect with Buyers & Sellers',
      description: 'Receive direct enquiries from verified buyers and connect with sellers actively looking for buyers'
    },
    {
      icon: 'fa-tasks',
      title: 'Manage All Transactions',
      description: 'Track all your deals - buying, selling, and negotiations in one unified dashboard'
    },
  ];

  const whyAgentsLoveUs = [
    {
      icon: 'fa-eye',
      title: 'More Buyer Visibility',
      description: 'Your properties reach thousands of active buyers searching for homes'
    },
    {
      icon: 'fa-phone-alt',
      title: 'Direct Contact',
      description: 'Buyers call you directly - no intermediaries, faster negotiations'
    },
    {
      icon: 'fa-check-circle',
      title: 'Verified Buyers & Sellers',
      description: 'Only verified users can contact you, ensuring safety and quality leads'
    },
    {
      icon: 'fa-tachometer-alt',
      title: 'Faster Closures',
      description: 'Our platform is designed to accelerate the sales process'
    },
    {
      icon: 'fa-user-tie',
      title: 'Professional Agent Profile',
      description: 'Build trust with a public profile showcasing your expertise and listings'
    },
    {
      icon: 'fa-chart-line',
      title: 'Grow Your Business',
      description: 'Get more leads and close more deals with consistent visibility'
    },
  ];

  const howItWorks = [
    {
      number: '1',
      title: 'Register',
      description: 'Create your agent account with your email and basic information'
    },
    {
      number: '2',
      title: 'Create Profile',
      description: 'Add your photo, agency details, experience, and areas served'
    },
    {
      number: '3',
      title: 'Buy & Sell Properties',
      description: 'List properties for sale and search for properties to buy'
    },
    {
      number: '4',
      title: 'Manage All Deals',
      description: 'Track all your buying and selling transactions in one dashboard'
    },
  ];

  const profileIncludes = [
    'Professional profile photo',
    'Your name & agency name',
    'Years of real estate experience',
    'Geographic areas you serve',
    'Active buy & sell listings',
    'Ratings & reviews from clients',
    'Call buttons for direct contact',
    'Verified agent badge',
  ];

  const faqs = [
    {
      question: 'Is there a cost to join as an agent?',
      answer: 'Joining Oikos as an agent is free! You can list properties and receive enquiries at no cost. We offer optional premium features for agents who want additional visibility.'
    },
    {
      question: 'How do I list a property?',
      answer: 'After creating your agent profile, you can list a property using our comprehensive listing form. Add photos, property details, amenities, pricing, and more. Your listing goes live immediately.'
    },
    {
      question: 'How do I find properties to buy?',
      answer: 'Use our advanced search and filter features to find properties that match your investment criteria. Contact sellers directly, make offers, and manage all your purchases through your dashboard.'
    },
    {
      question: 'How do buyers and sellers contact me?',
      answer: 'Both can call you directly or send messages through the platform. Your phone number is visible only to verified users. You can also schedule viewings directly through Oikos.'
    },
    {
      question: 'Can I manage both buying and selling activities?',
      answer: 'Absolutely! Your dashboard shows all your activities - properties for sale, properties you\'re buying, enquiries from buyers, and seller negotiations - all in one place.'
    },
    {
      question: 'Can I manage multiple listings?',
      answer: 'Yes! You can manage unlimited listings on your profile. Organize them by property type, location, or any other criteria that works for you.'
    },
    {
      question: 'How are my contact details protected?',
      answer: 'Your phone number and email are only visible to verified and logged-in users on the platform. We verify all users before they can see your contact information.'
    },
    {
      question: 'Can I edit my listings?',
      answer: 'Absolutely! You can edit or update any of your listings anytime. Changes are reflected immediately on the platform.'
    },
    {
      question: 'How do ratings and reviews work?',
      answer: 'After successful transactions, buyers and sellers can leave reviews and ratings on your profile. These help build your reputation and attract more serious leads.'
    },
    {
      question: 'What if I need help with something?',
      answer: 'Our support team is available 24/7 to help with any questions about your agent account or the Oikos platform.'
    },
  ];

  return (
    <div>
      <Header />
      <main className={styles.agentPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Close More Property Deals Faster</h1>
              <p className={styles.heroDescription}>
                Buy, sell, and manage properties all in one place. Connect with serious buyers and sellers, list properties, and build your professional reputation on Oikos.
              </p>
              <button className={styles.ctaButton}>
                Join as Agent
              </button>
            </div>
            <div className={styles.heroIllustration}>
              <i className="fas fa-handshake"></i>
            </div>
          </div>
        </section>

        {/* What Agents Can Do Section */}
        <section className={styles.abilitiesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>What Real Estate Agents Can Do</h2>
              <p>Buy, sell, and manage all your real estate transactions in one platform</p>
            </div>
            <div className={styles.abilitiesGrid}>
              {agentAbilities.map((ability, index) => (
                <div key={index} className={styles.abilityCard}>
                  <div className={styles.abilityIcon}>
                    <i className={`fas ${ability.icon}`}></i>
                  </div>
                  <h3>{ability.title}</h3>
                  <p>{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Agents Love Us Section */}
        <section className={styles.whySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Why Agents Love Our Platform</h2>
              <p>Features that help you close more deals and grow your business</p>
            </div>
            <div className={styles.benefitsGrid}>
              {whyAgentsLoveUs.map((benefit, index) => (
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
        <section className={styles.howItWorksSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>How It Works</h2>
              <p>Four simple steps to start receiving enquiries</p>
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

        {/* Agent Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Your Verified Agent Profile</h2>
              <p>What buyers and sellers see - Your complete professional presence</p>
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileIllustration}>
                <div className={styles.profileCard}>
                  <div className={styles.profileImage}>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className={styles.profileInfo}>
                    <h4>Sarah Johnson</h4>
                    <p className={styles.agency}>Prime Realty Group • Verified Agent ✓</p>
                    <p className={styles.rating}>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span>4.9 (84 reviews)</span>
                    </p>
                    <p className={styles.listings}>12 Active Listings</p>
                    <button className={styles.callButton}>
                      <i className="fas fa-phone"></i> Call Agent
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.profileList}>
                <h3>Your Profile Includes:</h3>
                <ul>
                  {profileIncludes.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.profileNote}>
                  <i className="fas fa-lightbulb"></i>
                  <p>Your complete profile helps buyers and sellers trust you and contact you directly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Listing Section */}
        <section className={styles.listingSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Buy & Sell Properties Easily</h2>
              <p>Post listings and find properties in minutes</p>
            </div>
            <div className={styles.listingContent}>
              <div className={styles.listingFeatures}>
                <div className={styles.featureItem}>
                  <div className={styles.featureNumber}>1</div>
                  <h4>Sell Properties</h4>
                  <p>List your own properties or client listings with full details and photos</p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureNumber}>2</div>
                  <h4>Search & Filter</h4>
                  <p>Find investment opportunities, properties to flip, or client leads easily</p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureNumber}>3</div>
                  <h4>Direct Contact</h4>
                  <p>Connect directly with buyers and sellers - no middleman needed</p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureNumber}>4</div>
                  <h4>Track Everything</h4>
                  <p>Manage all your buying and selling deals in one unified dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className={styles.successSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Agents Are Succeeding on Oikos</h2>
              <p>Real agents making more deals buying and selling</p>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>5,000+</div>
                <p>Active Agents</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>50,000+</div>
                <p>Property Listings</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100,000+</div>
                <p>Successful Transactions</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>4.8★</div>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Frequently Asked Questions</h2>
              <p>Get answers to common questions about becoming an agent on Oikos</p>
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

        {/* Final CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Buy, Sell & Close More Deals?</h2>
              <p>Join thousands of successful agents on Oikos who are buying, selling, and growing their business.</p>
              <div className={styles.ctaButtons}>
                <button className={styles.primaryButton}>Join as Agent</button>
                <button className={styles.secondaryButton}>Learn More</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
