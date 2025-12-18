# Technology Stack Documentation

This document provides a comprehensive overview of all technologies, frameworks, libraries, and tools used in the Gabbot E-commerce Platform.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Stack](#frontend-stack)
3. [Backend Stack](#backend-stack)
4. [Database](#database)
5. [Development Tools](#development-tools)
6. [Deployment](#deployment)
7. [How Everything Works Together](#how-everything-works-together)

---

## 🏗️ Architecture Overview

**Stack Type:** MERN Stack (MongoDB, Express, React, Node.js)

**Architecture Pattern:** 
- **Frontend:** Single Page Application (SPA) with React
- **Backend:** RESTful API with Express.js
- **Database:** NoSQL (MongoDB)
- **Communication:** HTTP/JSON via REST API

**Project Structure:**
```
Gabbot/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
└── api/              # Additional API configurations
```

---

## 🎨 Frontend Stack

### **React** (v18.2.0)
**What it is:** A JavaScript library for building user interfaces

**Why it's used:** 
- Component-based architecture for reusable UI elements
- Virtual DOM for efficient rendering
- Large ecosystem and community support

**How it works in this project:**
- All UI components are built using React
- Components are organized in `frontend/src/components/` and `frontend/src/pages/`
- Main entry point: `frontend/src/App.js`

**Key Files:**
- `frontend/src/App.js` - Main application component
- `frontend/src/index.js` - Application entry point

---

### **React Router DOM** (v6.16.0)
**What it is:** Declarative routing for React applications

**Why it's used:**
- Enables navigation between different pages without page reloads
- Creates a Single Page Application (SPA) experience
- Manages browser history

**How it works in this project:**
- Routes are defined in `App.js`:
  - `/` - Home page
  - `/cart` - Shopping cart
  - `/checkout` - Checkout page
  - `/info` - Information page
- Uses `BrowserRouter` for client-side routing

**Example Usage:**
```javascript
<Route path="/cart" element={<Cart />} />
```

---

### **Axios** (v1.5.0)
**What it is:** Promise-based HTTP client for making API requests

**Why it's used:**
- Simplifies HTTP requests to the backend API
- Better than fetch API with automatic JSON parsing
- Supports interceptors for authentication

**How it works in this project:**
- Used in `AuthContext.js` for API calls
- Automatically adds JWT token to request headers
- Handles authentication requests (login, register, logout)
- Base URL configured via proxy (see `setupProxy.js`)

**Example Usage:**
```javascript
const res = await axios.post('/api/auth/login', { email, password });
```

---

### **React Context API**
**What it is:** Built-in React feature for state management without external libraries

**Why it's used:**
- Manages global application state (user authentication)
- Avoids prop drilling (passing props through multiple components)
- Lightweight alternative to Redux for simple state management

**How it works in this project:**
- `AuthContext.js` provides authentication state to all components
- Stores user information, login status, and authentication methods
- Components can access auth state using `useContext(AuthContext)`

**Key Features:**
- User authentication state
- Token management
- Login/Register/Logout functions

---

### **CSS (Cascading Style Sheets)**
**What it is:** Styling language for web pages

**Why it's used:**
- Styles all visual elements of the application
- Each component has its own CSS file for modular styling

**How it works in this project:**
- Component-specific CSS files (e.g., `Navbar.css`, `Cart.css`)
- Global styles in `index.css` and `App.css`
- Responsive design for different screen sizes

---

## ⚙️ Backend Stack

### **Node.js**
**What it is:** JavaScript runtime environment that runs JavaScript on the server

**Why it's used:**
- Allows JavaScript to run on the backend
- Enables full-stack JavaScript development
- Large ecosystem of packages (npm)

**How it works in this project:**
- Server runs on Node.js
- Entry point: `backend/server.js`
- Handles all server-side logic and API endpoints

---

### **Express.js** (v4.18.2)
**What it is:** Fast, minimalist web framework for Node.js

**Why it's used:**
- Simplifies server creation and routing
- Middleware support for authentication, CORS, etc.
- Industry standard for Node.js web applications

**How it works in this project:**
- Main server setup in `backend/server.js`
- Routes organized in `backend/routes/`:
  - `authRoutes.js` - Authentication endpoints
  - `productRoutes.js` - Product management
  - `cartRoutes.js` - Shopping cart operations
  - `orderRoutes.js` - Order processing
  - `userRoutes.js` - User management

**Key Features:**
- RESTful API endpoints
- JSON body parsing
- CORS enabled for frontend communication

---

### **MongoDB with Mongoose** (v7.5.0)
**What it is:** 
- **MongoDB:** NoSQL document database
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB

**Why it's used:**
- Flexible schema for e-commerce data
- Easy to scale and modify
- Mongoose provides validation, middleware, and type casting

**How it works in this project:**
- Database models in `backend/models/`:
  - `User.js` - User accounts and authentication
  - `Product.js` - Product catalog
  - `Cart.js` - Shopping cart items
  - `Order.js` - Order history
- Connection string stored in environment variables
- Mongoose schemas define data structure and validation

**Example Schema:**
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
```

---

### **JSON Web Token (JWT)** (v9.0.2)
**What it is:** Standard for securely transmitting information between parties as JSON

**Why it's used:**
- Stateless authentication (no server-side session storage)
- Secure way to verify user identity
- Token-based authentication for API requests

**How it works in this project:**
- Tokens generated on login/register
- Stored in browser's localStorage
- Sent with every API request in Authorization header
- Verified by `backend/middleware/auth.js` middleware
- Contains user ID and expiration time

**Flow:**
1. User logs in → Server generates JWT token
2. Token sent to frontend → Stored in localStorage
3. Frontend sends token with each API request
4. Backend verifies token → Grants access if valid

---

### **bcryptjs** (v2.4.3)
**What it is:** Library for hashing passwords

**Why it's used:**
- Security: Passwords are never stored in plain text
- One-way hashing makes passwords secure even if database is compromised
- Industry standard for password security

**How it works in this project:**
- Passwords hashed before saving to database (in User model)
- Uses salt rounds (10) for additional security
- `comparePassword` method verifies login passwords

**Example:**
```javascript
// Hashing password before saving
this.password = await bcrypt.hash(this.password, 10);

// Verifying password on login
const isMatch = await user.comparePassword(password);
```

---

### **express-validator** (v7.0.1)
**What it is:** Middleware for validating and sanitizing request data

**Why it's used:**
- Validates user input (email format, password length, etc.)
- Prevents invalid data from reaching database
- Security: Prevents injection attacks

**How it works in this project:**
- Validates registration and login forms
- Checks email format, password requirements
- Returns error messages for invalid input

---

### **CORS** (v2.8.5)
**What it is:** Cross-Origin Resource Sharing middleware

**Why it's used:**
- Allows frontend (localhost:3000) to communicate with backend (localhost:5000)
- Browsers block cross-origin requests by default for security
- CORS enables controlled cross-origin access

**How it works in this project:**
- Enabled in `backend/server.js`
- Allows frontend to make API requests
- Configured to accept requests from frontend origin

---

### **dotenv** (v16.3.1)
**What it is:** Loads environment variables from `.env` file

**Why it's used:**
- Keeps sensitive information (database URLs, secrets) out of code
- Different configurations for development/production
- Security best practice

**How it works in this project:**
- Loads `MONGO_URI` for database connection
- Loads `JWT_SECRET` for token signing
- Other environment-specific configurations

**Example:**
```javascript
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
```

---

## 🛠️ Development Tools

### **Concurrently** (v8.2.0)
**What it is:** Runs multiple commands concurrently

**Why it's used:**
- Runs both frontend and backend servers simultaneously
- Single command to start entire application
- Simplifies development workflow

**How it works in this project:**
- Script: `npm run dev`
- Runs `npm run server` (backend) and `npm run client` (frontend) together

---

### **Nodemon** (v3.0.1)
**What it is:** Automatically restarts Node.js server when files change

**Why it's used:**
- No need to manually restart server after code changes
- Speeds up development
- Watches for file changes in backend directory

**How it works in this project:**
- Used in development mode
- Monitors `backend/` directory
- Restarts server automatically on file save

---

### **http-proxy-middleware** (v3.0.5)
**What it is:** Proxy middleware for development

**Why it's used:**
- Proxies API requests from frontend (port 3000) to backend (port 5000)
- Avoids CORS issues during development
- Simplifies API calls (no need for full URLs)

**How it works in this project:**
- Configured in `frontend/src/setupProxy.js`
- All `/api/*` requests forwarded to `http://localhost:5000`
- Frontend can use relative URLs like `/api/auth/login`

---

### **React Scripts** (v5.0.1)
**What it is:** Configuration and scripts for Create React App

**Why it's used:**
- Pre-configured build tools (Webpack, Babel)
- Development server with hot reload
- Production build optimization

**How it works in this project:**
- Handles React app compilation
- Provides development server
- Builds production-ready static files

---

## 🚀 Deployment

### **Vercel**
**What it is:** Cloud platform for deploying web applications

**Why it's used:**
- Easy deployment for frontend and backend
- Automatic HTTPS
- Global CDN for fast loading

**How it works in this project:**
- Configuration in `vercel.json` files
- Can deploy both frontend and API functions
- Environment variables configured in Vercel dashboard

---

## 🔄 How Everything Works Together

### **Request Flow:**

1. **User Action** (e.g., clicks "Add to Cart")
   - Frontend React component handles the event

2. **API Request**
   - Axios sends HTTP request to `/api/cart/add`
   - JWT token automatically included in headers
   - Proxy forwards request to backend (port 5000)

3. **Backend Processing**
   - Express receives request
   - Auth middleware verifies JWT token
   - Route handler processes request
   - Mongoose queries MongoDB database

4. **Response**
   - Backend sends JSON response
   - Frontend receives data
   - React updates UI with new data

### **Authentication Flow:**

1. **Registration/Login**
   - User submits form → Frontend sends credentials to `/api/auth/register` or `/api/auth/login`
   - Backend validates input (express-validator)
   - Password hashed with bcryptjs
   - User saved to MongoDB (Mongoose)
   - JWT token generated and sent to frontend

2. **Authenticated Requests**
   - Token stored in localStorage
   - Axios automatically adds token to request headers
   - Backend middleware verifies token
   - Access granted or denied

3. **State Management**
   - AuthContext provides user state to all components
   - Components can check if user is logged in
   - Logout clears token and user state

### **Data Flow:**

```
User Interface (React)
    ↓
React Components
    ↓
Axios HTTP Requests
    ↓
Express.js API Routes
    ↓
Mongoose Models
    ↓
MongoDB Database
```

---

## 📦 Package Summary

### **Frontend Dependencies:**
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing
- `axios` - HTTP client

### **Backend Dependencies:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `express-validator` - Input validation
- `cors` - Cross-origin support
- `dotenv` - Environment variables

### **Development Dependencies:**
- `concurrently` - Run multiple commands
- `nodemon` - Auto-restart server
- `http-proxy-middleware` - Development proxy
- `react-scripts` - React build tools

---

## 🎯 Key Technologies Summary

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | React 18 | User interface |
| **Routing** | React Router DOM | Page navigation |
| **HTTP Client** | Axios | API communication |
| **State Management** | React Context API | Global state |
| **Backend Framework** | Express.js | API server |
| **Database** | MongoDB | Data storage |
| **ODM** | Mongoose | Database modeling |
| **Authentication** | JWT | Secure authentication |
| **Password Security** | bcryptjs | Password hashing |
| **Validation** | express-validator | Input validation |
| **Runtime** | Node.js | Server environment |

---

## 📚 Additional Resources

- **React Documentation:** https://react.dev/
- **Express.js Guide:** https://expressjs.com/
- **MongoDB Tutorial:** https://www.mongodb.com/docs/
- **JWT Introduction:** https://jwt.io/introduction
- **Mongoose Docs:** https://mongoosejs.com/docs/

---

*This documentation provides a complete overview of the technology stack used in the Gabbot E-commerce Platform. Each technology serves a specific purpose in creating a secure, scalable, and maintainable full-stack application.*

