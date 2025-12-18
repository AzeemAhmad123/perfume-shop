import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load search query from localStorage on mount
    const savedQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(savedQuery);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);
    
    // Dispatch custom event to notify Home component
    window.dispatchEvent(new CustomEvent('searchQueryChanged', { detail: query }));
    
    // Navigate to home if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
    setIsSearchOpen(false);
  };

  const handleHomeClick = () => {
    // Clear search query when Home is clicked
    setSearchQuery('');
    localStorage.setItem('searchQuery', '');
    window.dispatchEvent(new CustomEvent('searchQueryChanged', { detail: '' }));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
            <img 
              src="/images/WhatsApp Image 2025-12-14 at 1.08.19 AM (1).jpeg" 
              alt="Gabbot Logo" 
              className="logo-image"
            />
            <span>Gabbot</span>
          </Link>
        
          <div className="navbar-links">
            <Link to="/" onClick={handleHomeClick}>Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/info">Info</Link>
            <div className="search-icon" onClick={handleSearchClick}>🔍</div>
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="search-modal-overlay" onClick={handleSearchClose}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Search Perfumes</h3>
              <button className="search-close-btn" onClick={handleSearchClose}>×</button>
            </div>
            <form onSubmit={handleSearchSubmit} className="search-modal-form">
              <input
                type="text"
                placeholder="Search perfumes by name..."
                className="search-modal-input"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <button type="submit" className="search-modal-submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

