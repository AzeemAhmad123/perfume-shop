import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div 
      className="info-page"
      style={{
        backgroundImage: `url('/images/1.jpeg')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left'
      }}
    >
      <div className="container">
        <div className="info-content">
          <h1>About Gabbot</h1>
          
          <section className="info-section">
            <h2>Welcome to Gabbot</h2>
            <p>
              Gabbot is your premier destination for luxury fragrances. We specialize 
              in offering high-quality colognes and perfumes that embody elegance, 
              sophistication, and timeless appeal.
            </p>
          </section>

          <section className="info-section">
            <h2>Our Products</h2>
            <p>
              Our carefully curated collection features premium fragrances from around 
              the world. Each product is selected for its unique character, quality 
              ingredients, and exceptional craftsmanship.
            </p>
            <div className="product-highlights">
              <div className="highlight-card">
                <h3>Dolcetto Real King</h3>
                <p>A regal fragrance that commands attention with its luxurious blend of notes.</p>
              </div>
              <div className="highlight-card">
                <h3>Blue For Men Royal Edition</h3>
                <p>Sophisticated and elegant, perfect for the modern gentleman.</p>
              </div>
              <div className="highlight-card">
                <h3>NYC Sexy Men</h3>
                <p>Bold and confident, capturing the essence of New York City.</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Why Choose Gabbot?</h2>
            <ul className="features-list">
              <li>Premium Quality Products</li>
              <li>Competitive Pricing</li>
              <li>Fast and Secure Shipping</li>
              <li>Excellent Customer Service</li>
              <li>100% Authentic Products</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Contact Us</h2>
            <p>
              Have questions or need assistance? We're here to help! Reach out to our 
              customer service team for any inquiries about our products, orders, or 
              shipping information.
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> support@gabbot.com</p>
              <p><strong>Phone:</strong> 1-800-GABBOT</p>
              <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </section>

          <section className="info-section">
            <h2>Shipping & Returns</h2>
            <p>
              We offer free shipping on all orders. All products are carefully packaged 
              to ensure they arrive in perfect condition. If you're not satisfied with 
              your purchase, we offer a 30-day return policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Info;

