import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [ordersRes, profileRes] = await Promise.all([
        axios.get('/api/orders/my-orders'),
        axios.get('/api/users/profile')
      ]);

      setOrders(ordersRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      address: {
        street: formData.get('street'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        country: formData.get('country')
      }
    };

    try {
      await axios.put('/api/users/profile', data);
      fetchData();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>My Dashboard</h1>
        
        <div className="dashboard-tabs">
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="dashboard-section">
            <h2>Order History</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Order #{order._id.slice(-8)}</h3>
                        <p className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="order-status-badge">
                        <span className={`status ${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="order-items-list">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <div className="order-item-image-small">
                            {item.name?.charAt(0) || 'P'}
                          </div>
                          <div className="order-item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-quantity">Qty: {item.quantity}</p>
                          </div>
                          <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
                      <p className="order-payment">Payment: {order.paymentMethod}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && profile && (
          <div className="dashboard-section">
            <h2>My Profile</h2>
            <form onSubmit={updateProfile} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profile.name}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="disabled-input"
                />
              </div>

              <h3>Shipping Address</h3>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="street"
                  defaultValue={profile.address?.street || ''}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={profile.address?.city || ''}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    defaultValue={profile.address?.state || ''}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    defaultValue={profile.address?.zipCode || ''}
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={profile.address?.country || ''}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

