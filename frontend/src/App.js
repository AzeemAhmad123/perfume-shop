import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CheckoutWithStripe from './pages/CheckoutWithStripe';
import Info from './pages/Info';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutWithStripe />} />
          <Route path="/info" element={<Info />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

