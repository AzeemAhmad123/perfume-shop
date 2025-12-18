import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  };

  const updateQuantity = (productId, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        const newCart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(newCart));
      } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      fetchCart();
    }
  };

  const removeItem = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    fetchCart();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div 
        className="cart-empty"
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

  return (
    <div 
      className="cart-page"
      style={{
        backgroundImage: `url('/images/1.jpeg')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left'
      }}
    >
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => {
              const imageUrl = `/images/${encodeURIComponent(item.image)}`;
              return (
                <div key={item.productId || index} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={imageUrl} 
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const placeholder = e.target.nextElementSibling;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="item-image-placeholder" style={{ display: 'none' }}>
                      {item.name.charAt(0)}
                    </div>
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <p className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button 
                      className="btn-remove"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
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
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
