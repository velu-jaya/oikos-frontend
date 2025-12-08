'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.css';

export default function TestVerificationPage() {
  const { setVerificationModalOpen } = useAuth();
  const [instructions, setInstructions] = useState('');

  const generateTestIDFile = async () => {
    // Create a simple test image (1x1 pixel PNG)
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple ID card mockup
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, 200, 300);
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('GOVERNMENT ID', 20, 40);
    ctx.font = '12px Arial';
    ctx.fillText('Name: Test User', 20, 80);
    ctx.fillText('ID: 12345678', 20, 110);
    ctx.fillText('DOB: 01/01/1990', 20, 140);
    ctx.fillText('Expiry: 01/01/2030', 20, 170);
    
    // Draw a rectangle for photo area
    ctx.fillStyle = '#999';
    ctx.fillRect(20, 190, 80, 100);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO', 60, 245);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], 'test-id.png', { type: 'image/png' });
        resolve(file);
      }, 'image/png');
    });
  };

  const handleOpenVerificationModal = async () => {
    setInstructions('');
    setVerificationModalOpen(true);
  };

  const handleStep1Instructions = () => {
    setInstructions(`
      STEP 1: ID UPLOAD TEST
      
      1. Click the file input box or drag and drop
      2. A test ID image will be generated
      3. Select the generated test-id.png file
      4. Click "Continue to Selfie" button
      
      Expected: Progress bar shows Step 1 complete, moves to Step 2
    `);
  };

  const handleStep2Instructions = () => {
    setInstructions(`
      STEP 2: SELFIE VERIFICATION TEST
      
      1. Click "Activate Camera" button
      2. Allow camera permissions when prompted
      3. Position your face in the circle guide
      4. Click "📸 Take Selfie" button to capture
      5. Review the preview image
      6. Click "Complete Verification" to proceed
      
      Alternative (No camera):
      - You can still complete the flow by:
        - Clicking "Activate Camera"
        - If camera fails, click back
        - Try uploading a face image instead
      
      Expected: Selfie captured, moves to Step 3 (Success)
    `);
  };

  const handleStep3Instructions = () => {
    setInstructions(`
      STEP 3: SUCCESS - AUTO COMPLETE
      
      After Step 2 completes automatically:
      1. You'll see success screen
      2. Click "Get Started" button
      3. Modal closes and verification is complete
      
      Expected: Modal closes, verification state is saved
    `);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🧪 Verification Modal Test Page</h1>
        <p>Use this page to test the verification flow with guidance</p>
      </div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <button 
            className={styles.primaryButton}
            onClick={handleOpenVerificationModal}
          >
            🔓 Open Verification Modal
          </button>

          <div className={styles.instructionsBox}>
            <h2>📋 Step-by-Step Instructions</h2>
            
            <div className={styles.stepButtons}>
              <button 
                className={styles.stepButton}
                onClick={handleStep1Instructions}
              >
                📤 Step 1: ID Upload
              </button>
              <button 
                className={styles.stepButton}
                onClick={handleStep2Instructions}
              >
                📸 Step 2: Selfie Capture
              </button>
              <button 
                className={styles.stepButton}
                onClick={handleStep3Instructions}
              >
                ✅ Step 3: Success
              </button>
            </div>

            {instructions && (
              <div className={styles.instructionDisplay}>
                <pre>{instructions}</pre>
              </div>
            )}
          </div>

          <div className={styles.testDataBox}>
            <h2>📊 Test Data</h2>
            <div className={styles.dataGrid}>
              <div className={styles.dataItem}>
                <strong>ID File:</strong>
                <span>Auto-generated test ID (PNG, ~5KB)</span>
              </div>
              <div className={styles.dataItem}>
                <strong>Accepted Formats:</strong>
                <span>PNG, JPG, PDF (max 5MB)</span>
              </div>
              <div className={styles.dataItem}>
                <strong>Selfie:</strong>
                <span>Captured via webcam</span>
              </div>
              <div className={styles.dataItem}>
                <strong>File Input:</strong>
                <span>Click to select or drag-drop</span>
              </div>
            </div>
          </div>

          <div className={styles.flowChart}>
            <h2>🔄 Verification Flow</h2>
            <div className={styles.flow}>
              <div className={styles.flowStep}>
                <div className={styles.flowNumber}>1</div>
                <div className={styles.flowText}>ID Upload</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowStep}>
                <div className={styles.flowNumber}>2</div>
                <div className={styles.flowText}>Selfie</div>
              </div>
              <div className={styles.flowArrow}>→</div>
              <div className={styles.flowStep}>
                <div className={styles.flowNumber}>3</div>
                <div className={styles.flowText}>Success</div>
              </div>
            </div>
          </div>

          <div className={styles.tipsBox}>
            <h2>💡 Tips for Testing</h2>
            <ul>
              <li>Make sure browser has camera permissions</li>
              <li>Good lighting improves selfie capture</li>
              <li>Face guide circle helps with positioning</li>
              <li>You can retake selfie if needed</li>
              <li>Back button goes to previous step</li>
              <li>Modal closes after "Get Started" on success</li>
            </ul>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3>🚀 Quick Start</h3>
            <ol>
              <li>Click "Open Verification Modal"</li>
              <li>Read instructions for each step</li>
              <li>Follow the on-screen prompts</li>
              <li>Complete all 3 steps</li>
            </ol>
          </div>

          <div className={styles.card}>
            <h3>⚠️ Common Issues</h3>
            <ul>
              <li><strong>Camera not working?</strong><br/>Check browser permissions</li>
              <li><strong>File too large?</strong><br/>Keep under 5MB</li>
              <li><strong>Wrong format?</strong><br/>Use PNG, JPG, or PDF</li>
              <li><strong>Stuck on step?</strong><br/>Click Back button</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>📱 Browser Support</h3>
            <ul>
              <li>Chrome ✓</li>
              <li>Firefox ✓</li>
              <li>Safari ✓</li>
              <li>Edge ✓</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
