"use client";

import { useId, useState } from "react";
import styles from "./ChatAssistant.module.css";

const questionGroups = [
  {
    id: "buyer",
    label: "Buyer",
    description: "Quick answers for people looking to purchase.",
    questions: [
      "How can I schedule a property tour?",
      "What financing options do you support?",
      "Can I get assistance with negotiating an offer?",
      "What documents do I need to start the buying process?"
    ]
  },
  {
    id: "seller",
    label: "Seller",
    description: "Guidance for homeowners interested in selling.",
    questions: [
      "How do I request a property valuation?",
      "What marketing services do you provide for listings?",
      "How quickly can my property go live on the platform?",
      "What fees should I expect when selling with Oikos?"
    ]
  },
  {
    id: "agent",
    label: "Agent",
    description: "Support for agents handling both buying and selling.",
    questions: [
      "How do I list a property for sale?",
      "Can I help my clients find properties to buy?",
      "What tools are available for agents?",
      "How do I manage multiple transactions?"
    ]
  },
  {
    id: "vendor",
    label: "Vendor",
    description: "Information for service partners and vendors.",
    questions: [
      "How do I partner with Oikos as a vendor?",
      "What onboarding documents are required?",
      "Who is the point of contact for vendor support?",
      "How can I update my service availability?"
    ]
  }
];

const createInitialMessages = () => [
  {
    role: "assistant",
    text: "Hi there! I'm the Oikos AI concierge. Pick a quick question below or tell us how we can help."
  }
];

const acknowledgementMessage = {
  role: "assistant",
  text: "Thanks for reaching out! A member of our team will follow up shortly."
};

function AiSparkIcon({ className }) {
  const gradientId = useId();
  const glowId = `${gradientId}-glow`;

  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--chat-green, #549080)" />
          <stop offset="100%" stopColor="var(--chat-orange, #fa9c46)" />
        </linearGradient>
        <radialGradient
          id={glowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(14 14) scale(12)"
        >
          <stop offset="0%" stopColor="var(--chat-green, #549080)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--chat-orange, #fa9c46)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="14" cy="14" r="11.5" fill={`url(#${glowId})`} />
      <rect
        x="6.75"
        y="7.25"
        width="14.5"
        height="11"
        rx="5.5"
        fill="rgba(255, 255, 255, 0.96)"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
      />
      <path
        d="M9 19.4c1.22 1.36 3.02 2.22 5 2.22s3.78-.86 5-2.22"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="11.4" cy="12.5" r="1.25" fill="var(--chat-green, #549080)" />
      <circle cx="16.6" cy="12.5" r="1.25" fill="var(--chat-orange, #fa9c46)" />
      <path d="M14 7V5.25" stroke={`url(#${gradientId})`} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M21.05 10.2l1.25-.72" stroke={`url(#${gradientId})`} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6.95 10.2l-1.25-.72" stroke={`url(#${gradientId})`} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M19.7 6.65l.58-1.52" stroke={`url(#${gradientId})`} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M9.05 6.65l-.58-1.52" stroke={`url(#${gradientId})`} strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="21.25" cy="6.3" r="1.05" fill="var(--chat-orange, #fa9c46)" opacity="0.85" />
      <circle cx="6.75" cy="6.35" r="0.9" fill="var(--chat-green, #549080)" opacity="0.8" />
    </svg>
  );
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(questionGroups[0].id);
  const [messages, setMessages] = useState(createInitialMessages);

  const activeGroup = questionGroups.find((group) => group.id === activeGroupId);
  const popupId = "chat-assistant-popup";

  const resetState = () => {
    setActiveGroupId(questionGroups[0].id);
    setMessages(createInitialMessages());
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      resetState();
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  const handleSelectGroup = (groupId) => {
    setActiveGroupId(groupId);
  };

  const handleSelectQuestion = (question) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: question },
      { ...acknowledgementMessage }
    ]);
  };

  return (
    <div className={styles.widget} data-open={isOpen}>
      {isOpen && (
        <div
          id={popupId}
          className={styles.popup}
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-assistant-title"
        >
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <span className={styles.headerIconBadge} aria-hidden="true">
                <AiSparkIcon className={styles.headerIcon} />
              </span>
              <div>
                <p id="chat-assistant-title" className={styles.title}>
                  Need a hand?
                </p>
                <p className={styles.subtitle}>
                  Choose a topic to get a quick response from the team.
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close chat assistant"
            >
              ×
            </button>
          </header>

          <nav className={styles.segmentedControl} aria-label="Question categories">
            {questionGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => handleSelectGroup(group.id)}
                className={`${styles.segment} ${
                  group.id === activeGroupId ? styles.segmentActive : ""
                }`}
                aria-pressed={group.id === activeGroupId}
              >
                {group.label}
              </button>
            ))}
          </nav>

          <p className={styles.groupDescription}>{activeGroup?.description}</p>

          <div className={styles.messageList} aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`${styles.message} ${
                  message.role === "assistant"
                    ? styles.messageAssistant
                    : styles.messageUser
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className={styles.questionList}>
            {activeGroup?.questions.map((question) => (
              <button
                key={question}
                type="button"
                className={styles.questionButton}
                onClick={() => handleSelectQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <footer className={styles.footerNote}>
            Prefer to chat live? Leave your question and our team will join you
            shortly.
          </footer>
        </div>
      )}

      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-controls={popupId}
        aria-expanded={isOpen}
      >
        <i className={`fa-solid fa-wand-magic-sparkles ${styles.toggleIcon}`}></i>
      </button>
    </div>
  );
}
