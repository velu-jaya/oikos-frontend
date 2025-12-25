'use client';

import { useState, useEffect } from 'react';
import styles from './VendorRegistrationModal.module.css';

export default function VendorRegistrationModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: basic info, 2: subscription
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    mobileNumber: '',
    name: '',
    vendorType: '',
    city: '',
    otp: '',
  });

  const [selectedPlan, setSelectedPlan] = useState('monthly');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const vendorTypes = [
    'Electrician',
    'Plumber',
    'Painter',
    'Carpenter',
    'Interior Designer',
    'Other',
  ];

  const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Other',
  ];

  const indianCities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'Fort Worth',
    'Columbus',
    'Charlotte',
    'San Francisco',
    'Indianapolis',
    'Seattle',
    'Denver',
    'Boston',
    'Miami',
    'Atlanta',
    'Portland',
    'Las Vegas',
    'Washington DC',
    'Nashville',
    'Detroit',
    'New Orleans',
    'Other',
  ];

  const subscriptionPlans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 29,
      period: '/month',
      savings: null,
      description: 'Start building your pipeline with flexible billing.',
      features: [
        'Marketplace profile with service portfolio',
        'Lead notifications routed to your inbox and CRM',
        'Access to collaboration tools with agents & clients',
      ],
      cta: 'Subscribe Monthly',
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 299,
      period: '/year',
      savings: 'Save 14%',
      description: 'Discounted plan for partners ready to scale with Oikos.',
      features: [
        'Everything in Monthly, plus spotlight placement',
        'Quarterly performance insights and benchmarks',
        'Co-marketing opportunities with the Oikos network',
      ],
      cta: 'Subscribe Annual',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePhoneNumber = (phone) => {
    // Simple validation for 10-digit US phone numbers
    return /^\d{10}$/.test(phone.replace(/\D/g, ''));
  };

  const handleSendOTP = async () => {
    setError('');

    if (!formData.mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return;
    }

    if (!validatePhoneNumber(formData.mobileNumber)) {
      setError('Please enter a valid 10-digit US phone number.');
      return;
    }

    setIsLoadingOTP(true);
    try {
      // TODO: Replace with actual OTP API endpoint
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formData.mobileNumber })
      });

      if (response.ok) {
        setOtpSent(true);
        setSuccessMessage('OTP sent to your mobile number!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      // Demo mode: auto-verify OTP
      setOtpSent(true);
      setSuccessMessage('OTP sent successfully! (Demo mode)');
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');

    if (!formData.otp.trim()) {
      setError('Please enter the OTP.');
      return;
    }

    if (formData.otp.length !== 6) {
      setError('OTP must be 6 digits.');
      return;
    }

    setIsLoadingOTP(true);
    try {
      // TODO: Replace with actual OTP verification API
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.mobileNumber,
          otp: formData.otp
        })
      });

      if (response.ok) {
        setSuccessMessage('Phone number verified!');
        setTimeout(() => {
          // Move to subscription step
          setCurrentStep(2);
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      // Demo mode: accept any 6-digit code
      if (/^\d{6}$/.test(formData.otp)) {
        setSuccessMessage('Phone number verified! (Demo mode)');
        setTimeout(() => {
          setCurrentStep(2);
        }, 1000);
      } else {
        setError('Please enter a valid 6-digit OTP.');
      }
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const validateStep1 = () => {
    setError('');

    if (!formData.mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return false;
    }

    if (!validatePhoneNumber(formData.mobileNumber)) {
      setError('Please enter a valid 10-digit US phone number.');
      return false;
    }

    if (!otpSent) {
      setError('Please send OTP first.');
      return false;
    }

    if (!formData.otp.trim()) {
      setError('Please enter the OTP.');
      return false;
    }

    if (formData.otp.length !== 6) {
      setError('OTP must be 6 digits.');
      return false;
    }

    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return false;
    }

    if (!formData.vendorType) {
      setError('Please select your vendor type.');
      return false;
    }

    if (!formData.city) {
      setError('Please select your state.');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubscribe = async (planId) => {
    setError('');

    try {
      // TODO: Replace with actual subscription API endpoint
      const response = await fetch('/api/vendor/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.mobileNumber,
          name: formData.name,
          vendorType: formData.vendorType,
          city: formData.city,
          plan: planId,
        })
      });

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to your dashboard...');
        setTimeout(() => {
          resetForm();
          onClose();
          // TODO: Redirect to vendor dashboard or payment page
        }, 2000);
      } else {
        setError('Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      mobileNumber: '',
      name: '',
      vendorType: '',
      city: '',
      otp: '',
    });
    setOtpSent(false);
    setCurrentStep(1);
    setError('');
    setSelectedPlan('monthly');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className={styles.stepContainer}>
            <div className={styles.stepHeader}>
              <h2>Join as Vendor</h2>
              <p>Complete your registration to start receiving leads</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

            <form className={styles.formContainer}>
              {/* Mobile Number with OTP */}
              <div className={styles.formGroup}>
                <label htmlFor="mobileNumber">Mobile Number *</label>
                <div className={styles.mobileOtpContainer}>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit phone number"
                    disabled={otpSent}
                    maxLength="10"
                  />
                  <button
                    type="button"
                    className={styles.otpButton}
                    onClick={handleSendOTP}
                    disabled={isLoadingOTP || !formData.mobileNumber.trim() || otpSent}
                  >
                    {isLoadingOTP ? 'Sending...' : otpSent ? 'OTP Sent' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className={styles.formGroup}>
                  <label htmlFor="otp">Enter OTP *</label>
                  <div className={styles.otpInputContainer}>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleInputChange}
                      placeholder="6-digit OTP"
                      maxLength="6"
                    />
                    <button
                      type="button"
                      className={styles.verifyButton}
                      onClick={handleVerifyOTP}
                      disabled={isLoadingOTP || formData.otp.length !== 6}
                    >
                      {isLoadingOTP ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>
              )}

              {/* Name */}
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>

              {/* Vendor Type */}
              <div className={styles.formGroup}>
                <label htmlFor="vendorType">Vendor Type *</label>
                <select
                  id="vendorType"
                  name="vendorType"
                  value={formData.vendorType}
                  onChange={handleInputChange}
                >
                  <option value="">Select your service type</option>
                  {vendorTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className={styles.formGroup}>
                <label htmlFor="city">State *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select your state</option>
                  {usStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Continue Button */}
              <button
                type="button"
                className={styles.continueButton}
                onClick={handleContinue}
                disabled={!otpSent || isLoadingOTP}
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Subscription Plans */}
        {currentStep === 2 && (
          <div className={styles.stepContainer}>
            <div className={styles.stepHeader}>
              <h2>Choose Your Plan</h2>
              <p>Select a subscription plan that fits your needs</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.plansContainer}>
              {subscriptionPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`${styles.planCard} ${selectedPlan === plan.id ? styles.selected : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.savings && (
                    <div className={styles.savingsBadge}>{plan.savings}</div>
                  )}

                  <h3>{plan.name}</h3>

                  <div className={styles.priceContainer}>
                    <div className={styles.price}>
                      <span className={styles.currencySymbol}>$</span>
                      <span className={styles.amount}>{plan.price}</span>
                      <span className={styles.period}>{plan.period}</span>
                    </div>
                  </div>

                  <p className={styles.planDescription}>{plan.description}</p>

                  <ul className={styles.featuresList}>
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check-circle"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`${styles.selectButton} ${selectedPlan === plan.id ? styles.active : ''}`}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Subscribe Now' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.backButton}
              onClick={() => setCurrentStep(1)}
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
