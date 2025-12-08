'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './VerificationModal.module.css';

export default function VerificationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: ID Upload, 2: Selfie, 3: Success
  const [idFile, setIdFile] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Stop camera if active
      if (cameraActive) {
        stopCamera();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, cameraActive]);

  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    if (file.size > maxSize) {
      setError('File size must not exceed 5MB.');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setError('Only PNG, JPG, or PDF files are allowed.');
      return false;
    }

    return true;
  };

  const handleIDUpload = (e) => {
    setError('');
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateFile(file)) {
      return;
    }

    setIdFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIdPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setIdPreview(null);
    }
  };

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setError('');
    const context = canvasRef.current.getContext('2d');

    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
          setSelfieFile(file);
          setSelfiePreview(canvasRef.current?.toDataURL('image/jpeg'));
          stopCamera();
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const retakeSelfie = () => {
    setSelfieFile(null);
    setSelfiePreview(null);
    startCamera();
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!idFile) {
        setError('Please upload a government-issued ID.');
        return;
      }

      setIsLoading(true);
      try {
        // Here you would upload the ID file to your server
        const formData = new FormData();
        formData.append('idDocument', idFile);

        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStep(2);
        startCamera();
      } catch (err) {
        setError('Failed to upload ID. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      if (!selfieFile) {
        setError('Please take a selfie to verify your identity.');
        return;
      }

      setIsLoading(true);
      try {
        // Here you would upload the selfie file to your server
        const formData = new FormData();
        formData.append('selfieImage', selfieFile);

        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStep(3);
      } catch (err) {
        setError('Failed to upload selfie. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setError('');
      stopCamera();
      setStep(1);
    } else if (step === 3) {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setStep(1);
    setIdFile(null);
    setIdPreview(null);
    setSelfieFile(null);
    setSelfiePreview(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Progress Steps */}
        <div className={styles.progressContainer}>
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`${styles.progressStep} ${
                stepNum === step ? styles.active : ''
              } ${stepNum < step ? styles.completed : ''}`}
            >
              <div className={styles.stepCircle}>
                {stepNum < step ? '✓' : stepNum}
              </div>
              {stepNum < 3 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {/* Step 1: ID Upload */}
        {step === 1 && (
          <>
            <h2 className={styles.title}>ID Verification</h2>
            <p className={styles.subtitle}>
              Upload a government-issued ID to verify your identity
            </p>

            <form onSubmit={handleNextStep} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.uploadBox}>
                {idPreview ? (
                  <div className={styles.previewContainer}>
                    <img src={idPreview} alt="ID Preview" className={styles.preview} />
                    <button
                      type="button"
                      className={styles.changeButton}
                      onClick={() => {
                        setIdFile(null);
                        setIdPreview(null);
                      }}
                    >
                      Change File
                    </button>
                  </div>
                ) : idFile ? (
                  <div className={styles.fileInfo}>
                    <div className={styles.fileIcon}>📄</div>
                    <div className={styles.fileName}>{idFile.name}</div>
                    <div className={styles.fileSize}>
                      {(idFile.size / 1024).toFixed(2)} KB
                    </div>
                    <button
                      type="button"
                      className={styles.changeButton}
                      onClick={() => {
                        setIdFile(null);
                        setIdPreview(null);
                      }}
                    >
                      Change File
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>📤</div>
                    <div className={styles.uploadText}>
                      <div className={styles.uploadTitle}>
                        Drag and drop your ID here
                      </div>
                      <div className={styles.uploadSubtext}>
                        or click to browse
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      onChange={handleIDUpload}
                      className={styles.fileInput}
                      disabled={isLoading}
                    />
                  </label>
                )}

                <div className={styles.uploadInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>✓</span>
                    <span>PNG, JPG or PDF</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>✓</span>
                    <span>Max. 5MB file size</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>✓</span>
                    <span>Government-issued ID</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={!idFile || isLoading}
              >
                {isLoading ? 'Uploading...' : 'Continue to Selfie'}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Selfie Verification */}
        {step === 2 && (
          <>
            <h2 className={styles.title}>Selfie Verification</h2>
            <p className={styles.subtitle}>
              Take a selfie to verify your identity
            </p>

            <form onSubmit={handleNextStep} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              {!selfiePreview ? (
                <div className={styles.cameraContainer}>
                  {cameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className={styles.video}
                      />
                      <div className={styles.cameraMask}>
                        <div className={styles.faceGuide} />
                      </div>
                      <div className={styles.cameraHint}>
                        Position your face in the circle
                      </div>
                      <button
                        type="button"
                        className={styles.captureButton}
                        onClick={captureSelfie}
                      >
                        📸 Take Selfie
                      </button>
                    </>
                  ) : (
                    <div className={styles.cameraPlaceholder}>
                      <div className={styles.cameraIcon}>📷</div>
                      <p>Camera not active</p>
                      <button
                        type="button"
                        className={styles.activateButton}
                        onClick={startCamera}
                      >
                        Activate Camera
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.selfiePreviewContainer}>
                  <img
                    src={selfiePreview}
                    alt="Selfie Preview"
                    className={styles.selfiePreview}
                  />
                  <button
                    type="button"
                    className={styles.retakeButton}
                    onClick={retakeSelfie}
                  >
                    Retake Selfie
                  </button>
                </div>
              )}

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={!selfieFile || isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Complete Verification'}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.title}>Verification Complete!</h2>
              <p className={styles.subtitle}>
                Your identity has been verified successfully.
              </p>
              <p className={styles.successMessage}>
                Your account is now fully verified and ready to use all premium features.
              </p>
            </div>

            <button
              className={styles.submitButton}
              onClick={handleFinish}
            >
              Get Started
            </button>
          </>
        )}
      </div>

      {/* Hidden canvas for capturing selfies */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
