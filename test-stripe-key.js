// Test script to verify Stripe secret key
require('dotenv').config({ path: './backend/.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('========================================');
console.log('Testing Stripe Secret Key...');
console.log('========================================\n');

async function testStripeKey() {
  try {
    // Test 1: Check if key is set
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('❌ ERROR: STRIPE_SECRET_KEY not found in backend/.env');
      console.log('Please add your secret key to backend/.env file');
      return;
    }

    console.log('✅ Secret key found in .env file');
    console.log('Key starts with:', process.env.STRIPE_SECRET_KEY.substring(0, 15) + '...\n');

    // Test 2: Try to retrieve account info
    console.log('Testing connection to Stripe...');
    const account = await stripe.accounts.retrieve();
    
    console.log('\n========================================');
    console.log('✅ SUCCESS! Stripe key is valid!');
    console.log('========================================\n');
    
    console.log('Account Details:');
    console.log('- Account ID:', account.id);
    console.log('- Country:', account.country);
    console.log('- Currency:', account.default_currency?.toUpperCase() || 'Not set');
    console.log('- Charges Enabled:', account.charges_enabled ? '✅ Yes' : '❌ No');
    console.log('- Payouts Enabled:', account.payouts_enabled ? '✅ Yes' : '❌ No');
    
    if (account.business_profile?.name) {
      console.log('- Business Name:', account.business_profile.name);
    }
    
    console.log('\n========================================');
    console.log('Key Type:', process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? '🔴 LIVE (Real Money)' : '🟢 TEST (Fake Money)');
    console.log('========================================\n');

    if (process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
      console.log('⚠️  WARNING: You are using LIVE keys!');
      console.log('⚠️  Real money will be charged!');
      console.log('⚠️  Use real credit cards only!\n');
    } else {
      console.log('✅ You are using TEST keys');
      console.log('✅ Use test card: 4242 4242 4242 4242');
      console.log('✅ No real money will be charged\n');
    }

    // Test 3: Try to create a small payment intent
    console.log('Testing payment intent creation...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // $1.00
      currency: account.default_currency || 'usd',
      description: 'Test payment intent',
    });
    
    console.log('✅ Payment intent created successfully!');
    console.log('- Payment Intent ID:', paymentIntent.id);
    console.log('- Amount:', `$${(paymentIntent.amount / 100).toFixed(2)}`);
    console.log('- Status:', paymentIntent.status);
    
    console.log('\n========================================');
    console.log('🎉 All tests passed! Your Stripe integration is ready!');
    console.log('========================================\n');

  } catch (error) {
    console.log('\n========================================');
    console.log('❌ ERROR: Stripe key test failed!');
    console.log('========================================\n');
    
    if (error.type === 'StripeAuthenticationError') {
      console.log('❌ Invalid API key provided');
      console.log('Please check your STRIPE_SECRET_KEY in backend/.env');
      console.log('It should start with: sk_test_... or sk_live_...\n');
    } else if (error.type === 'StripePermissionError') {
      console.log('❌ API key does not have permission');
      console.log('Please check your Stripe account settings\n');
    } else {
      console.log('Error Type:', error.type);
      console.log('Error Message:', error.message);
      console.log('\nPlease verify:');
      console.log('1. Your secret key is correct');
      console.log('2. You have internet connection');
      console.log('3. Stripe services are operational\n');
    }
  }
}

testStripeKey();
