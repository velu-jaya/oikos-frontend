'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './RoleNavigation.module.css';

export default function RoleNavigation() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const roles = [
    {
      id: 'buyer',
      icon: 'fa-home',
      title: 'Buyer',
      description: 'Find your perfect home with AI-powered recommendations and expert guidance',
      features: [
        'Browse 5000+ properties',
        'Get personalized recommendations',
        'Compare properties easily',
        'Direct messaging with sellers'
      ],
      cta: 'Start Buying',
      ctaLink: '/buyer'
    },
    {
      id: 'seller',
      icon: 'fa-chart-line',
      title: 'Seller',
      description: 'List your property and reach qualified buyers across India',
      features: [
        'List property for free',
        'Get instant valuations',
        'Professional photography',
        'Reach 1200+ verified buyers'
      ],
      cta: 'Start Selling',
      ctaLink: '#plans'
    },
    {
      id: 'agent',
      icon: 'fa-briefcase',
      title: 'Agent',
      description: 'Grow your business with our platform and connect with more clients',
      features: [
        'Manage listings efficiently',
        'Access client database',
        'Marketing tools included',
        'Higher commission rates'
      ],
      cta: 'Find Agents',
      ctaLink: '#'
    },
    {
      id: 'vendor',
      icon: 'fa-tools',
      title: 'Vendor',
      description: 'Offer your services to property owners and expand your customer base',
      features: [
        'Get verified on platform',
        'Receive service requests',
        'Build your reputation',
        'Flexible service packages'
      ],
      cta: 'Join as Vendor',
      ctaLink: '#'
    }
  ];

  return (
    <section className={styles.roleNavigation}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>How Would You Like to Use Qilo?</h2>
          <p>Choose your role and unlock features tailored just for you</p>
        </div>

        <div className={styles.cardsGrid}>
          {roles.map((role) => (
            <div
              key={role.id}
              className={`${styles.card} ${hoveredCard === role.id ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background Gradient */}
              <div className={`${styles.cardBg} ${styles[`bg-${role.id}`]}`}></div>

              {/* Card Content */}
              <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <i className={`fa-solid ${role.icon}`}></i>
              </div>                <h3 className={styles.title}>{role.title}</h3>
                <p className={styles.description}>{role.description}</p>

                {/* Features List */}
                <ul className={styles.featuresList}>
                  {role.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className={styles.checkmark}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={role.ctaLink} className={styles.ctaButton}>
                  {role.cta}
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>

              {/* Hover Effect Accent */}
              <div className={styles.accent}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
