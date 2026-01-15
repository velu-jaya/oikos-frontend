'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UpdatePasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Check if we have a hash fragment which Supabase uses for auth tokens
        if (!window.location.hash) {
            // If no hash, might be direct access or error
            // But we stay here to allow user to try setting password if they have a session
        }
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 3000); // Redirect after 3s
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-wrapper">
            <Header />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Update Password</h1>
                    {success ? (
                        <div className={styles.success}>
                            <p>Password updated successfully!</p>
                            <p>Redirecting to home...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdatePassword} className={styles.form}>
                            <p className={styles.description}>Enter your new password below.</p>

                            {error && <div className={styles.error}>{error}</div>}

                            <div className={styles.formGroup}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 8 characters"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.button} disabled={loading}>
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
