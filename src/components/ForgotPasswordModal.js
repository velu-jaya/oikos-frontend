'use client';

import { useState } from 'react';
import styles from './ForgotPasswordModal.module.css';
import { useAuth } from '../context/AuthContext';

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const { error } = await resetPassword(email);
            if (error) throw error;
            setMessage('Password reset link has been sent to your email.');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✕</button>

                <h2 className={styles.title}>Reset Password</h2>
                <p className={styles.subtitle}>Enter your email to receive a reset link.</p>

                {message ? (
                    <div className={styles.successMessage}>
                        <p>{message}</p>
                        <button className={styles.closeBtn} onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.formGroup}>
                            <label htmlFor="reset-email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="reset-email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
