'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { getProperties } from '@/lib/api';

export default function Dashboard() {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0
    });
    const [myProperties, setMyProperties] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    // Fetch properties when user is available
    useEffect(() => {
        async function fetchData() {
            if (user && !loading) {
                try {
                    const allProperties = await getProperties();

                    // Filter properties for the current user
                    // For sellers: properties where seller_id matches user.id
                    // For buyers: (future) properties in saved list
                    const userProperties = allProperties.filter(p => p.seller_id === user.id);

                    setMyProperties(userProperties);
                    setStats({
                        total: userProperties.length,
                        active: userProperties.length, // Assuming all are active for now
                        pending: 0
                    });
                } catch (error) {
                    console.error("Failed to fetch dashboard data:", error);
                } finally {
                    setIsLoadingData(false);
                }
            }
        }

        fetchData();
    }, [user, loading]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #0066FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    if (!user) return null;

    // determine role and user data
    const userRole = user.user_metadata?.user_type || user.role || 'buyer';
    const fullName = user.user_metadata?.full_name || 'User';
    const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const phone = user.user_metadata?.phone_number || 'N/A';

    return (
        <div className={styles.dashboardPage}>
            <Header />

            <main className={styles.container}>
                <div className={styles.headerSection}>
                    <h1 className={styles.welcomeTitle}>Hello, {fullName.split(' ')[0]}! 👋</h1>
                    <p className={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className={styles.dashboardGrid}>
                    {/* Left Sidebar - Profile */}
                    <aside className={styles.profileCard}>
                        <div className={styles.profileHeader}>
                            <div className={styles.avatar}>
                                {initials}
                            </div>
                            <h2 className={styles.userName}>{fullName}</h2>
                            <span className={styles.userRole}>{userRole} Account</span>
                        </div>

                        <div className={styles.profileDetails}>
                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <span className={styles.detailLabel}>Email Address</span>
                                    <div className={styles.detailText}>{user.email}</div>
                                </div>
                            </div>

                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div>
                                    <span className={styles.detailLabel}>Phone Number</span>
                                    <div className={styles.detailText}>{phone}</div>
                                </div>
                            </div>

                            <div className={styles.detailItem}>
                                <div className={styles.detailIcon}>
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <div>
                                    <span className={styles.detailLabel}>Account Status</span>
                                    <div className={styles.detailText} style={{ color: '#00c851', fontWeight: 500 }}>Verified</div>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => signOut()} className={styles.signOutButton}>
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </aside>

                    {/* Right Content - Stats & Activities */}
                    <div className={styles.mainContent}>
                        {/* Stats Row */}
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#e3f2fd', color: '#0066FF' }}>
                                    <i className={userRole === 'seller' ? "fas fa-home" : "fas fa-heart"}></i>
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>{stats.total}</h3>
                                    <p>{userRole === 'seller' ? 'Active Listings' : 'Saved Properties'}</p>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#e8f5e9', color: '#00c851' }}>
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>0</h3>
                                    <p>New Messages</p>
                                </div>
                            </div>

                            <div className={styles.statCard}>
                                <div className={styles.statIcon} style={{ background: '#fff3e0', color: '#ff9800' }}>
                                    <i className="fas fa-eye"></i>
                                </div>
                                <div className={styles.statInfo}>
                                    <h3>0</h3>
                                    <p>{userRole === 'seller' ? 'Total Views' : 'Recently Viewed'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Block */}
                        <div className={styles.contentSection}>
                            <div className={styles.sectionHeader}>
                                <h2>{userRole === 'seller' ? 'My Properties' : 'Saved Properties'}</h2>
                                {userRole === 'seller' ? (
                                    <Link href="/seller" className={styles.actionButton}>
                                        <i className="fas fa-plus"></i> List New Property
                                    </Link>
                                ) : (
                                    <Link href="/buyer" className={styles.actionButton}>
                                        <i className="fas fa-search"></i> Browse Properties
                                    </Link>
                                )}
                            </div>

                            {isLoadingData ? (
                                <p style={{ textAlign: 'center', padding: '2rem' }}>Loading properties...</p>
                            ) : myProperties.length > 0 ? (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {myProperties.map(property => (
                                        <div key={property.id} style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            padding: '1rem',
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                background: '#f0f0f0',
                                                borderRadius: '8px',
                                                overflow: 'hidden'
                                            }}>
                                                {property.images && property.images.length > 0 ? (
                                                    <img
                                                        src={property.images[0].startsWith('http') ? property.images[0] : `https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=150&q=80`}
                                                        alt={property.title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                                        <i className="fas fa-image"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{property.title}</h3>
                                                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{property.city}, {property.state}</p>
                                                <p style={{ margin: '0.25rem 0 0 0', fontWeight: 'bold', color: '#0066FF' }}>{property.price}</p>
                                            </div>
                                            <Link href={`/property/${property.id}`} style={{
                                                padding: '0.5rem 1rem',
                                                border: '1px solid #ddd',
                                                borderRadius: '6px',
                                                color: '#666',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem'
                                            }}>
                                                View
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>
                                        <i className={userRole === 'seller' ? "fas fa-home" : "fas fa-folder-open"}></i>
                                    </div>
                                    <h3>{userRole === 'seller' ? 'No active listings' : 'No saved properties'}</h3>
                                    <p>
                                        {userRole === 'seller'
                                            ? "You haven't listed any properties yet. Start your journey today!"
                                            : "You haven't saved any properties yet. Browse our marketplace to find your dream home."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
