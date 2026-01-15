'use client';

import { useState, useEffect } from 'react';
import styles from './RegisterModal.module.css';
import Plans from "./Plans";
import { useAuth } from '../context/AuthContext';

export default function RegisterModal({ isOpen, onClose }) {
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1); // 1: basic info, 2: user type, 3: success (Supabase handles verification via email link)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const validateStep1 = () => {
    if (!fullName.trim()) {
      setError('Full name is required.');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!agreeToTerms) {
      setError('You must agree to the Terms and Conditions.');
      return false;
    }
    return true;
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setError('');

    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!phoneNumber.trim()) {
        setError('Phone number is required.');
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await signUp(email, password, {
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
            user_type: userType,
          },
        });

        if (error) throw error;

        // Check for existing user (Supabase returns user with empty identities if exists and confirmation is active)
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          throw new Error("This email is already registered. Please log in instead.");
        }

        // If successful, move to success step (which asks user to check email)
        setCurrentStep(3);
      } catch (err) {
        if (err.message.includes("User already registered") || err.message.includes("unique constraint")) {
          setError("This email is already registered. Please log in instead.");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Removed handleVerifyCode and handleResendCode as Supabase sends a verification link by default

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend code.');
      }

      setError('');
      alert('Verification code sent to ' + email);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    // Reset and close modal
    setCurrentStep(1);
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setUserType('buyer');
    setVerificationCode('');
    setAgreeToTerms(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Progress Steps */}
        <div className={styles.progressContainer}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${step === currentStep ? styles.active : ''
                } ${step < currentStep ? styles.completed : ''}`}
            >
              <div className={styles.stepCircle}>
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <>
            <h2 className={styles.title}>Create Your Account</h2>
            <p className={styles.subtitle}>Join Qilo and find your perfect property</p>

            <form onSubmit={handleNextStep} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className={styles.input}
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={styles.input}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={styles.input}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className={styles.termsWrapper}>
                <label htmlFor="terms" className={styles.termsLabel}>
                  <input
                    type="checkbox"
                    id="terms"
                    className={styles.termsCheckbox}
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span>
                    I agree to Qilo's{' '}
                    <a href="/terms-and-policy" className={styles.termsLink} target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a href="/terms-and-policy" className={styles.termsLink} target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Next'}
              </button>
            </form>
          </>
        )}

        {/* Step 2: User Type & Phone */}
        {currentStep === 2 && (
          <>
            <h2 className={styles.title}>Tell Us About You</h2>
            <p className={styles.subtitle}>Help us personalize your experience</p>

            <form onSubmit={handleNextStep} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.formGroup}>
                <label className={styles.label}>I am a</label>
                <div className={styles.userTypeGrid}>
                  {[
                    { value: 'buyer', label: 'Buyer', icon: 'fa-home' },
                    { value: 'seller', label: 'Seller', icon: 'fa-clipboard' },
                    { value: 'expert', label: 'Expert', icon: 'fa-briefcase' },
                    { value: 'vendor', label: 'Vendor', icon: 'fa-tools' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`${styles.userTypeButton} ${userType === type.value ? styles.selected : ''
                        }`}
                      onClick={() => setUserType(type.value)}
                      disabled={isLoading}
                    >
                      <i className={`fa-solid ${type.icon} ${styles.typeIcon}`}></i>
                      <div className={styles.typeLabel}>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className={styles.input}
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setCurrentStep(1)}
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </>
        )}


        {/* Step 3: Success / Check Email */}
        {currentStep === 3 && (
          <>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.title}>Welcome to Qilo!</h2>
              <p className={styles.subtitle}>
                We've sent a verification link to <strong>{email}</strong>.
              </p>
              <p className={styles.successMessage}>
                Please check your email and click the link to verify your account. Once verified, you can log in.
              </p>
              <Plans keyValue={`${userType}s`} />
            </div>

            <button
              className={styles.submitButton}
              onClick={handleFinish}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
