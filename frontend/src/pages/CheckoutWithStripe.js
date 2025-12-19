import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import './Checkout.css';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 
  'pk_live_51SfUc7QLurqFqx09iPyEBFxUAOYYrJLEixjWcOekEaq1FhfFitj50MhGgSVdhBsVVdhRowOqf3dUPH0TImaI87Gj00V1UN1w6G'
);

const CheckoutWithStripe = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'stripe'
  });
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.street || 
        !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const totalAmount = calculateTotal();
      
      // Create payment intent
      const response = await axios.post('/api/payment/create-payment-intent', {
        amount: totalAmount,
        currency: 'usd',
        metadata: {
          customerName: formData.name,
          customerEmail: formData.email
        }
      });

      setClientSecret(response.data.clientSecret);
      setPaymentIntentId(response.data.paymentIntentId);
      setShowPayment(true);
      setLoading(false);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Create order in database
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: 'stripe',
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'succeeded',
        items: cartItems.map(item => ({
          product: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      await axios.post('/api/orders', orderData);
      
      // Clear cart
      localStorage.removeItem('cart');
      
      alert('Payment successful! Your order has been placed.');
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Payment was successful but there was an error saving your order. Please contact support with payment ID: ' + paymentIntent.id);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div 
        className="checkout-empty"
        style={{
          backgroundImage: `url('/images/1.jpeg')`,
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left'
        }}
      >
        <div className="container">
          <h2>Your cart is empty</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#635bff',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div 
      className="checkout-page"
      style={{
        backgroundImage: `url('/images/1.jpeg')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left'
      }}
    >
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            {!showPayment ? (
              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-section">
                  <h2>Customer Information</h2>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h2>Shipping Address</h2>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Zip Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="stripe-payment-section">
                <h2>Payment Information</h2>
                <p className="payment-info">Complete your payment securely with Stripe</p>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <StripeCheckoutForm
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      amount={calculateTotal()}
                    />
                  </Elements>
                )}
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowPayment(false)}
                  style={{ marginTop: '15px' }}
                >
                  Back to Shipping Info
                </button>
              </div>
            )}
          </div>

          <div className="checkout-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map((item, index) => (
                  <div key={item.productId || index} className="order-item">
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <p className="order-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              {showPayment && (
                <div className="payment-badge">
                  <img 
                    src="https://stripe.com/img/v3/home/social.png" 
                    alt="Secured by Stripe"
                    style={{ width: '100%', maxWidth: '200px', margin: '15px auto', display: 'block' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWithStripe;
