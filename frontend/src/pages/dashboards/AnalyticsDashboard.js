import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Dashboard.css';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalUsers: 0,
    ordersByStatus: {},
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/users/stats')
      ]);

      const orders = ordersRes.data;
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalOrders = orders.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const ordersByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setAnalytics({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        totalUsers: usersRes.data.totalUsers,
        ordersByStatus,
        recentOrders
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Analytics Dashboard</h1>
        
        <div className="analytics-grid">
          <div className="analytics-card large">
            <h2>Total Revenue</h2>
            <p className="analytics-value">${analytics.totalRevenue.toFixed(2)}</p>
            <p className="analytics-label">All time sales</p>
          </div>
          
          <div className="analytics-card">
            <h3>Total Orders</h3>
            <p className="analytics-value">{analytics.totalOrders}</p>
          </div>
          
          <div className="analytics-card">
            <h3>Average Order Value</h3>
            <p className="analytics-value">${analytics.averageOrderValue.toFixed(2)}</p>
          </div>
          
          <div className="analytics-card">
            <h3>Total Users</h3>
            <p className="analytics-value">{analytics.totalUsers}</p>
          </div>
        </div>

        <div className="analytics-sections">
          <div className="analytics-section">
            <h2>Orders by Status</h2>
            <div className="status-breakdown">
              {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
                <div key={status} className="status-item">
                  <span className="status-label">{status}</span>
                  <div className="status-bar">
                    <div
                      className="status-bar-fill"
                      style={{
                        width: `${(count / analytics.totalOrders) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="status-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-section">
            <h2>Recent Orders</h2>
            <div className="recent-orders-list">
              {analytics.recentOrders.map(order => (
                <div key={order._id} className="recent-order-item">
                  <div>
                    <p className="order-id">#{order._id.slice(-8)}</p>
                    <p className="order-customer">{order.user?.name || 'N/A'}</p>
                  </div>
                  <div className="order-info-right">
                    <p className="order-amount">${order.totalAmount.toFixed(2)}</p>
                    <span className={`status-badge-small ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

