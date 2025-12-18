# 🚀 Quick Start - Stripe Payment Integration

## ✅ What's Already Done

All the code is implemented and ready! You just need to add your Stripe API keys.

## 📝 3 Simple Steps to Get Started

### 1️⃣ Get Your Stripe Keys (2 minutes)

1. Go to: https://dashboard.stripe.com/register
2. Sign up or log in
3. Click **Developers** → **API keys**
4. Copy both keys:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### 2️⃣ Add Keys to Your Project (1 minute)

**Backend (.env file):**
```bash
cd backend
copy .env.example .env
notepad .env
```
Add your secret key:
```
MONGO_URI=mongodb://localhost:27017/gabbot
PORT=5000
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

**Frontend (.env file):**
```bash
cd frontend
copy .env.example .env
notepad .env
```
Add your publishable key:
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

### 3️⃣ Restart Servers (30 seconds)

```bash
cd ..
.\start.bat
```

## 🧪 Test It Out

1. Open http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Fill in the form
5. Use test card: **4242 4242 4242 4242**
6. Expiry: **12/34**, CVC: **123**
7. Complete payment! 🎉

## 💳 Test Cards

| Purpose | Card Number | Result |
|---------|-------------|--------|
| Success | 4242 4242 4242 4242 | ✅ Payment succeeds |
| Decline | 4000 0000 0000 0002 | ❌ Payment declined |

## 📚 Need More Help?

Read the detailed guide: **STRIPE_SETUP_GUIDE.md**

## 🎯 What Happens When Customer Pays?

1. Customer enters card details in secure Stripe form
2. Payment is processed by Stripe
3. Money goes to YOUR Stripe account
4. Order is saved in your database
5. Customer receives confirmation

## 🔒 Security

- Card details never touch your server
- PCI compliance handled by Stripe
- All payments are secure and encrypted

---

**That's it! You're ready to accept payments! 💰**
