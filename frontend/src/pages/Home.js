import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load search query from localStorage on mount
    const savedQuery = localStorage.getItem('searchQuery') || '';
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }

    // Listen for custom search query change event
    const handleSearchQueryChange = (e) => {
      const newQuery = e.detail || '';
      setSearchQuery(newQuery);
    };

    // Also listen for storage events (for cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'searchQuery') {
        setSearchQuery(e.newValue || '');
      }
    };

    window.addEventListener('searchQueryChanged', handleSearchQueryChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('searchQueryChanged', handleSearchQueryChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Product data with images, names, descriptions, and prices
  const products = useMemo(() => [
    {
      id: 'robot',
      name: 'Robot Perfume',
      description: 'ROBOT - Eau De Toilette, 100ml, 3.4 fl.oz. A futuristic fragrance with metallic notes, perfect for the modern tech-savvy individual.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.19 AM (1).jpeg'
    },
    {
      id: 'valencia-uomo',
      name: 'Valencia Uomo Fantasy',
      description: 'VALENCIA UOMO FANTASY - Eau de parfum, 100ml, 3.4 fl.oz. A sophisticated and elegant scent with peachy-pink notes for the refined gentleman.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.19 AM.jpeg'
    },
    {
      id: 'fearless-men',
      name: 'Only Fearless Men Black Edition',
      description: 'ONLY FEARLESS MEN BLACK EDITION - EAU DE TOILETTE, 100ML, 3.4 Fl.Oz. A bold and confident fragrance that embodies strength and courage.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.20 AM (1).jpeg'
    },
    {
      id: 'blue-royal',
      name: 'Blue For Men Royal Edition',
      description: 'BLUE FOR MEN ROYAL EDITION - Eau De Toilette, 100ml, 3.4 fl.oz. A sophisticated and elegant scent for the modern gentleman.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.20 AM.jpeg'
    },
    {
      id: 'dolcetto-king',
      name: 'Dolcetto Real King',
      description: 'DOLCETTO REAL KING FOR MEN - Eau de Parfum, 100ml, 3.4 Fl. Oz. A luxurious fragrance with a regal presence and elegant notes.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.21 AM (1).jpeg'
    },
    {
      id: 'versave-topaz',
      name: 'Versave Topaz',
      description: 'VERSAVE TOPAZ - Eau De Toilette, 100ml, 3.4 fl.oz. A vibrant and energetic fragrance with Mediterranean inspiration, featuring warm topaz notes perfect for those who love adventure.',
      price: 29.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.21 AM (2).jpeg'
    },
    {
      id: 'valencia-donna',
      name: 'Valencia Donna Fantasy',
      description: 'VALENCIA DONNA FANTASY - Eau de parfum, 100ml, 3.4 fl.oz. A feminine and elegant fragrance with pink floral notes.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.21 AM.jpeg'
    },
    {
      id: 'millionaire',
      name: 'Millionaire',
      description: 'MILLIONAIRE - Eau De Toilette, 100ml, 3.4 fl.oz. Feel like a million bucks every time you wear it. A luxurious and opulent fragrance for the sophisticated individual with rich, elegant notes.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.22 AM (1).jpeg'
    },
    {
      id: 'younger-with-you',
      name: 'Younger With You',
      description: 'YOUNGER WITH YOU - Eau De Toilette, 100ml, 3.4 fl.oz. A fresh and youthful fragrance that captures the essence of vitality and energy, perfect for the modern individual.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.22 AM (2).jpeg'
    },
    {
      id: 'original-oud',
      name: 'Original Oud',
      description: 'ORIGINAL OUD - Eau De Parfum, 100ml, 3.4 fl.oz. An authentic and luxurious fragrance featuring rich oud wood notes, perfect for those who appreciate traditional Middle Eastern scents.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.22 AM.jpeg'
    },
    {
      id: 'bright-london-women',
      name: 'Bright London Women',
      description: 'BRIGHT LONDON WOMEN - Eau De Parfum, 100ml, 3.4 fl.oz. A vibrant and sophisticated fragrance inspired by the elegance of London, featuring bright floral and citrus notes perfect for the modern woman.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.23 AM (1).jpeg'
    },
    {
      id: 'limited-dubai-chocolate',
      name: 'Limited Dubai Chocolate',
      description: 'LIMITED DUBAI CHOCOLATE - Eau De Parfum, 100ml, 3.4 fl.oz. An exclusive and decadent fragrance featuring rich chocolate and gourmand notes, inspired by the luxury of Dubai.',
      price: 14.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.23 AM.jpeg'
    },
    {
      id: 'imperial-silver',
      name: 'Imperial Silver',
      description: 'IMPERIAL SILVER - Eau De Toilette, 100ml, 3.4 fl.oz. A refined and elegant fragrance with metallic silver notes, perfect for the sophisticated gentleman who appreciates luxury and class.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.24 AM (1).jpeg'
    },
    {
      id: 'creed-aventus',
      name: 'Creed Aventus',
      description: 'CREED AVENTUS - Eau De Parfum, 100ml, 3.4 fl.oz. An iconic and legendary fragrance with notes of pineapple, blackcurrant, birch, and patchouli. A masterpiece of perfumery for the distinguished gentleman.',
      price: 79.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.24 AM (2).jpeg'
    },
    {
      id: 'baccarat-rouge-540',
      name: 'baccarat rouge 540',
      description: 'BACCARAT ROUGE 540 - Eau De Parfum, 100ml, 3.4 fl.oz. An ultra-luxurious and sophisticated fragrance with amber, saffron, and ambergris notes. A masterpiece of perfumery for the discerning individual.',
      price: 79.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.24 AM.jpeg'
    },
    {
      id: 'in-victory',
      name: 'In Victory',
      description: 'IN VICTORY - Eau De Parfum, 100ml, 3.4 fl.oz. A triumphant and powerful fragrance that embodies success and achievement, perfect for those who strive for excellence.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.25 AM (1).jpeg'
    },
    {
      id: 'verse-dark-crystal',
      name: 'Verse Dark Crystal',
      description: 'VERSE DARK CRYSTAL - Eau De Toilette, 100ml, 3.4 fl.oz. A mysterious and alluring fragrance with deep, dark crystal notes that captivate and intrigue, perfect for evening wear.',
      price: 29.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.25 AM (2).jpeg'
    },
    {
      id: 'nyc-sexy-men',
      name: 'Nyc Sexy Men',
      description: 'NYC SEXY MEN - Eau De Parfum, 100ml, 3.4 fl.oz. A bold and confident fragrance that captures the energy and sophistication of New York City, perfect for the modern urban gentleman.',
      price: 24.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.25 AM.jpeg'
    },
    {
      id: 'x-for-men',
      name: 'X For Men',
      description: 'X FOR MEN - Eau De Toilette, 100ml, 3.4 fl.oz. A powerful and masculine fragrance with bold, confident notes designed for the modern man who makes a statement.',
      price: 19.99,
      image: 'WhatsApp Image 2025-12-14 at 1.08.26 AM.jpeg'
    },
    {
      id: 'premium-6',
      name: 'Denim Musk',
      description: 'DENIM MUSK - Eau De Toilette, 100ml, 3.4 fl.oz. A fresh and modern fragrance with clean musk notes, perfect for the contemporary individual.',
      price: 24.99,
      image: '6.jpeg'
    },
    {
      id: 'premium-7',
      name: 'Bolder With You',
      description: 'BOLDER WITH YOU - Eau De Parfum, 100ml, 3.4 fl.oz. A bold and confident fragrance that embodies strength and charisma, perfect for the modern gentleman.',
      price: 24.99,
      image: '7.jpeg'
    },
    {
      id: 'premium-8',
      name: 'Parade',
      description: 'PARADE - Eau De Parfum, 100ml, 3.4 fl.oz. An elegant and sophisticated fragrance with refined notes, perfect for those who appreciate timeless beauty.',
      price: 24.99,
      image: '8.jpeg'
    },
    {
      id: 'premium-9',
      name: 'Valencia Donna Dream',
      description: 'VALENCIA DONNA DREAM - Eau De Parfum, 100ml, 3.4 fl.oz. A dreamy and feminine fragrance with elegant floral notes, perfect for the modern woman.',
      price: 24.99,
      image: '9.jpeg'
    },
    {
      id: 'premium-10',
      name: 'Dark Knight Absolu',
      description: 'DARK KNIGHT ABSOLU - Eau De Parfum, 100ml, 3.4 fl.oz. A powerful and intense fragrance for men with bold, dark notes that command attention.',
      price: 24.99,
      image: '10.jpeg'
    },
    {
      id: 'premium-11',
      name: 'Black Horse',
      description: 'BLACK HORSE - Eau De Toilette, 100ml, 3.4 fl.oz. A bold and distinctive fragrance with powerful notes, embodying strength and elegance.',
      price: 24.99,
      image: '11.jpeg'
    },
    {
      id: 'premium-12',
      name: 'Easy Miami Night',
      description: 'EASY MIAMI NIGHT - Eau De Parfum, 125ml, 4.2 fl.oz. A vibrant and energetic fragrance inspired by Miami nights, perfect for evening adventures.',
      price: 24.99,
      image: '12.jpeg'
    },
    {
      id: 'premium-13',
      name: 'Paris Dakar',
      description: 'PARIS DAKAR - Eau De Parfum, 100ml, 3.4 fl.oz. A sophisticated fragrance for men that combines urban elegance with adventurous spirit.',
      price: 24.99,
      image: '13.jpeg'
    },
    {
      id: 'premium-14',
      name: 'NoLimit',
      description: 'NOLIMIT - Eau De Toilette, 100ml, 3.4 fl.oz. A limitless fragrance with bold and unrestricted notes, perfect for those who break boundaries.',
      price: 24.99,
      image: '14.jpeg'
    },
    {
      id: 'premium-15',
      name: 'Infinity Men',
      description: 'INFINITY MEN - Eau De Toilette, 100ml, 3.4 fl.oz. A timeless and eternal fragrance for men with classic, sophisticated notes.',
      price: 24.99,
      image: '15.jpeg'
    },
    {
      id: 'premium-16',
      name: 'Sports Player',
      description: 'SPORTS PLAYER - Eau De Parfum, 100ml, 3.4 fl.oz. An energetic and dynamic fragrance with fresh, sporty notes perfect for active individuals.',
      price: 24.99,
      image: '16.jpeg'
    },
    {
      id: 'premium-17',
      name: 'Beyond Heat Crush',
      description: 'BEYOND HEAT CRUSH - Eau De Parfum, 100ml, 3.4 fl.oz. An intense and passionate fragrance with fiery notes that ignite the senses.',
      price: 24.99,
      image: '17.jpeg'
    },
    {
      id: 'premium-18',
      name: 'NY Jasmine For Women',
      description: 'NY JASMINE FOR WOMEN - Eau De Parfum, 100ml, 3.4 fl.oz. A sophisticated fragrance for women with the elegant scent of jasmine, inspired by New York elegance.',
      price: 24.99,
      image: '18.jpeg'
    },
    {
      id: 'premium-19',
      name: 'Savage Pour Homme',
      description: 'SAVAGE POUR HOMME - Eau De Toilette, 100ml, 3.4 fl.oz. A bold and untamed fragrance for men with powerful, masculine notes.',
      price: 24.99,
      image: '19.jpeg'
    },
    {
      id: 'premium-20',
      name: 'Player Noir',
      description: 'PLAYER NOIR - Eau De Toilette, 100ml, 3.4 fl.oz. A sophisticated fragrance for men with bold, dark notes that embody strength and elegance.',
      price: 24.99,
      image: '20.jpeg'
    },
    {
      id: 'premium-22',
      name: 'Player Midnight',
      description: 'PLAYER MIDNIGHT - Eau De Toilette, 100ml, 3.4 fl.oz. An inspired fragrance with fresh blue notes, perfect for the modern gentleman.',
      price: 24.99,
      image: '22.jpeg'
    },
    {
      id: 'premium-23',
      name: 'Musk Legend',
      description: 'MUSK LEGEND - Eau De Parfum, 100ml, 3.4 fl.oz. A legendary fragrance with deep, sensual musk notes and animalic warmth.',
      price: 24.99,
      image: '23.jpeg'
    },
    {
      id: 'premium-24',
      name: 'Parfum de Rois France',
      description: 'PARFUM DE ROIS FRANCE - Eau De Toilette, 100ml, 3.4 fl.oz. A royal fragrance for men with regal notes, embodying French elegance and sophistication.',
      price: 27.99,
      image: '24.jpeg'
    },
    {
      id: 'premium-25',
      name: 'Miss Delicate',
      description: 'MISS DELICATE - Eau De Parfum, 100ml, 3.4 fl.oz. A delicate and feminine fragrance for women with soft, elegant floral notes.',
      price: 27.99,
      image: '25.jpeg'
    },
    {
      id: 'premium-26',
      name: 'Paris Elixir D\'Or',
      description: 'PARIS ELIXIR D\'OR - Eau De Parfum, 100ml, 3.4 fl.oz. A golden elixir fragrance with luxurious notes, inspired by the elegance of Paris.',
      price: 23.99,
      image: '26.jpeg'
    },
    {
      id: 'premium-27',
      name: 'Victory Eau De Fresh',
      description: 'VICTORY EAU DE FRESH - Eau De Toilette, 100ml, 3.4 fl.oz. A fresh and invigorating fragrance for men with clean, vibrant notes.',
      price: 24.99,
      image: '27.jpeg'
    },
    {
      id: 'premium-28',
      name: 'C\'est La Vie Paris',
      description: 'C\'EST LA VIE PARIS - Eau De Parfum, 100ml, 3.4 fl.oz. A romantic fragrance for women inspired by Parisian elegance and the beauty of life.',
      price: 23.99,
      image: '28.jpeg'
    },
    {
      id: 'premium-29',
      name: 'Victory Oud Noir',
      description: 'VICTORY OUD NOIR - Eau De Toilette, 100ml, 3.4 fl.oz. A dark and luxurious fragrance for men with rich oud and black notes.',
      price: 24.99,
      image: '29.jpeg'
    },
    {
      id: 'premium-30',
      name: 'Victory Dark Blue',
      description: 'VICTORY DARK BLUE - Eau De Toilette, 100ml, 3.4 fl.oz. A sophisticated fragrance for men with deep blue notes, embodying strength and elegance.',
      price: 24.99,
      image: '30.jpeg'
    },
    {
      id: 'premium-31',
      name: 'Donna Bella Milano',
      description: 'DONNA BELLA MILANO - Eau De Parfum, 100ml, 3.4 fl.oz. A beautiful fragrance for women with elegant Italian-inspired notes from Milan.',
      price: 22.99,
      image: '31.jpeg'
    },
    {
      id: 'premium-32',
      name: 'Donatello Uomo Gentlemen',
      description: 'DONATELLO UOMO GENTLEMEN - Eau De Toilette, 100ml, 3.4 fl.oz. A refined fragrance for gentlemen with sophisticated and distinguished notes.',
      price: 22.99,
      image: '32.jpeg'
    },
    {
      id: 'premium-33',
      name: 'Legendary',
      description: 'LEGENDARY - Eau De Toilette, 100ml, 3.4 fl.oz. A legendary fragrance for men with powerful and memorable notes that leave a lasting impression.',
      price: 23.99,
      image: '33.jpeg'
    },
    {
      id: 'premium-34',
      name: 'Elite Sabaya',
      description: 'ELITE SABAYA - Eau De Parfum, 100ml, 3.4 fl.oz. An elite and luxurious fragrance with exotic and sophisticated notes.',
      price: 22.99,
      image: '34.jpeg'
    },
    {
      id: 'premium-35',
      name: 'Love in Paris',
      description: 'LOVE IN PARIS - Eau De Parfum, 100ml, 3.4 fl.oz. A romantic fragrance for women inspired by love and the enchanting beauty of Paris.',
      price: 25.99,
      image: '35.jpeg'
    },
    {
      id: 'premium-36',
      name: 'Denim Original',
      description: 'DENIM ORIGINAL - Eau De Toilette, 100ml, 3.4 fl.oz. An original and classic fragrance with fresh, casual notes perfect for everyday elegance.',
      price: 24.99,
      image: '36.jpeg'
    },
    {
      id: 'premium-37',
      name: 'Azad',
      description: 'AZAD - Eau De Parfum, 100ml, 3.4 fl.oz. An elegant and sophisticated fragrance with luxurious notes, featuring beautiful Arabic-inspired design.',
      price: 24.99,
      image: '37.jpeg'
    }
  ], []);

  const handleAddToCart = (product) => {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Navigate to cart page
    navigate('/cart');
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    // If search query is empty, show all products
    const trimmedQuery = searchQuery ? searchQuery.trim() : '';
    if (!trimmedQuery) {
      return products;
    }
    
    const query = trimmedQuery.toLowerCase();
    const queryWords = query.split(/\s+/).filter(word => word.length > 0);
    
    return products.filter(product => {
      const name = product.name.toLowerCase();
      const description = product.description.toLowerCase();
      
      // Check if full query matches
      if (name.includes(query) || description.includes(query)) {
        return true;
      }
      
      // For multi-word queries, check if all words are present
      if (queryWords.length > 1) {
        return queryWords.every(word => 
          name.includes(word) || description.includes(word)
        );
      }
      
      // For single word, check if it's contained
      return name.includes(query) || description.includes(query);
    });
  }, [products, searchQuery]);

  return (
    <div 
      className="home"
      style={{
        backgroundImage: `url('/images/1.jpeg')`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top left'
      }}
    >
      <div className="animated-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
      <div 
        className="hero-banner"
        style={{
          backgroundImage: `url('/images/background.jpg')`
        }}
      >
        <div className="hero-overlay">
          <div className="hero-text-box">
            <h1>Gabbots Cologne And Perfume</h1>
          </div>
        </div>
      </div>
      
      <div className="container">
        <h2 className="products-section-title">Our Premium Collection</h2>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
            const imageUrl = `/images/${encodeURIComponent(product.image)}`;
            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={imageUrl} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                      console.error('❌ Image failed to load:', imageUrl);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('✅ Image loaded:', imageUrl);
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
            })
          ) : (
            <div className="no-results">
              <p>No perfumes found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

