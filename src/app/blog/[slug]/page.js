'use client';

import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// Sample blog data - in a real app, this would come from a database or API
const blogDatabase = {
  'top-10-tips-for-home-sellers': {
    id: 1,
    slug: 'top-10-tips-for-home-sellers',
    title: 'Top 10 Tips for Home Sellers in 2025',
    excerpt: 'Learn the proven strategies to sell your home faster and for a higher price.',
    category: 'Selling',
    author: 'Sarah Johnson',
    date: '2025-12-20',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
    content: `
      <h2>Introduction</h2>
      <p>Selling a home can be a complex process, but with the right strategies, you can maximize your returns and minimize stress. Here are the top 10 tips that successful home sellers use to achieve excellent results.</p>

      <h2>1. Price Your Home Competitively</h2>
      <p>One of the most critical factors in selling your home is pricing it correctly. Price too high, and you'll have fewer interested buyers. Price too low, and you're leaving money on the table. Research comparable homes in your area and work with a real estate agent to determine the optimal listing price.</p>

      <h2>2. Improve Your Home's Curb Appeal</h2>
      <p>First impressions matter. The exterior of your home is the first thing potential buyers see. Invest in landscaping, paint the front door, clean the windows, and ensure the entry is welcoming. A well-maintained exterior can significantly increase buyer interest.</p>

      <h2>3. Professional Photography is Essential</h2>
      <p>In today's digital-first real estate market, professional photography is non-negotiable. High-quality photos attract more online viewers and lead to more showings. Consider virtual tours and drone photography for an even more compelling listing.</p>

      <h2>4. Stage Your Home</h2>
      <p>Home staging involves arranging furniture and decor to showcase your home's best features. Decluttering, depersonalizing, and creating inviting spaces help buyers envision themselves living in your home. Professional staging can increase your sale price by 5-10%.</p>

      <h2>5. Time Your Listing Strategically</h2>
      <p>Market timing matters. Spring and early summer typically see higher buyer activity. However, if you must sell during slower seasons, you can stand out with an exceptional property and aggressive marketing.</p>

      <h2>6. Highlight Unique Features</h2>
      <p>Whether it's hardwood floors, energy-efficient windows, or a gourmet kitchen, make sure your home's unique features are prominently featured in your listing and marketing materials.</p>

      <h2>7. Fix Major Issues Before Listing</h2>
      <p>Address significant structural, plumbing, or electrical issues before listing. While you don't need to do cosmetic updates, major problems will turn away buyers or result in lower offers.</p>

      <h2>8. Market Aggressively</h2>
      <p>Use multiple marketing channels: online listings, social media, open houses, and print advertising. The more exposure your property gets, the more potential buyers will see it.</p>

      <h2>9. Be Flexible with Showings</h2>
      <p>Make your home available for showings as much as possible. Be accommodating with viewing times, and keep the home clean and presentation-ready at all times.</p>

      <h2>10. Work with a Qualified Agent</h2>
      <p>A good real estate agent is worth their commission. They bring market expertise, marketing resources, and negotiation skills that can result in a faster sale and higher price.</p>

      <h2>Conclusion</h2>
      <p>Selling your home successfully requires preparation, strategy, and expert guidance. Follow these tips, and you'll be well-positioned to achieve excellent results in your home sale.</p>
    `,
    tags: ['Home Selling', 'Pricing', 'Staging', 'Marketing'],
  },
  'first-time-home-buyer-guide': {
    id: 2,
    slug: 'first-time-home-buyer-guide',
    title: 'First-Time Home Buyer\'s Complete Guide',
    excerpt: 'Everything you need to know before making your first home purchase.',
    category: 'Buying',
    author: 'Michael Chen',
    date: '2025-12-18',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    content: `
      <h2>Introduction</h2>
      <p>Buying your first home is an exciting milestone, but it can also be overwhelming. This comprehensive guide will walk you through every step of the process, from understanding mortgages to closing the deal.</p>

      <h2>Step 1: Get Pre-Approved for a Mortgage</h2>
      <p>Before you start house hunting, get pre-approved for a mortgage. This shows sellers you're serious and gives you a clear budget. Work with a mortgage lender to determine how much you can borrow based on your income and credit score.</p>

      <h2>Step 2: Save for a Down Payment</h2>
      <p>Most lenders require a down payment ranging from 3% to 20% of the home's purchase price. Start saving early and explore first-time homebuyer programs that may offer assistance.</p>

      <h2>Step 3: Choose Your Real Estate Agent</h2>
      <p>A good agent will guide you through the buying process, help you identify suitable properties, and negotiate on your behalf. Interview multiple agents before choosing one you trust.</p>

      <h2>Step 4: Start Your Home Search</h2>
      <p>Use online platforms and work with your agent to find properties that match your criteria. Attend open houses, view multiple properties, and don't rush your decision.</p>

      <h2>Step 5: Make an Offer</h2>
      <p>When you find the right property, your agent will help you draft a competitive offer. This includes the purchase price, earnest money deposit, and contingencies.</p>

      <h2>Step 6: Get a Home Inspection</h2>
      <p>Once your offer is accepted, hire a professional home inspector. This person will examine the property for structural issues, defects, and needed repairs.</p>

      <h2>Step 7: Secure Financing</h2>
      <p>Work with your lender to finalize your mortgage. They'll order an appraisal and verify your financial information.</p>

      <h2>Step 8: Obtain Homeowners Insurance</h2>
      <p>Your lender will require proof of homeowners insurance. Shop around for the best rates and coverage.</p>

      <h2>Step 9: Final Walkthrough</h2>
      <p>Before closing, do a final walkthrough of the property to ensure agreed-upon repairs were made and the property is in the expected condition.</p>

      <h2>Step 10: Close the Deal</h2>
      <p>At closing, you'll sign final documents and receive the keys to your new home. Review all documents carefully and ask questions if anything is unclear.</p>

      <h2>Conclusion</h2>
      <p>Buying your first home is a big step, but with proper planning and guidance, it can be a smooth and rewarding experience.</p>
    `,
    tags: ['First-Time Buyer', 'Mortgage', 'Pre-Approval', 'Home Search'],
  },
  'real-estate-market-trends-2025': {
    id: 3,
    slug: 'real-estate-market-trends-2025',
    title: '2025 Real Estate Market Trends You Should Know',
    excerpt: 'An analysis of the current market conditions, price trends, and predictions.',
    category: 'Market',
    author: 'David Martinez',
    date: '2025-12-15',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop',
    content: `
      <h2>Current Market Overview</h2>
      <p>The real estate market is in a state of flux as we enter 2025. Understanding current trends can help you make informed decisions whether you're buying, selling, or investing.</p>

      <h2>Trend 1: Interest Rates Stabilizing</h2>
      <p>After years of volatility, mortgage interest rates appear to be stabilizing. This provides more certainty for buyers and sellers in planning their transactions.</p>

      <h2>Trend 2: Inventory Levels Rising</h2>
      <p>More homes are coming on the market, giving buyers more choices. This shift favors buyers after years of low inventory.</p>

      <h2>Trend 3: Remote Work Impact</h2>
      <p>Remote work continues to influence where people choose to live. Suburban and rural areas are seeing increased demand from those no longer tied to office locations.</p>

      <h2>Trend 4: Focus on Energy Efficiency</h2>
      <p>Buyers increasingly prioritize energy-efficient homes. Properties with solar panels, updated insulation, and efficient HVAC systems command premium prices.</p>

      <h2>Trend 5: Urban Renaissance</h2>
      <p>Cities are experiencing renewed interest, particularly among younger professionals and empty nesters. Urban properties with walkable neighborhoods are in high demand.</p>

      <h2>Trend 6: Sustainability Matters</h2>
      <p>Green building practices and sustainable living options are becoming mainstream. Properties with eco-friendly features attract environmentally conscious buyers.</p>

      <h2>Trend 7: Technology Integration</h2>
      <p>Smart home technology is now expected rather than optional. Homes with integrated technology systems command higher prices and sell faster.</p>

      <h2>Market Predictions for 2025</h2>
      <p>Experts predict a more balanced market with modest price appreciation. Both buyers and sellers will have more negotiating power compared to recent years.</p>

      <h2>Conclusion</h2>
      <p>Stay informed about market trends to make strategic decisions in your real estate endeavors. Consult with local experts to understand how these national trends affect your specific market.</p>
    `,
    tags: ['Market Trends', 'Predictions', 'Interest Rates', 'Inventory'],
  },
  'staging-your-home-for-sale': {
    id: 4,
    slug: 'staging-your-home-for-sale',
    title: 'Home Staging 101: Prepare Your Property to Sell',
    excerpt: 'Professional staging techniques that help buyers visualize your home.',
    category: 'Selling',
    author: 'Emily Thompson',
    date: '2025-12-12',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1615071687644-dbe66f3b34de?w=1200&h=600&fit=crop',
    content: `
      <h2>What is Home Staging?</h2>
      <p>Home staging is the process of preparing your property for sale by making it appealing to the broadest range of potential buyers. It's about creating an emotional connection between buyers and your home.</p>

      <h2>Benefits of Staging</h2>
      <p>Staged homes typically sell faster and for higher prices. Statistics show that staged homes can sell for up to 10% more than non-staged properties.</p>

      <h2>Decluttering First</h2>
      <p>Start by removing personal items, excess furniture, and clutter. A clean, minimalist approach helps buyers envision the space as theirs.</p>

      <h2>Furniture Arrangement</h2>
      <p>Arrange furniture to showcase room size and flow. Remove oversized pieces that make rooms feel cramped. Create clear pathways through each space.</p>

      <h2>Color Psychology</h2>
      <p>Neutral colors like white, gray, and beige create a blank canvas for buyers. If you paint, choose colors that appeal to the broadest audience.</p>

      <h2>Lighting Matters</h2>
      <p>Good lighting makes spaces feel larger and more inviting. Ensure all rooms are well-lit during showings. Consider updating light fixtures if they're dated.</p>

      <h2>Curb Appeal First</h2>
      <p>Buyers make decisions about your home in the first 10 seconds. Invest in landscaping, paint, and entrance improvements to make a great first impression.</p>

      <h2>Kitchen and Bath Focus</h2>
      <p>These rooms are decision-makers for many buyers. Ensure they're sparkling clean, update hardware if possible, and showcase functionality.</p>

      <h2>Remove Personal Items</h2>
      <p>Family photos, personal collections, and religious items can distract buyers. Keep décor neutral and impersonal to help buyers focus on the space itself.</p>

      <h2>Conclusion</h2>
      <p>Proper staging can make a significant difference in your home's sale price and how quickly it sells. Invest in this important step of the selling process.</p>
    `,
    tags: ['Staging', 'Selling Tips', 'Curb Appeal', 'Interior Design'],
  },
  'mortgage-rates-explained': {
    id: 5,
    slug: 'mortgage-rates-explained',
    title: 'Understanding Mortgage Rates and How to Get the Best Deal',
    excerpt: 'A detailed explanation of how mortgage rates work.',
    category: 'Buying',
    author: 'Jessica Lee',
    date: '2025-12-10',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
    content: `
      <h2>What Determines Mortgage Rates?</h2>
      <p>Mortgage rates are influenced by various economic factors including the Federal Reserve's decisions, inflation, employment data, and overall economic growth.</p>

      <h2>Fixed vs. Adjustable Rate Mortgages</h2>
      <p>Fixed-rate mortgages maintain the same interest rate throughout the loan term, providing predictability. Adjustable-rate mortgages start with lower rates but can increase after an initial period.</p>

      <h2>Your Credit Score Impact</h2>
      <p>Lenders use your credit score to determine the interest rate they offer. A higher credit score typically results in a lower interest rate and better loan terms.</p>

      <h2>Debt-to-Income Ratio</h2>
      <p>Lenders examine your debt-to-income ratio to assess lending risk. A lower ratio generally results in better rates and more favorable loan terms.</p>

      <h2>Down Payment Size</h2>
      <p>A larger down payment reduces lender risk and often results in a lower interest rate. Putting down 20% or more can help you secure better rates.</p>

      <h2>Loan Term Length</h2>
      <p>15-year mortgages typically have lower rates than 30-year mortgages, but higher monthly payments. Choose based on your financial situation and goals.</p>

      <h2>How to Get Better Rates</h2>
      <p>Improve your credit score, increase your down payment, reduce debt, shop with multiple lenders, and lock in your rate at the right time.</p>

      <h2>Points and Costs</h2>
      <p>Mortgage points are fees you can pay upfront to lower your interest rate. Understand the tradeoff between upfront costs and long-term savings.</p>

      <h2>Conclusion</h2>
      <p>Understanding mortgage rates and factors that affect them empowers you to make better financial decisions when borrowing for a home purchase.</p>
    `,
    tags: ['Mortgage', 'Interest Rates', 'Financing', 'Loan Terms'],
  },
  'investment-properties-guide': {
    id: 6,
    slug: 'investment-properties-guide',
    title: 'Investment Properties: A Guide for Real Estate Investors',
    excerpt: 'How to identify, evaluate, and manage investment properties.',
    category: 'Investing',
    author: 'Robert Wilson',
    date: '2025-12-08',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
    content: `
      <h2>Why Real Estate Investment?</h2>
      <p>Real estate offers tangible assets, potential cash flow, tax benefits, and wealth building opportunities. It's one of the most accessible ways to build long-term wealth.</p>

      <h2>Types of Investment Properties</h2>
      <p>Single-family homes, multi-family apartments, commercial properties, and retail spaces all offer different risk and return profiles.</p>

      <h2>Residential vs. Commercial</h2>
      <p>Residential properties are easier to finance and manage, while commercial properties often offer higher returns. Choose based on your expertise and goals.</p>

      <h2>Analyzing Investment Properties</h2>
      <p>Key metrics include cap rate, cash-on-cash return, ROI, and gross rent multiplier. These help you evaluate whether a property is a good investment.</p>

      <h2>Location Matters</h2>
      <p>Real estate success starts with location. Look for areas with strong job growth, quality schools, good infrastructure, and population growth.</p>

      <h2>Financing Investment Properties</h2>
      <p>Investment property financing differs from owner-occupied mortgages. You'll need a larger down payment and higher credit score for investment properties.</p>

      <h2>Property Management</h2>
      <p>Effective management is crucial for profitability. Decide whether to self-manage or hire a professional property manager.</p>

      <h2>Tax Benefits</h2>
      <p>Investment properties offer deductions for mortgage interest, property taxes, depreciation, repairs, and management fees. Consult a tax professional to maximize benefits.</p>

      <h2>Risks to Consider</h2>
      <p>Vacancy rates, market downturns, maintenance costs, and tenant issues are risks. Proper due diligence and reserves help mitigate these.</p>

      <h2>Building Your Portfolio</h2>
      <p>Start with one property, learn the ropes, then scale. Diversification across property types and locations reduces risk.</p>

      <h2>Conclusion</h2>
      <p>Real estate investment requires research, analysis, and patience, but can provide significant returns for those who approach it strategically.</p>
    `,
    tags: ['Real Estate Investment', 'Rental Properties', 'ROI', 'Financing'],
  },
  'neighborhood-guide-finding-perfect-area': {
    id: 7,
    slug: 'neighborhood-guide-finding-perfect-area',
    title: 'Neighborhood Guide: Finding the Perfect Area for Your Lifestyle',
    excerpt: 'How to research neighborhoods and find your ideal location.',
    category: 'Buying',
    author: 'Amanda White',
    date: '2025-12-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1564014686981-028dd146e6e4?w=1200&h=600&fit=crop',
    content: `
      <h2>Neighborhood Research Matters</h2>
      <p>Where you live is just as important as what you live in. A great house in the wrong neighborhood can diminish your quality of life and investment returns.</p>

      <h2>Evaluate School Quality</h2>
      <p>Even if you don't have school-age children, good schools support property values. Research school ratings, test scores, and graduation rates.</p>

      <h2>Check Crime Statistics</h2>
      <p>Safety is paramount. Research crime statistics, speak with current residents, and visit neighborhoods at different times of day.</p>

      <h2>Commute Times and Transportation</h2>
      <p>Consider your commute to work and access to transportation. A shorter commute improves quality of life significantly.</p>

      <h2>Amenities and Recreation</h2>
      <p>Look for parks, gyms, libraries, restaurants, and entertainment options. Good amenities contribute to lifestyle satisfaction and property values.</p>

      <h2>Community Culture</h2>
      <p>Neighborhoods have personalities. Visit at different times, attend community events, and talk to residents to understand the community culture.</p>

      <h2>Property Values and Trends</h2>
      <p>Research historical home prices and trends. Are values rising or declining? Understanding trends helps you make smart investment decisions.</p>

      <h2>Future Development Plans</h2>
      <p>Check municipal planning for future development. New infrastructure can increase values, while undesirable development can decrease them.</p>

      <h2>Proximity to Services</h2>
      <p>Medical facilities, shopping, banking, and other services should be conveniently located. Consider how accessible these services are.</p>

      <h2>Making Your Decision</h2>
      <p>Create a checklist of important factors and score neighborhoods. This objective approach helps you compare options fairly.</p>

      <h2>Conclusion</h2>
      <p>Take time to research neighborhoods thoroughly. The neighborhood you choose will impact your daily life and long-term investment returns.</p>
    `,
    tags: ['Neighborhood', 'Community', 'Location', 'Home Buying'],
  },
  'home-inspection-what-to-expect': {
    id: 8,
    slug: 'home-inspection-what-to-expect',
    title: 'Home Inspection: What to Expect and What to Look For',
    excerpt: 'A complete guide to understanding the home inspection process.',
    category: 'Buying',
    author: 'Kevin Anderson',
    date: '2025-12-02',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    content: `
      <h2>Why Home Inspections Matter</h2>
      <p>A home inspection is a critical step in the buying process. It provides an independent assessment of the property's condition and identifies potential issues.</p>

      <h2>What Inspectors Examine</h2>
      <p>Professional inspectors evaluate the roof, foundation, plumbing, electrical systems, HVAC, appliances, windows, doors, and interior/exterior conditions.</p>

      <h2>Duration of Inspection</h2>
      <p>A typical home inspection takes 2-3 hours for a single-family home. You should attend and ask questions as the inspector works.</p>

      <h2>The Inspection Report</h2>
      <p>The report details all findings, categorizing issues by severity. It includes photos and recommendations for repairs or further evaluation.</p>

      <h2>Major Issues vs. Minor Issues</h2>
      <p>Major issues affect safety or structural integrity. Minor issues are cosmetic or maintenance-related. Prioritize major issues in negotiations.</p>

      <h2>Common Problems Found</h2>
      <p>Roofing issues, outdated electrical systems, plumbing leaks, foundation cracks, and HVAC problems are commonly found during inspections.</p>

      <h2>Using Inspection Results</h2>
      <p>Use the inspection to negotiate repairs, price reductions, or credits at closing. Prioritize health and safety issues over cosmetic concerns.</p>

      <h2>Secondary Inspections</h2>
      <p>If major issues are found, you may want specialized inspections for the roof, foundation, termites, or other specific concerns.</p>

      <h2>Inspection Contingency</h2>
      <p>Most purchase agreements include an inspection contingency allowing you to renegotiate or withdraw if major issues are found.</p>

      <h2>Understanding Costs</h2>
      <p>Home inspections typically cost $300-$500. This investment can save thousands by revealing problems before purchase.</p>

      <h2>Conclusion</h2>
      <p>A thorough home inspection is essential due diligence when buying a property. Use the results to make informed decisions about your purchase.</p>
    `,
    tags: ['Home Inspection', 'Buying Process', 'Property Issues', 'Due Diligence'],
  },
};

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const blog = blogDatabase[slug];

  // Generate author initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!blog) {
    return (
      <div>
        <Header />
        <main className={styles.notFound}>
          <div className={styles.container}>
            <h1>Article Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className={styles.blogDetail}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
            <div className={styles.heroContent}>
              <div className={styles.categoryBadge}>{blog.category}</div>
              <h1 className={styles.title}>{blog.title}</h1>
              <div className={styles.meta}>
                <span className={styles.author}>By {blog.author}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.date}>
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className={styles.separator}>•</span>
                <span className={styles.readTime}>{blog.readTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className={styles.imageSection}>
          <div className={styles.featuredImage}>
            <img src={blog.image} alt={blog.title} />
          </div>
        </section>

        {/* Article Content */}
        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.contentWrapper}>
              <article className={styles.article} dangerouslySetInnerHTML={{ __html: blog.content }} />

              {/* Sidebar */}
              <aside className={styles.sidebar}>
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className={styles.tagsWidget}>
                    <h3>Tags</h3>
                    <div className={styles.tagsList}>
                      {blog.tags.map(tag => (
                        <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}>
                          <span className={styles.tag}>{tag}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Author */}
                <div className={styles.authorWidget}>
                  <h3>About the Author</h3>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>{getInitials(blog.author)}</div>
                    <div className={styles.authorDetails}>
                      <p className={styles.authorName}>{blog.author}</p>
                      <p className={styles.authorBio}>Real estate expert with years of industry experience sharing valuable insights with readers.</p>
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className={styles.newsletterWidget}>
                  <h3>Subscribe to Our Blog</h3>
                  <p>Get the latest articles delivered to your inbox.</p>
                  <div className={styles.newsletterForm}>
                    <input type="email" placeholder="Your email" />
                    <button>Subscribe</button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {Object.values(blogDatabase)
                .filter(b => b.slug !== slug && b.category === blog.category)
                .slice(0, 3)
                .map(relatedBlog => (
                  <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                    <div className={styles.relatedCard}>
                      <div className={styles.relatedImage}>
                        <img src={relatedBlog.image} alt={relatedBlog.title} />
                      </div>
                      <h3>{relatedBlog.title}</h3>
                      <p>{relatedBlog.excerpt}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
