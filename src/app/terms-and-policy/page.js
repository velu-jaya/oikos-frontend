'use client';

import styles from './page.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsAndPolicy() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>Terms and Conditions & Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last updated: December 26, 2025</p>
          </div>

          {/* Terms and Conditions Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Terms and Conditions</h2>
            
            <div className={styles.content}>
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using the Qilo platform (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h3>2. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Qilo's Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Using automated tools to access the Service</li>
                <li>Harassing, threatening, or abusing other users</li>
              </ul>

              <h3>3. Disclaimer</h3>
              <p>
                The materials on Qilo's Service are provided on an 'as is' basis. Qilo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h3>4. Limitations</h3>
              <p>
                In no event shall Qilo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Qilo's Service, even if Qilo or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h3>5. Accuracy of Materials</h3>
              <p>
                The materials appearing on Qilo's Service could include technical, typographical, or photographic errors. Qilo does not warrant that any of the materials on the Service are accurate, complete, or current. Qilo may make changes to the materials contained on the Service at any time without notice.
              </p>

              <h3>6. Links</h3>
              <p>
                Qilo has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Qilo of the site. Use of any such linked website is at the user's own risk.
              </p>

              <h3>7. Modifications</h3>
              <p>
                Qilo may revise these terms of service for the Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h3>8. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h3>9. User Responsibilities</h3>
              <p>
                Users are responsible for:
              </p>
              <ul>
                <li>Maintaining the confidentiality of their account information</li>
                <li>All activities that occur under their account</li>
                <li>Notifying Qilo immediately of any unauthorized use</li>
                <li>Ensuring all information provided is accurate and current</li>
              </ul>

              <h3>10. Prohibited Activities</h3>
              <p>
                Users agree not to:
              </p>
              <ul>
                <li>Post false, inaccurate, or misleading information</li>
                <li>Engage in any form of fraud or misrepresentation</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Conduct illegal activities through the platform</li>
              </ul>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Privacy Policy</h2>
            
            <div className={styles.content}>
              <h3>1. Information We Collect</h3>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul>
                <li><strong>Personal Data:</strong> Name, email address, phone number, physical address, property preferences</li>
                <li><strong>Account Information:</strong> Username, password, account history</li>
                <li><strong>Transaction Data:</strong> Information about properties you view, inquire about, or purchase</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, usage patterns</li>
                <li><strong>Communication Data:</strong> Messages, inquiries, support tickets</li>
              </ul>

              <h3>2. Use of Information</h3>
              <p>
                The information Qilo collects may be used in the following ways:
              </p>
              <ul>
                <li>To personalize your experience on the Service</li>
                <li>To improve the Service and develop new features</li>
                <li>To process transactions and send you related information</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send periodic emails regarding your account or service</li>
                <li>To market new features, products, or services (with your consent)</li>
              </ul>

              <h3>3. Protection of Information</h3>
              <p>
                We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on the Service.
              </p>

              <h3>4. Sharing of Information</h3>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our Service, conducting business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>

              <h3>5. Third-Party Links</h3>
              <p>
                Our Service may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites before providing your personal information.
              </p>

              <h3>6. Cookies</h3>
              <p>
                We use cookies to enhance your experience. You have the ability to accept or decline cookies. If you choose to decline cookies, you may not be able to fully experience the interactive features of the Service.
              </p>

              <h3>7. Data Retention</h3>
              <p>
                We retain your personal information for as long as your account is active or for as long as necessary to provide the Service. You may request deletion of your information at any time by contacting us.
              </p>

              <h3>8. Your Rights</h3>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>

              <h3>9. Children's Privacy</h3>
              <p>
                Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will delete such information promptly.
              </p>

              <h3>10. Changes to This Policy</h3>
              <p>
                Qilo reserves the right to update or change this privacy policy at any time. Any changes will be effective immediately upon posting to the Service. Your continued use of the Service following the posting of revised terms means you accept and agree to the changes.
              </p>

              <h3>11. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className={styles.contactInfo}>
                <p>
                  <strong>Email:</strong> <a href="mailto:privacy@qilo.com">privacy@qilo.com</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href="tel:+15551234567">(555) 123-4567</a>
                </p>
                <p>
                  <strong>Address:</strong> 123 Real Estate Ave, Helena, Montana 59601
                </p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Additional Information</h2>
            
            <div className={styles.content}>
              <h3>Dispute Resolution</h3>
              <p>
                Any disputes arising from these terms and conditions shall be resolved through good faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in accordance with applicable laws.
              </p>

              <h3>Entire Agreement</h3>
              <p>
                These terms and conditions, along with our Privacy Policy, constitute the entire agreement between you and Qilo regarding the use of the Service and supersede all prior agreements, understandings, or negotiations.
              </p>

              <h3>Severability</h3>
              <p>
                If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h3>Contact Information</h3>
              <p>
                If you have any questions regarding these terms and conditions or the privacy policy, please contact us at the information provided in the Contact Us section above.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
