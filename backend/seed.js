const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Dolcetto Real King',
    description: 'DOLCETTO REAL KING FOR MEN - Eau de Parfum, 100ml, 3.4 Fl. Oz. A luxurious fragrance with a regal presence.',
    price: 24.99,
    image: '/images/dolcetto.jpg',
    category: 'cologne',
    inStock: true,
    stockQuantity: 100
  },
  {
    name: 'Blue For Men Royal Edition',
    description: 'BLUE FOR MEN ROYAL EDITION - Eau De Toilette, 100ml, 3.4 fl.oz. A sophisticated and elegant scent for the modern gentleman.',
    price: 24.99,
    image: '/images/blue-royal.jpg',
    category: 'cologne',
    inStock: true,
    stockQuantity: 100
  },
  {
    name: 'NYC Sexy Men',
    description: 'NYC sexy MEN FOR MEN - EAU DE TOILETTE, 100ml, 3.4 fl.oz. A bold and confident fragrance that captures the essence of New York.',
    price: 24.99,
    image: '/images/nyc-sexy.jpg',
    category: 'cologne',
    inStock: true,
    stockQuantity: 100
  }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gabbot';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  
  // Clear existing products
  await Product.deleteMany({});
  console.log('Cleared existing products');
  
  // Insert products
  await Product.insertMany(products);
  console.log('Products seeded successfully');
  
  // Create admin user if not exists
  const adminExists = await User.findOne({ email: 'admin@gabbot.com' });
  if (!adminExists) {
    const admin = new User({
      name: 'Admin User',
      email: 'admin@gabbot.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created: admin@gabbot.com / admin123');
  }
  
  // Create test user if not exists
  const userExists = await User.findOne({ email: 'user@gabbot.com' });
  if (!userExists) {
    const user = new User({
      name: 'Test User',
      email: 'user@gabbot.com',
      password: 'user123',
      role: 'user'
    });
    await user.save();
    console.log('Test user created: user@gabbot.com / user123');
  }
  
  process.exit(0);
})
.catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});

