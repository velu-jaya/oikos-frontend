'use client';

import { useState } from 'react';
import styles from './ClosingCreditCalculator.module.css';

export default function ClosingCreditCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [calculated, setCalculated] = useState(false);

  // Calculation constants
  const BUYER_AGENT_COMMISSION_RATE = 0.025; // 2.5%
  const QILO_FEE_RATE = 0.0075; // 0.75%
  const CLOSING_CREDIT_RATE = 0.0175; // ~1.75%
  const SELLER_AGENT_COMMISSION_RATE = 0.025; // 2.5% (assumed)
  const CLOSING_COSTS_RATE = 0.03; // 3% (estimated)

  const calculate = () => {
    setCalculated(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (rate) => {
    return (rate * 100).toFixed(2);
  };

  const buyerAgentCommission = purchasePrice * BUYER_AGENT_COMMISSION_RATE;
  const qiloFee = purchasePrice * QILO_FEE_RATE;
  const closingCredit = purchasePrice * CLOSING_CREDIT_RATE;
  const sellerAgentCommission = purchasePrice * SELLER_AGENT_COMMISSION_RATE;
  const closingCosts = purchasePrice * CLOSING_COSTS_RATE;
  const amountToSeller = purchasePrice - sellerAgentCommission - closingCosts;
  const sellerPercentage = (amountToSeller / purchasePrice) * 100;

  // Donut chart calculations
  const traditionalTotal = buyerAgentCommission + sellerAgentCommission + closingCosts;
  const qiloTotal = closingCredit + qiloFee + sellerAgentCommission + closingCosts;

  const traditionalBuyerAgentPercent = (buyerAgentCommission / traditionalTotal) * 100;
  const traditionalSellerAgentPercent = (sellerAgentCommission / traditionalTotal) * 100;
  const traditionalClosingCostsPercent = (closingCosts / traditionalTotal) * 100;

  const qiloClosingCreditPercent = (closingCredit / qiloTotal) * 100;
  const qiloFeePercent = (qiloFee / qiloTotal) * 100;
  const qiloSellerAgentPercent = (sellerAgentCommission / qiloTotal) * 100;
  const qiloClosingCostsPercent = (closingCosts / qiloTotal) * 100;

  return (
    <section className={styles.calculatorSection}>
      <div className={styles.calculatorContainer}>
        {/* Calculate Your Closing Credit Section */}
        <div className={styles.calculateSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <span className={styles.calculatorIcon}>🧮</span>
              <h2>Calculate Your Closing Credit</h2>
            </div>
            <p className={styles.subtitle}>See how much money you'll receive back at closing</p>
          </div>

          <div className={styles.inputSection}>
            <label htmlFor="purchasePrice" className={styles.inputLabel}>
              Home Purchase Price
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.dollarSign}>$</span>
              <input
                id="purchasePrice"
                type="number"
                value={purchasePrice}
                onChange={(e) => {
                  setPurchasePrice(Number(e.target.value));
                  setCalculated(false);
                }}
                className={styles.priceInput}
                placeholder="1,500,000"
              />
            </div>
            <button onClick={calculate} className={styles.calculateButton}>
              Calculate My Closing Credit
            </button>
          </div>
        </div>

        {/* Results Section */}
        {calculated && (
          <>
            <div className={styles.resultSection}>
              <div className={styles.mainResult}>
                <h3>Your Closing Credit: {formatCurrency(closingCredit)}</h3>
                <p className={styles.resultSubtitle}>
                  That's approximately {formatPercentage(CLOSING_CREDIT_RATE)}% back to you!*
                </p>
              </div>
            </div>

            {/* Comparison Section */}
            <div className={styles.comparisonSection}>
              <div className={styles.comparisonColumn}>
                <div className={styles.comparisonHeader}>
                  <h3>Traditional Way <span className={styles.emoji}>😞</span></h3>
                  <p>Full buyer's agent commission goes to the agent</p>
                </div>
                <div className={styles.donutChart}>
                  <svg viewBox="0 0 200 200" className={styles.chartSvg}>
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="40"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#d32f2f"
                      strokeWidth="40"
                      strokeDasharray={`${traditionalBuyerAgentPercent * 5.026} 502.6`}
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#b71c1c"
                      strokeWidth="40"
                      strokeDasharray={`${traditionalSellerAgentPercent * 5.026} 502.6`}
                      strokeDashoffset={`-${traditionalBuyerAgentPercent * 5.026}`}
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4db6ac"
                      strokeWidth="40"
                      strokeDasharray={`${traditionalClosingCostsPercent * 5.026} 502.6`}
                      strokeDashoffset={`-${(traditionalBuyerAgentPercent + traditionalSellerAgentPercent) * 5.026}`}
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className={styles.chartLabels}>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#d32f2f' }}></span>
                      Buyer's Agent
                    </div>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#b71c1c' }}></span>
                      Seller's Agent
                    </div>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#4db6ac' }}></span>
                      Closing Costs
                    </div>
                  </div>
                </div>
                <div className={styles.summaryBox} style={{ background: '#ffe0e0' }}>
                  <div className={styles.summaryItem}>
                    <strong>Agent Keeps: {formatCurrency(buyerAgentCommission)}</strong>
                  </div>
                  <div className={styles.summaryItem}>Your money, their pocket</div>
                  <div className={styles.summaryItem}>
                    Amount to Seller: {formatCurrency(amountToSeller)} ({sellerPercentage.toFixed(1)}%)
                  </div>
                </div>
              </div>

              <div className={styles.comparisonColumn}>
                <div className={styles.comparisonHeader}>
                  <h3>The Qilo Way <span className={styles.emoji}>💰</span></h3>
                  <p>Most of the commission returns to you</p>
                </div>
                <div className={styles.donutChart}>
                  <svg viewBox="0 0 200 200" className={styles.chartSvg}>
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="40"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="40"
                      strokeDasharray={`${qiloClosingCreditPercent * 5.026} 502.6`}
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#616161"
                      strokeWidth="40"
                      strokeDasharray={`${qiloFeePercent * 5.026} 502.6`}
                      strokeDashoffset={`-${qiloClosingCreditPercent * 5.026}`}
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#b71c1c"
                      strokeWidth="40"
                      strokeDasharray={`${qiloSellerAgentPercent * 5.026} 502.6`}
                      strokeDashoffset={`-${(qiloClosingCreditPercent + qiloFeePercent) * 5.026}`}
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4db6ac"
                      strokeWidth="40"
                      strokeDasharray={`${qiloClosingCostsPercent * 5.026} 502.6`}
                      strokeDashoffset={`-${(qiloClosingCreditPercent + qiloFeePercent + qiloSellerAgentPercent) * 5.026}`}
                      transform="rotate(-90 100 100)"
                    />
                  </svg>
                  <div className={styles.chartLabels}>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#4caf50' }}></span>
                      Your Closing Credit
                    </div>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#616161' }}></span>
                      Qilo Fee
                    </div>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#b71c1c' }}></span>
                      Seller's Agent
                    </div>
                    <div className={styles.chartLabel}>
                      <span className={styles.labelColor} style={{ background: '#4db6ac' }}></span>
                      Closing Costs
                    </div>
                  </div>
                </div>
                <div className={styles.summaryBox} style={{ background: '#e0f2e0' }}>
                  <div className={styles.summaryItem}>
                    <strong>You Receive: {formatCurrency(closingCredit)}</strong>
                  </div>
                  <div className={styles.summaryItem}>Closing credit back to your account*</div>
                  <div className={styles.summaryItem}>
                    Amount to Seller: {formatCurrency(amountToSeller)} ({sellerPercentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Money Flow Breakdown */}
            <div className={styles.breakdownSection}>
              <h3 className={styles.breakdownTitle}>Money Flow Breakdown</h3>
              <div className={styles.breakdownCards}>
                <div className={styles.breakdownCard}>
                  <div className={styles.breakdownAmount}>{formatCurrency(buyerAgentCommission)}</div>
                  <div className={styles.breakdownLabel}>(Typically 2.5%)</div>
                  <div className={styles.breakdownTitle}>Buyer's Agent Commission</div>
                </div>
                <div className={styles.breakdownCard}>
                  <div className={styles.breakdownAmount}>{formatCurrency(qiloFee)}</div>
                  <div className={styles.breakdownLabel}>(0.75% fee)</div>
                  <div className={styles.breakdownTitle}>Qilo Keeps</div>
                </div>
                <div className={styles.breakdownCard}>
                  <div className={styles.breakdownAmount} style={{ color: '#4caf50' }}>
                    {formatCurrency(closingCredit)}
                  </div>
                  <div className={styles.breakdownLabel}>(~{formatPercentage(CLOSING_CREDIT_RATE)}% back)*</div>
                  <div className={styles.breakdownTitle}>You Receive</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

