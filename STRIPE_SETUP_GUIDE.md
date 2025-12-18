# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up Stripe payment integration for your perfume shop. The integration is complete and ready - you just need to add your API keys.

## What's Been Implemented

### Backend Changes:
1. ✅ Installed `stripe` package
2. ✅ Created payment routes (`/api/payment`)
3. ✅ Updated Order model to include Stripe payment info
4. ✅ Added payment intent creation endpoint
5. ✅ Added payment verification endpoint

### Frontend Changes:
1. ✅ Installed `@stripe/stripe-js` and `@stripe/react-stripe-js`
2. ✅ Created Stripe checkout form component
3. ✅ Updated checkout page to use Stripe Elements
4. ✅ Added secure payment flow

## Setup Instructions

### Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create an account or log in
3. Navigate to **Developers** → **API keys**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...` for test mode)
   - **Secret key** (starts with `sk_test_...` for test mode)

### Step 2: Configure Backend Environment

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

3. Open `.env` and add your Stripe secret key:
   ```env
   MONGO_URI=mongodb://localhost:27017/gabbot
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   
   # Add your Stripe Secret Key here (starts with sk_test_)
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   ```

### Step 3: Configure Frontend Environment

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

3. Open `.env` and add your Stripe publishable key:
   ```env
   # Add your Stripe Publishable Key here (starts with pk_test_)
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
   
   REACT_APP_API_URL=http://localhost:5000
   ```

### Step 4: Restart Your Servers

After adding the API keys, restart both servers:

1. Stop the current servers (if running)
2. Run the start script again:
   ```bash
   cd ..
   .\start.bat
   ```

## Testing the Integration

### Test Mode
Stripe provides test card numbers for testing:

**Successful Payment:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Declined Payment:**
- Card Number: `4000 0000 0000 0002`
- Use same expiry, CVC, and ZIP as above

**More test cards:** https://stripe.com/docs/testing

### Testing Flow:
1. Add products to cart
2. Go to checkout
3. Fill in customer and shipping information
4. Click "Continue to Payment"
5. Enter test card details in the Stripe payment form
6. Click "Pay $XX.XX"
7. Payment should process and order should be created

## How It Works

### Payment Flow:
1. **Customer fills shipping info** → Frontend collects customer details
2. **Click "Continue to Payment"** → Backend creates a Payment Intent
3. **Stripe payment form appears** → Customer enters card details securely
4. **Payment processed** → Stripe handles the payment
5. **Order created** → Backend saves order with payment info
6. **Cart cleared** → Customer redirected to home page

### Security Features:
- ✅ Card details never touch your server
- ✅ PCI compliance handled by Stripe
- ✅ Secure payment processing
- ✅ Payment verification before order creation

## API Endpoints

### Create Payment Intent
```
POST /api/payment/create-payment-intent
Body: {
  "amount": 99.99,
  "currency": "usd",
  "metadata": {
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }
}
```

### Check Payment Status
```
GET /api/payment/payment-status/:paymentIntentId
```

### Create Order
```
POST /api/orders
Body: {
  "customerInfo": { "name": "...", "email": "..." },
  "shippingAddress": { ... },
  "paymentMethod": "stripe",
  "stripePaymentIntentId": "pi_...",
  "paymentStatus": "succeeded",
  "items": [...]
}
```

## Going Live

When you're ready to accept real payments:

1. Complete Stripe account verification
2. Switch to **Live mode** in Stripe Dashboard
3. Get your **Live API keys** (start with `pk_live_` and `sk_live_`)
4. Update your `.env` files with live keys
5. Deploy your application

## Troubleshooting

### "Stripe is not defined" error:
- Make sure `REACT_APP_STRIPE_PUBLISHABLE_KEY` is set in frontend `.env`
- Restart the frontend server after adding the key

### "Payment intent creation failed":
- Check that `STRIPE_SECRET_KEY` is set in backend `.env`
- Verify the key starts with `sk_test_` or `sk_live_`
- Restart the backend server

### Payment succeeds but order not created:
- Check backend console for errors
- Verify MongoDB is running
- Check network tab in browser for API errors

## Support

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Test Cards:** https://stripe.com/docs/testing

## Important Notes

⚠️ **Never commit your `.env` files to Git!**
- The `.env` files are already in `.gitignore`
- Only share API keys through secure channels
- Use test keys for development
- Use live keys only in production

✅ **Your integration is complete!** Just add your API keys and you're ready to accept payments.
