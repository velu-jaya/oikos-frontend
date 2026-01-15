'use client';
import styles from './UpgradeModal.module.css';

export default function UpgradeModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✕</button>

                <div className={styles.iconContainer}>
                    <i className="fas fa-crown"></i>
                </div>

                <h2>Unlock Premium Access</h2>
                <p>To view unlimited properties and access exclusive listings, please upgrade your account.</p>

                <div className={styles.benefits}>
                    <div className={styles.benefit}>
                        <i className="fas fa-check"></i>
                        <span>Unlimited Property Views</span>
                    </div>
                    <div className={styles.benefit}>
                        <i className="fas fa-check"></i>
                        <span>Direct Seller Contact</span>
                    </div>
                    <div className={styles.benefit}>
                        <i className="fas fa-check"></i>
                        <span>Early Access to New Listings</span>
                    </div>
                </div>

                <button className={styles.upgradeButton}>
                    Upgrade to Premium
                </button>
            </div>
        </div>
    );
}
