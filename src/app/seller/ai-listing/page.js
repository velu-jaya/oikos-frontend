'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function AIListingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: "Hello! I'm Oikos AI. I'll help you create a stunning listing. Let's build your page in real-time. First, what is the property address?"
        }
    ]);

    // Protect the route
    useEffect(() => {
        if (!loading) {
            if (!user) {
                alert("Please log in to access this feature.");
                router.push('/');
                return;
            }

            const userRole = user.user_metadata?.user_type || user.user_metadata?.role || user.role;
            if (userRole !== 'seller' && userRole !== 'expert') {
                alert("Access Restricted: Only registered Sellers or Experts can use the AI Listing Assistant.");
                router.push('/');
            }
        }
    }, [user, loading, router]);

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Real-time Listing State
    const [listingData, setListingData] = useState({
        image: null,
        address: 'Your Address Here',
        price: '$0',
        beds: '-',
        baths: '-',
        sqft: '-',
        yearBuilt: '-',
        description: 'Your property description will appear here as we chat...'
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const newMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, newMessage]);
        const currentInput = inputValue; // Capture for basic parsing logic
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response & Live Preview Updates
        setTimeout(() => {
            let aiResponseText = "";

            // Step-based Logic (Simplified for Demo)
            if (messages.length === 1) {
                // Updated Address & Fetch Image
                setListingData(prev => ({
                    ...prev,
                    address: currentInput,
                    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Standard luxury home image
                    price: "$850,000" // Estimated Price
                }));
                aiResponseText = "I've located the property! I've also pulled some public records and estimated a market value of $850,000. \n\nNow, let's verify the details. I see it listed as 4 beds and 3 baths. Is that correct? If not, please correct me.";
            }
            else if (messages.length === 3) {
                // Update Stats based on input (Basic parsing or just dummy update)
                // Check if user corrected stats
                const userText = currentInput.toLowerCase();
                let beds = "4";
                let baths = "3";
                let sqft = "2,400";

                if (userText.includes("bed")) beds = userText.match(/(\d+)\s*bed/)?.[1] || "4";
                if (userText.includes("bath")) baths = userText.match(/(\d+)\s*bath/)?.[1] || "3";

                setListingData(prev => ({
                    ...prev,
                    beds: beds,
                    baths: baths,
                    sqft: sqft,
                    yearBuilt: "2015"
                }));

                aiResponseText = `Updated! I've set it to ${beds} beds and ${baths} baths. \n\nNow for the description. What makes this home special? Mention things like "renovated kitchen", "pool", or "quiet neighborhood".`;
            }
            else if (messages.length === 5) {
                // Generate Description
                const desc = `Step into this breathtaking ${listingData.beds}-bedroom sanctuary located at ${listingData.address}. ${currentInput.charAt(0).toUpperCase() + currentInput.slice(1)}. \n\nThis home offers a perfect blend of luxury and comfort, featuring spacious living areas and modern finishes throughout. Don't miss this rare opportunity!`;

                setListingData(prev => ({
                    ...prev,
                    description: desc
                }));

                aiResponseText = "I've drafted a description highlighting those features! Look at the preview on the right. \n\nWe are almost done. Does the description look good, or should we tweak the tone?";
            }
            else {
                aiResponseText = "Great! Your listing is shaping up perfectly. Would you like to publish this draft or schedule a professional photography session?";
            }

            const aiResponse = {
                id: messages.length + 2,
                type: 'ai',
                text: aiResponseText
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Header />

            <div className={styles.splitLayout}>
                {/* Left: AI Chat Interface */}
                <div className={styles.chatPanel}>
                    <div className={styles.chatHeader}>
                        <div className={styles.chatTitle}>
                            <i className="fas fa-sparkles"></i>
                            Oikos AI
                        </div>
                        <div className={styles.chatSubtitle}>Building your listing in real-time...</div>
                    </div>

                    <div className={styles.messagesArea}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.type === 'ai' ? styles.aiMessage : styles.userMessage}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className={styles.typingIndicator}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Type here..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className={styles.sendButton} onClick={handleSendMessage}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                {/* Right: Live Preview */}
                <div className={styles.previewPanel}>
                    <div className={styles.previewBadge}>Live Preview</div>

                    <div className={styles.listingCard}>
                        <div className={styles.imagePlaceholder}>
                            {listingData.image ? (
                                <img src={listingData.image} alt="Property" className={styles.listingImage} />
                            ) : (
                                <div className={styles.placeholderContent}>
                                    <i className="fas fa-image"></i>
                                    <p>Property Image</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h1 className={styles.price}>{listingData.price}</h1>
                                    <p className={styles.address}>
                                        <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                                        {listingData.address}
                                    </p>
                                </div>
                                <span className={styles.statusTag}>Coming Soon</span>
                            </div>

                            <div className={styles.statsGrid}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{listingData.beds}</span>
                                    <span className={styles.statLabel}>Beds</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{listingData.baths}</span>
                                    <span className={styles.statLabel}>Baths</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{listingData.sqft}</span>
                                    <span className={styles.statLabel}>Sq Ft</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{listingData.yearBuilt}</span>
                                    <span className={styles.statLabel}>Year</span>
                                </div>
                            </div>

                            <div className={styles.descriptionSection}>
                                <h3>Description</h3>
                                <p className={styles.description}>{listingData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
