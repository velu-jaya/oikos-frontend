'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyListingForm from '@/components/PropertyListingForm';

export default function SellerPage() {
  return (
    <div>
      <Header />
      <main className="seller-page">
        <div className="container">
          <div className="seller-hero">
            <h1>List Your Property</h1>
            <p>Reach thousands of potential buyers with our comprehensive property listing platform</p>
          </div>
          <PropertyListingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
