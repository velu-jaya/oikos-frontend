'use client';

import { useState, useEffect } from 'react';
import styles from './LoginModal.module.css';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!agreeToTerms) {
      setError('You must agree to the Terms and User Agreement to continue.');
      return;
    }
    
    setIsLoading(true);

    try {
      // Replace with your actual login API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please try again.');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      
      // Reset form and close modal
      setEmail('');
      setPassword('');
      setAgreeToTerms(false);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Welcome back</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          <div className={styles.forgotPasswordWrapper}>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
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
                By continuing you agree to Oikos's{' '}
                <a href="/terms" className={styles.termsLink}>
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading || !agreeToTerms}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.signupLink}>
          Don't have an account?{' '}
          <a href="#" className={styles.link}>
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}
