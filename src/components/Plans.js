import styles from "../app/page.module.css";

export default function Plans() {
  const planCategories = [
    {
      key: "buyers",
      title: "Buyers",
      description:
        "Gain confidence from your first search through a supported close.",
      cta: "Join as a Buyer",
      theme: "planCategoryBuyers",
      options: [
        {
          name: "Monthly",
          billing: "/month",
          price: "$49",
          caption: "Flexible access while you explore the market.",
          features: [
            "Unlimited marketplace browsing & saved searches",
            "Buyer workspace to manage offers and timelines",
            "Direct messaging with sellers and Qilo Advisors",
          ],
        },
        {
          name: "Annual",
          billing: "/year",
          price: "$499",
          caption: "Cheaper overall for buyers who stay active year-round.",
          badge: "Best value",
          highlight: true,
          features: [
            "Everything in Monthly, plus concierge onboarding",
            "Annual strategy review with an Qilo Advisor",
            "Priority access to off-market opportunities",
          ],
        },
        {
          name: "Transaction Access",
          billing: "one-time",
          price: "$499",
          caption:
            "Ideal when you need support for a single purchase or sale.",
          features: [
            "Advisor guidance from offer through close",
            "Transaction Coordinator handling documents & deadlines",
            "Post-close checklist to finalize your move",
          ],
        },
      ],
    },
    {
      key: "sellers",
      title: "Sellers",
      description: "Pick the listing package that matches your marketing goals.",
      cta: "List with Qilo",
      theme: "planCategorySellers",
      options: [
        {
          name: "Base Listing Package",
          billing: "listing fee",
          price: "$1,999",
          caption: "Launch with polished marketing and streamlined operations.",
          features: [
            "Professional photography and listing launch",
            "MLS distribution with intelligent lead routing",
            "Dedicated Transaction Coordinator support",
          ],
        },
        {
          name: "Premium Listing Package",
          billing: "listing fee",
          price: "$2,499",
          caption: "Maximize exposure with elevated marketing and strategy.",
          badge: "Most popular",
          highlight: true,
          features: [
            "Everything in Base plus tailored marketing campaigns",
            "Featured placement across qualified buyer channels",
            "Pricing strategy and offer negotiation workshops",
          ],
        },
      ],
    },
    {
      key: "vendors",
      title: "Vendors",
      description: "Join the marketplace and connect with motivated clients.",
      cta: "Become a Vendor",
      theme: "planCategoryVendors",
      options: [
        {
          name: "Monthly",
          billing: "/month",
          price: "$29",
          caption: "Start building your pipeline with flexible billing.",
          features: [
            "Marketplace profile with service portfolio",
            "Lead notifications routed to your inbox and CRM",
            "Access to collaboration tools with agents & clients",
          ],
        },
        {
          name: "Annual",
          billing: "/year",
          price: "$299",
          caption: "Discounted plan for partners ready to scale with Qilo.",
          badge: "Save 14%",
          highlight: true,
          features: [
            "Everything in Monthly, plus spotlight placement",
            "Quarterly performance insights and benchmarks",
            "Co-marketing opportunities with the Qilo network",
          ],
        },
      ],
    },
  ];

  return (
    <section id="plans" className={styles.plansSection}>
      <div className={styles.plansInner}>
        <div className={styles.plansHeader}>
          <span className={styles.sectionEyebrow}>Pricing</span>
          <h2>Plans tailored to every step of the transaction</h2>
          <p>
            Buyers, sellers, and vendors get dedicated tools, transparent pricing,
            and hands-on support from the Qilo team.
          </p>
        </div>

        <div className={styles.planCategoryGrid}>
          {planCategories.map((category) => (
            <article
              key={category.key}
              className={`${styles.planCategoryCard} ${styles[category.theme]}`}
            >
              <header className={styles.planCategoryHeader}>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </header>

              <div className={styles.planOptions}>
                {category.options.map((option) => (
                  <div
                    key={option.name}
                    className={`${styles.planOption} ${
                      option.highlight ? styles.planOptionHighlight : ""
                    }`}
                  >
                    <div className={styles.planOptionHeader}>
                      <div className={styles.planOptionTitle}>
                        <h4>{option.name}</h4>
                        {option.badge ? (
                          <span className={styles.planOptionBadge}>
                            {option.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className={styles.planOptionPriceBlock}>
                        <span className={styles.planPrice}>
                          <strong>{option.price}</strong>
                          {option.billing ? <span>{option.billing}</span> : null}
                        </span>
                      </div>
                    </div>
                    {option.caption ? (
                      <p className={styles.planOptionCaption}>{option.caption}</p>
                    ) : null}
                    <ul className={styles.planFeatureList}>
                      {option.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button type="button" className={styles.planCTA}>
                {category.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
