# 💳 How Stripe Payment Works in Your Shop

## 🎬 The Complete Payment Journey

### Step-by-Step Flow:

```
┌─────────────────────────────────────────────────────────────┐
│  1. CUSTOMER SHOPS                                          │
│  👤 Customer browses perfumes                               │
│  🛒 Adds items to cart                                      │
│  💰 Sees total price                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. CHECKOUT PAGE                                           │
│  📝 Customer fills in:                                      │
│     • Name                                                  │
│     • Email                                                 │
│     • Shipping Address                                      │
│  ✅ Clicks "Continue to Payment"                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. YOUR BACKEND CREATES PAYMENT INTENT                     │
│  🖥️  Backend receives request                               │
│  💬 Contacts Stripe API                                     │
│  🎫 Stripe creates Payment Intent                           │
│  🔑 Returns client secret to frontend                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. STRIPE PAYMENT FORM APPEARS                             │
│  💳 Secure Stripe Elements loads                            │
│  🔒 Customer enters card details:                           │
│     • Card number                                           │
│     • Expiry date                                           │
│     • CVC                                                   │
│     • ZIP code                                              │
│  ⚡ All data encrypted by Stripe                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. STRIPE PROCESSES PAYMENT                                │
│  🏦 Stripe validates card                                   │
│  💰 Charges the card                                        │
│  ✅ Payment succeeds                                        │
│  📧 Stripe sends confirmation                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. ORDER CREATED IN YOUR DATABASE                          │
│  💾 Your backend saves order                                │
│  📦 Includes:                                               │
│     • Customer info                                         │
│     • Items ordered                                         │
│     • Payment status: "succeeded"                           │
│     • Stripe payment ID                                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  7. MONEY IN YOUR ACCOUNT                                   │
│  💰 Money appears in your Stripe account                    │
│  📊 View in Stripe Dashboard                                │
│  🏦 Transfer to your bank account                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  8. CUSTOMER CONFIRMATION                                   │
│  ✅ Success message shown                                   │
│  🛒 Cart cleared                                            │
│  📧 Customer can receive email (optional)                   │
│  🏠 Redirected to home page                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security: Where Does Card Data Go?

```
❌ NEVER touches your server
❌ NEVER stored in your database
❌ NEVER visible to you

✅ Goes directly to Stripe
✅ Encrypted end-to-end
✅ PCI compliant automatically
✅ Stripe handles all security
```

---

## 💰 Money Flow

```
Customer's Card
      ↓
   Stripe
      ↓
Your Stripe Account
      ↓
Your Bank Account
```

**Timeline:**
- Payment processed: Instant
- Appears in Stripe: Instant
- Available for payout: 2-7 days (depending on your country)
- Transfer to bank: 1-3 business days

---

## 🎯 What Each File Does

### Backend Files:

**`backend/routes/paymentRoutes.js`**
```javascript
// Creates payment intents
// Verifies payment status
// Handles Stripe webhooks
```

**`backend/models/Order.js`**
```javascript
// Stores order information
// Includes Stripe payment ID
// Tracks payment status
```

**`backend/server.js`**
```javascript
// Connects payment routes
// Handles API requests
```

### Frontend Files:

**`frontend/src/pages/CheckoutWithStripe.js`**
```javascript
// Main checkout page
// Collects customer info
// Manages payment flow
```

**`frontend/src/components/StripeCheckoutForm.js`**
```javascript
// Stripe payment form
// Handles card input
// Processes payment
```

---

## 🧪 Test Mode vs Live Mode

### Test Mode (Current Setup):
- ✅ Use test API keys (pk_test_... and sk_test_...)
- ✅ Use test cards (4242 4242 4242 4242)
- ✅ No real money charged
- ✅ Perfect for development

### Live Mode (When Ready):
- 💰 Use live API keys (pk_live_... and sk_live_...)
- 💰 Real cards only
- 💰 Real money charged
- 💰 Money goes to your account

---

## 📊 What You Can See in Stripe Dashboard

After a payment:
- ✅ Payment amount
- ✅ Customer email
- ✅ Card type (Visa, Mastercard, etc.)
- ✅ Last 4 digits of card
- ✅ Payment status
- ✅ Fees charged by Stripe
- ✅ Net amount you receive

---

## 💡 Common Questions

**Q: Do I need a business account?**
A: No, you can start with a personal Stripe account.

**Q: What are Stripe's fees?**
A: Typically 2.9% + $0.30 per successful transaction (varies by country).

**Q: When do I get the money?**
A: Usually 2-7 days after the payment, then 1-3 days to your bank.

**Q: Can customers pay with Apple Pay / Google Pay?**
A: Yes! Stripe Elements automatically supports them.

**Q: What currencies are supported?**
A: 135+ currencies. Change `currency: 'usd'` in the code.

**Q: Is it secure?**
A: Yes! Stripe is PCI Level 1 certified (highest security level).

---

## 🚀 Ready to Start?

1. Get your API keys from Stripe
2. Add them to your .env files
3. Restart the servers
4. Test with card: 4242 4242 4242 4242
5. Start accepting real payments!

---

**Need help? Check out the other guide files!**
- `QUICK_START.md` - Fast setup
- `STRIPE_SETUP_GUIDE.md` - Detailed instructions
- `ADD_YOUR_KEYS_HERE.txt` - Where to put keys
