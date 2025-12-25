'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogs = [
    {
      id: 1,
      slug: 'top-10-tips-for-home-sellers',
      title: 'Top 10 Tips for Home Sellers in 2025',
      excerpt: 'Learn the proven strategies to sell your home faster and for a higher price. Real estate experts share their insider tips.',
      content: 'Selling a home can be a complex process. In this comprehensive guide, we cover everything from pricing your property correctly to staging it for maximum appeal. Discover how professional photography, strategic marketing, and proper timing can make a significant difference in your sale outcomes.',
      category: 'Selling',
      author: 'Sarah Johnson',
      date: '2025-12-20',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      featured: true,
    },
    {
      id: 2,
      slug: 'first-time-home-buyer-guide',
      title: 'First-Time Home Buyer\'s Complete Guide',
      excerpt: 'Everything you need to know before making your first home purchase. From saving for a down payment to closing the deal.',
      content: 'Buying your first home is a major milestone. This guide walks you through the entire process including understanding mortgages, getting pre-approved, finding the right property, and navigating the closing process.',
      category: 'Buying',
      author: 'Michael Chen',
      date: '2025-12-18',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      featured: true,
    },
    {
      id: 3,
      slug: 'real-estate-market-trends-2025',
      title: '2025 Real Estate Market Trends You Should Know',
      excerpt: 'An analysis of the current market conditions, price trends, and predictions for the coming year.',
      content: 'The real estate market is constantly evolving. Learn about current trends in home prices, demand patterns, and investment opportunities. We analyze data from multiple markets to give you insights into what to expect.',
      category: 'Market',
      author: 'David Martinez',
      date: '2025-12-15',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      featured: false,
    },
    {
      id: 4,
      slug: 'staging-your-home-for-sale',
      title: 'Home Staging 101: Prepare Your Property to Sell',
      excerpt: 'Professional staging techniques that help buyers visualize your home and increase its appeal.',
      content: 'Home staging is an art and science. Learn how to declutter, arrange furniture, choose colors, and create an inviting atmosphere that appeals to potential buyers. Small changes can make a big difference.',
      category: 'Selling',
      author: 'Emily Thompson',
      date: '2025-12-12',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      featured: false,
    },
    {
      id: 5,
      slug: 'mortgage-rates-explained',
      title: 'Understanding Mortgage Rates and How to Get the Best Deal',
      excerpt: 'A detailed explanation of how mortgage rates work and strategies to secure better rates for your home loan.',
      content: 'Mortgage rates can significantly impact your monthly payments and total loan cost. Understand the factors that influence rates, how to compare loan offers, and negotiation strategies to get the best deal.',
      category: 'Buying',
      author: 'Jessica Lee',
      date: '2025-12-10',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      featured: false,
    },
    {
      id: 6,
      slug: 'investment-properties-guide',
      title: 'Investment Properties: A Guide for Real Estate Investors',
      excerpt: 'How to identify, evaluate, and manage investment properties for long-term wealth building.',
      content: 'Real estate investment can be lucrative. Learn about different types of investment properties, how to analyze deals, calculate returns, and manage properties effectively. We cover both residential and commercial investments.',
      category: 'Investing',
      author: 'Robert Wilson',
      date: '2025-12-08',
      readTime: 9,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      featured: true,
    },
    {
      id: 7,
      slug: 'neighborhood-guide-finding-perfect-area',
      title: 'Neighborhood Guide: Finding the Perfect Area for Your Lifestyle',
      excerpt: 'How to research neighborhoods, evaluate schools, safety, and community amenities to find your ideal location.',
      content: 'Choosing the right neighborhood is just as important as choosing the right property. Explore factors to consider including crime rates, school quality, commute times, local amenities, and community culture.',
      category: 'Buying',
      author: 'Amanda White',
      date: '2025-12-05',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      featured: false,
    },
    {
      id: 8,
      slug: 'home-inspection-what-to-expect',
      title: 'Home Inspection: What to Expect and What to Look For',
      excerpt: 'A complete guide to preparing for and understanding the home inspection process when buying a property.',
      content: 'Home inspections are crucial before closing on a property. Learn what inspectors look for, common issues they find, and how to use inspection results to negotiate repairs or price adjustments.',
      category: 'Buying',
      author: 'Kevin Anderson',
      date: '2025-12-02',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      featured: false,
    },
  ];

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Buying', value: 'Buying' },
    { name: 'Selling', value: 'Selling' },
    { name: 'Investing', value: 'Investing' },
    { name: 'Market', value: 'Market' },
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = blogs.filter(blog => blog.featured);

  return (
    <div>
      <Header />
      <main className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Real Estate Blog</h1>
              <p className={styles.heroDescription}>
                Expert insights, market trends, and practical tips for buyers, sellers, and investors
              </p>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <h2>Featured Articles</h2>
              </div>
              <div className={styles.featuredGrid}>
                {featuredBlogs.map(blog => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`}>
                    <div className={styles.featuredCard}>
                      <div className={styles.featuredImage}>
                        <img src={blog.image} alt={blog.title} />
                      </div>
                      <div className={styles.featuredContent}>
                        <span className={styles.category}>{blog.category}</span>
                        <h3>{blog.title}</h3>
                        <p>{blog.excerpt}</p>
                        <div className={styles.meta}>
                          <span className={styles.author}>By {blog.author}</span>
                          <span className={styles.date}>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filter Section */}
        <section className={styles.filterSection}>
          <div className={styles.container}>
            <div className={styles.filterButtons}>
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`${styles.filterBtn} ${selectedCategory === category.value ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className={styles.articlesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>All Articles</h2>
              <p>{filteredBlogs.length} articles found</p>
            </div>

            {filteredBlogs.length > 0 ? (
              <div className={styles.articlesGrid}>
                {filteredBlogs.map(blog => (
                  <Link key={blog.id} href={`/blog/${blog.slug}`}>
                    <div className={styles.articleCard}>
                      <div className={styles.articleImage}>
                        <img src={blog.image} alt={blog.title} />
                      </div>
                      <div className={styles.articleContent}>
                        <div className={styles.articleMeta}>
                          <span className={styles.category}>{blog.category}</span>
                          <span className={styles.readTime}>{blog.readTime} min read</span>
                        </div>
                        <h3>{blog.title}</h3>
                        <p>{blog.excerpt}</p>
                        <div className={styles.articleFooter}>
                          <span className={styles.date}>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className={styles.author}>{blog.author}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <p>No articles found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <h2>Subscribe to Our Newsletter</h2>
              <p>Get the latest real estate tips, market insights, and property updates delivered to your inbox.</p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.emailInput}
                />
                <button className={styles.subscribeBtn}>Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
