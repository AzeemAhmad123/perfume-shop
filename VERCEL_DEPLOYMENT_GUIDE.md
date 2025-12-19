# 🚀 Vercel Deployment Guide - Perfume Shop with Stripe

## ✅ Pre-Deployment Checklist

### What You Have:
- ✅ Stripe Publishable Key (already added to code)
- ❌ Stripe Secret Key (need from client)
- ❌ MongoDB Atlas connection string (need to create)

### What You Need:
1. **Stripe Secret Key** from client (starts with `sk_live_...`)
2. **MongoDB Atlas** account (free tier available)
3. **Vercel** account (free)

---

## 📋 Step-by-Step Deployment

### Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (choose FREE M0 tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/perfume-shop?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Save this connection string - you'll need it for Vercel

### Step 2: Deploy to Vercel (3 minutes)

1. Go to: https://vercel.com
2. Sign up or log in (use GitHub account)
3. Click "Add New" → "Project"
4. Import your GitHub repository: `AzeemAhmad123/perfume-shop`
5. Vercel will auto-detect the configuration

### Step 3: Add Environment Variables in Vercel

In Vercel dashboard, go to: **Settings** → **Environment Variables**

Add these variables:

#### For Production:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGO_URI` | Your MongoDB Atlas connection string | Production |
| `STRIPE_SECRET_KEY` | `sk_live_...` (from client) | Production |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | `pk_live_51SfUc7QLurqFqx09iPyEBFxUAOYYrJLEixjWcOekEaq1FhfFitj50MhGgSVdhBsVVdhRowOqf3dUPH0TImaI87Gj00V1UN1w6G` | Production |
| `REACT_APP_API_URL` | `/api` | Production |

**Important:** Make sure to select "Production" environment for all variables!

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://your-project-name.vercel.app`

---

## 🧪 Testing After Deployment

### Test the Payment Flow:

1. Visit your Vercel URL
2. Add products to cart
3. Go to checkout
4. Fill in customer information
5. Enter payment details:
   - **For LIVE keys:** Use a real credit card (small amount)
   - **For TEST keys:** Use test card `4242 4242 4242 4242`
6. Complete payment
7. Check Stripe dashboard to verify payment

---

## 🔧 Troubleshooting

### Issue: "Stripe is not defined"
**Solution:** Make sure `REACT_APP_STRIPE_PUBLISHABLE_KEY` is added in Vercel environment variables

### Issue: "Payment intent creation failed"
**Solution:** 
- Verify `STRIPE_SECRET_KEY` is correct in Vercel
- Make sure it starts with `sk_live_` or `sk_test_`
- Redeploy after adding the variable

### Issue: "MongoDB connection error"
**Solution:**
- Check `MONGO_URI` is correct
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check username/password in connection string

### Issue: "Cannot POST /api/payment/create-payment-intent"
**Solution:**
- Verify `api/index.js` includes payment routes
- Check Vercel build logs for errors
- Redeploy the project

---

## 📊 Vercel Configuration Files

### vercel.json (Already Configured)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

### Package.json Scripts (Already Configured)
The frontend `package.json` already has the build script needed for Vercel.

---

## 🔒 Security Best Practices

### ✅ Do:
- Use environment variables for all secrets
- Enable MongoDB IP whitelist (or allow all for Vercel)
- Use HTTPS (Vercel provides this automatically)
- Monitor Stripe dashboard for suspicious activity

### ❌ Don't:
- Commit `.env` files to Git
- Share API keys publicly
- Use test keys in production
- Store card details in your database

---

## 💰 Payment Flow on Vercel

```
Customer → Vercel Frontend → Vercel API → Stripe → Your Client's Account
```

1. Customer enters payment info
2. Frontend sends request to `/api/payment/create-payment-intent`
3. Vercel serverless function creates payment intent
4. Stripe processes payment
5. Money goes to your client's Stripe account
6. Order saved to MongoDB Atlas
7. Customer receives confirmation

---

## 📈 Monitoring

### Vercel Dashboard:
- View deployment logs
- Monitor function invocations
- Check error rates

### Stripe Dashboard:
- View all payments
- Check payment status
- Monitor revenue
- Handle refunds

### MongoDB Atlas:
- View orders
- Monitor database usage
- Check connection logs

---

## 🔄 Updating After Deployment

When you need to update the code:

```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel will automatically redeploy!

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com

---

## ✅ Deployment Checklist

Before going live:

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string obtained
- [ ] Stripe Secret Key received from client
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Test payment completed
- [ ] Stripe dashboard shows payment
- [ ] Order saved in MongoDB
- [ ] Custom domain configured (optional)

---

## 🎉 You're Ready!

Once all environment variables are set and deployment is successful, your perfume shop will be live and accepting payments!

**Next Steps:**
1. Get Stripe Secret Key from client
2. Set up MongoDB Atlas
3. Add environment variables to Vercel
4. Deploy and test!
