# eCart - Full-Stack E-Commerce Platform

A modern marketplace application built with React, Node.js, and PostgreSQL. Features user authentication, product management, shopping cart functionality, and integrated payments.

**[🌐 Live Demo](https://ecartdemo.vercel.app)** | **[📖 API Docs](https://ecart-mxsk.onrender.com/api-docs)**

---

## 🛠️ Tech Stack

**Frontend**
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

**Backend**
- Node.js with Express
- PostgreSQL database
- Firebase Authentication
- Stripe payment processing
- Swagger API documentation

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL on Railway

---

## ✨ Key Features

### User Experience
- **User Authentication** - Firebase Auth with Google OAuth integration
- **Product Browsing** - Category filtering, search functionality, and product details
- **Shopping Cart** - Add to cart, quantity management, and persistent cart state
- **Wishlist System** - Save favorite products with like functionality
- **User Profiles** - Manage personal information and view order history

### Seller Features
- **Product Listings** - Create, edit, and delete product listings
- **Inventory Management** - Manage product details, pricing, and availability
- **Brand Management** - Create new brands during product creation

### Commerce Features
- **Payment Processing** - Stripe integration for secure transactions
- **Order Management** - Complete order workflow from cart to confirmation
- **Search & Filtering** - Full-text search with category and price filters

### Technical Features
- **RESTful API** - Well-documented endpoints with Swagger/OpenAPI
- **Responsive Design** - Mobile-first approach with clean UI
- **Performance Optimized** - Efficient database queries and caching
- **Error Handling** - Comprehensive error management and user feedback

---

## 🗄️ Database Schema

The application uses a normalized PostgreSQL schema with the following core entities:

- **Users** - User accounts with Firebase integration
- **Products** - Product catalog with seller relationships
- **Categories/Brands** - Product classification system
- **Cart & Orders** - Shopping and transaction management
- **Wishlists** - User favorites and likes

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Firebase project
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eCart
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both server and client directories:
   
   **Server (.env)**
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_url
   FIREBASE_PROJECT_ID=your_firebase_project_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
   
   **Client (.env)**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Database Setup**
   ```bash
   cd server
   node config/reset.js  # Initialize database with sample data
   ```

5. **Start Development Servers**
   ```bash
   # Start backend (from server directory)
   npm start
   
   # Start frontend (from client directory)  
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

---

## 📱 Application Screenshots

### Homepage
- Clean, modern design with featured products
- Category navigation and brand showcase
- Newsletter subscription

### Product Pages
- Detailed product information
- Add to cart and wishlist functionality
- Seller information display

### User Dashboard
- Profile management
- Order history
- Product listing management

---

## 🔧 API Endpoints

The application provides a comprehensive REST API with 30+ endpoints:

- **Authentication** - User registration, login, profile management
- **Products** - CRUD operations, filtering, search
- **Cart** - Add/remove items, quantity updates
- **Orders** - Order creation, payment processing
- **Wishlists** - Manage user favorites

Full API documentation available at: [API Docs](https://ecart-mxsk.onrender.com/api-docs)

---

## 🌐 Live Application

The application is deployed and fully functional:

| Service | URL | Status |
|---------|-----|--------|
| Frontend | [ecartdemo.vercel.app](https://ecartdemo.vercel.app) | ✅ Live |
| Backend API | [ecart-mxsk.onrender.com](https://ecart-mxsk.onrender.com) | ✅ Live |
| API Documentation | [ecart-mxsk.onrender.com/api-docs](https://ecart-mxsk.onrender.com/api-docs) | ✅ Live |

---

## 📝 Development Process

This project demonstrates:

- **Full-stack development** with modern JavaScript frameworks
- **Database design** with PostgreSQL and proper relationships
- **API development** with comprehensive documentation
- **Authentication integration** using Firebase
- **Payment processing** with Stripe
- **Deployment** to cloud platforms
- **Responsive design** principles
- **Error handling** and user experience

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For questions or feedback about this project, please open an issue or contact me directly.

---

*This project showcases modern full-stack development practices and is designed to demonstrate technical capabilities in web development, database design, and cloud deployment.*
