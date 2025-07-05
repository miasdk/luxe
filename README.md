# eCart - Modern E-Commerce Platform

<div align="center">

**A full-stack e-commerce platform built with React, Node.js, and PostgreSQL**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-brightgreen)](https://ecartdemo.vercel.app)
[![API Docs](https://img.shields.io/badge/API_Docs-Swagger-blue)](https://ecart-mxsk.onrender.com/api-docs)
[![Backend](https://img.shields.io/badge/Backend-Render-purple)](https://ecart-mxsk.onrender.com)

[View Live Demo](https://ecartdemo.vercel.app) • [API Documentation](https://ecart-mxsk.onrender.com/api-docs) • [Report Issues](https://github.com/miasdk/ecart/issues)

</div>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Live Application](#live-application)
- [Core Capabilities](#core-capabilities)
- [Technology Stack](#technology-stack)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Database Schema & Optimization](#database-schema--optimization)
- [API Documentation & Testing](#api-documentation--testing)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Key Technical Features](#key-technical-features)
- [Deployment](#deployment)
- [Development Methodology](#development-methodology)
- [Future Enhancements](#future-enhancements)
- [About This Project](#about-this-project)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

eCart is a production-ready e-commerce platform engineered to demonstrate enterprise-level full-stack development capabilities. The application showcases advanced architectural patterns, comprehensive API documentation, and modern DevOps practices suitable for scalable commercial deployment.

**Technical Highlights:**
- **Scalable Architecture** - Microservices-ready design with clear separation of concerns
- **Production Database** - PostgreSQL with optimized queries, full-text search, and proper indexing
- **Comprehensive API** - 30+ documented endpoints with interactive testing via Swagger/OpenAPI
- **Modern Authentication** - Firebase integration with Google OAuth 2.0 and JWT token validation
- **Payment Processing** - PCI-compliant Stripe integration with live payment handling
- **Professional Deployment** - Multi-environment CI/CD pipeline with automated testing

### Core Capabilities

<div align="center">

| Feature | Technology | Status |
|---------|------------|--------|
| **E-Commerce Engine** | React + Node.js | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **Social Like System** | PostgreSQL + React | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **Search System** | PostgreSQL Full-Text | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **Payment Processing** | Stripe Live Integration | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **Authentication** | Firebase + Google OAuth | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **API Documentation** | Swagger/OpenAPI | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |
| **Cloud Deployment** | Vercel + Render | ![Complete](https://img.shields.io/badge/🟢-Complete-success) |

</div>

**Advanced Features**
- **Social Commerce System** - Instagram-style product likes with heart icons and dynamic like counts
- **Google Authentication** - One-click sign-in with Google OAuth 2.0 integration and profile synchronization
- **Intelligent Search System** - PostgreSQL full-text search with relevance ranking and multi-criteria filtering
- **Live Payment Infrastructure** - Stripe integration with production keys, SCA compliance and webhook validation
- **Real-Time Cart Management** - Persistent shopping cart with optimistic UI updates and conflict resolution
- **Comprehensive User Management** - Firebase Authentication with Google OAuth and role-based access control
- **Listing Management System** - Users can create, edit, delete, and manage their own product listings
- **Dynamic Brand Management** - Users can create new brands on-the-fly during product listing creation
- **Professional Profile Dashboard** - Clean, minimalist profile page with listing management and order history
- **Newsletter Subscription** - Complete email subscription system with database integration
- **Interactive API Documentation** - Swagger/OpenAPI 3.0 with live testing capabilities for all 30+ endpoints
- **Responsive Progressive Web App** - Mobile-first design with offline capabilities and performance optimization
- **Production Monitoring** - Health checks, error tracking, and performance metrics

---

## Live Application

> **Production URLs** - All services deployed and operational with live payments

| Service | Status | URL | Description |
|---------|--------|-----|-------------|
| **Frontend** | ![Status](https://img.shields.io/badge/🟢-Live-success) | [ecartdemo.vercel.app](https://ecartdemo.vercel.app) | React application |
| **Backend API** | ![Status](https://img.shields.io/badge/🟢-Live-success) | [ecart-mxsk.onrender.com](https://ecart-mxsk.onrender.com) | Node.js REST API |
| **API Documentation** | ![Status](https://img.shields.io/badge/🟢-Live-success) | [ecart-mxsk.onrender.com/api-docs](https://ecart-mxsk.onrender.com/api-docs) | Interactive Swagger docs |
| **Database** | ![Status](https://img.shields.io/badge/🟢-Live-success) | `PostgreSQL on Render` | Production database |

---

## Technology Stack

<table>
<tr>
<td>

**Frontend**
```
React 18          → Modern UI framework
Vite              → Fast build tool  
Tailwind CSS      → Utility-first styling
ShadCN UI         → Component library
React Query       → State management
React Hook Form   → Form handling
Zod               → Type validation
```

</td>
<td>

**Backend**
```
Node.js           → JavaScript runtime
Express           → Web framework
PostgreSQL        → Primary database
Firebase Auth     → Authentication + OAuth
Stripe            → Payment processing
Swagger/OpenAPI   → API documentation
```

</td>
</tr>
<tr>
<td>

**Infrastructure**
```
Vercel            → Frontend hosting
Render            → Backend hosting
GitHub            → Version control
```

</td>
<td>

**Development**
```
Git               → Version control
ESLint            → Code linting
Prettier          → Code formatting
Postman           → API testing
```

</td>
</tr>
</table>

---

## Database Schema & Optimization

The application utilizes a normalized PostgreSQL schema optimized for e-commerce operations:

```sql
-- Core Entity Tables
users                    categories              brands
├── id (SERIAL PK)      ├── id (SERIAL PK)     ├── id (SERIAL PK)
├── uid (VARCHAR)       ├── name (VARCHAR)     ├── name (VARCHAR UNIQUE)
├── email (VARCHAR)     └── description (TEXT) └── image (VARCHAR)
├── display_name        
└── created_at          

-- Product Management
products                                    product_colors
├── id (SERIAL PK)                         ├── product_id (FK)
├── title (VARCHAR) [INDEXED]             ├── color_id (FK)
├── description (TEXT) [FULL-TEXT]        └── PRIMARY KEY (product_id, color_id)
├── price (DECIMAL) [INDEXED] 
├── num_likes (INTEGER)                 
├── image (VARCHAR)                        product_sizes
├── category_id (FK → categories.id)      ├── product_id (FK)
├── brand_id (FK → brands.id)             ├── size_id (FK)
├── search_vector (TSVECTOR) [GIN INDEX]  └── PRIMARY KEY (product_id, size_id)
└── created_at [INDEXED]                  

-- Shopping & Orders
carts                    cart_products              orders
├── id (SERIAL PK)      ├── cart_id (FK)          ├── id (SERIAL PK)
├── user_id (FK)        ├── product_id (FK)       ├── user_id (FK)
└── created_at          ├── quantity (INTEGER)    ├── total_price (DECIMAL)
                        └── PK (cart_id, product_id) ├── status (ENUM)
                                                   ├── stripe_payment_id
order_items             wishlists                  ├── created_at
├── id (SERIAL PK)      ├── user_id (FK)          └── updated_at
├── order_id (FK)       ├── product_id (FK)       
├── product_id (FK)     ├── created_at            
├── quantity            └── PK (user_id, product_id)
└── unit_price          
```

### Performance Optimizations
- **Strategic Indexing** - B-tree indexes on frequently queried columns (price, created_at, category_id)
- **Full-Text Search** - GIN indexes on `tsvector` columns for sub-second search performance
- **Connection Pooling** - Optimized database connection management
- **Query Optimization** - Materialized views for complex product joins
- **Database Views** - `product_details` view combining products, categories, and brands

---

## Architecture & Design Patterns

### System Architecture

```mermaid
graph LR
    A[React Client<br/>Vercel CDN] -->|HTTPS| B[Express API<br/>Render]
    B -->|SQL| C[PostgreSQL<br/>Database]
    A -->|OAuth| D[Firebase Auth]
    A -->|Google OAuth| E[Google Identity]
    B -->|Verify Token| D
    B -->|Payment| F[Stripe API]
    
    subgraph "Client Layer"
        A
    end
    
    subgraph "API Layer"
        B
    end
    
    subgraph "Data Layer"
        C
    end
    
    subgraph "External Services"
        D
        E
        F
    end
```

<details>
<summary><strong>📋 Component Breakdown</strong></summary>

**React Client (Vercel CDN)**
- State management with React Context and useState
- API caching and synchronization via React Query
- Form validation using Zod schemas
- Global CDN distribution for optimal performance
- Google OAuth integration with Firebase

**Express API (Render)**
- RESTful endpoint design following OpenAPI 3.0 standards
- Firebase ID token verification middleware
- Rate limiting and request throttling
- Comprehensive error handling and logging

**PostgreSQL Database**
- ACID transaction support for data integrity
- Full-text search with GIN indexing
- Optimized queries with strategic B-tree indexes
- Connection pooling for performance

**External Services**
- Firebase Authentication for secure user management
- Google OAuth 2.0 for social authentication
- Stripe payment processing with webhook verification
- Render infrastructure for auto-scaling and monitoring

</details>

### Design Patterns Implemented
- **MVC Architecture** - Clear separation between models, views, and controllers
- **Repository Pattern** - Data access layer abstraction for testability
- **Service Layer** - Business logic encapsulation and reusability
- **Factory Pattern** - Database connection and configuration management
- **Observer Pattern** - Real-time cart updates and state synchronization
- **Strategy Pattern** - Payment processing with multiple provider support

---

## Screenshots

<details>
<summary>View Application Screenshots</summary>

### Homepage
![Homepage](https://github.com/user-attachments/assets/0b0761b4-fb96-4dbd-9438-1bce80778a9a)

### Product Catalog with Search and Filters
![Product Catalog](https://github.com/user-attachments/assets/f2eb826c-ec29-42b3-a847-6c0b28d65139)

### Product Detail Page
![Product Details](https://github.com/user-attachments/assets/c26410fb-35fc-40d7-b9f6-0d466b11e6a3)

### Shopping Cart
![Shopping Cart](https://github.com/user-attachments/assets/ee6b8097-ba03-44ec-8555-27a509d5e8d6)

### Checkout Process
![Checkout](https://github.com/user-attachments/assets/84b82ecb-2a1e-492c-9bb3-af3298c7e4a0)

### Order History
![Order History](https://github.com/user-attachments/assets/09578a18-213c-4dbc-8364-448bbdca8307)

### Mobile Responsive Design
![Mobile View](https://github.com/user-attachments/assets/c36990fb-f6e9-4990-9820-51f5f8ee2b87)

</details>

---

## Getting Started

### Quick Setup

```bash
# 1. Clone and install
git clone https://github.com/yourusername/ecart.git
cd ecart

# 2. Backend setup
cd backend && npm install

# 3. Frontend setup  
cd ../frontend && npm install

# 4. Environment configuration (see below)

# 5. Start development
cd backend && npm run dev     # Terminal 1
cd frontend && npm run dev    # Terminal 2
```

<details>
<summary><strong>🔧 Prerequisites & Environment Setup</strong></summary>

**Prerequisites**
- Node.js 18 or higher
- PostgreSQL 14 or higher  
- Firebase project with Authentication enabled
- Google OAuth configured in Firebase
- Stripe account for payment processing

**Backend `.env`**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/ecart
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
```

**Frontend `.env.local`**
```env
VITE_API_URL=http://localhost:3001/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

**Database Setup**
```bash
createdb ecart
cd backend && npm run db:setup  # if migrations exist
```

**Google OAuth Setup**
1. Firebase Console → Authentication → Sign-in providers → Google → Enable
2. Google Cloud Console → APIs & Services → Credentials
3. Add authorized redirect URIs and JavaScript origins
4. Configure OAuth consent screen

</details>

### Access Points

| Service | Local URL | Description |
|---------|-----------|-------------|
| **Frontend** | `http://localhost:5173` | React development server |
| **Backend** | `http://localhost:3001` | Express API server |
| **API Docs** | `http://localhost:3001/api-docs` | Interactive documentation |

---

## API Documentation & Testing

> **Interactive API Documentation**: Experience the API with live testing capabilities

<div align="center">

[![API Documentation](https://img.shields.io/badge/📚_Interactive_Documentation-Swagger_UI-85EA2D?style=for-the-badge&logo=swagger)](https://ecart-mxsk.onrender.com/api-docs)

**30+ Documented Endpoints** | **Live Testing** | **Authentication Ready**

</div>

**Development**: [localhost:3001/api-docs](http://localhost:3001/api-docs) • **Production**: [ecart-mxsk.onrender.com/api-docs](https://ecart-mxsk.onrender.com/api-docs)

### API Architecture Highlights
- **30+ Documented Endpoints** - Complete CRUD operations across all resources
- **Interactive Testing** - Swagger UI with authentication and live API testing
- **Schema Validation** - Request/response validation with detailed error handling
- **Authentication Integration** - Firebase ID token verification with bearer authentication
- **Rate Limiting** - API throttling and abuse prevention
- **CORS Configuration** - Secure cross-origin request handling

### Core API Endpoints

| Resource | Endpoint | Method | Description | Auth |
|----------|----------|--------|-------------|------|
| **Products** | `/api/products` | GET | Paginated product listing with filters | No |
| | `/api/products/search` | GET | Full-text search with ranking | No |
| | `/api/products/filter` | GET | Multi-criteria filtering | No |
| | `/api/products/{id}` | GET | Product details with variants | No |
| **Cart** | `/api/cart/user/{userId}` | GET | User's cart with product details | Yes |
| | `/api/cart/add-item` | POST | Add/update cart items | Yes |
| | `/api/cart/remove-item` | DELETE | Remove cart items | Yes |
| **Orders** | `/api/orders` | POST | Create order with payment processing | Yes |
| | `/api/orders/user/{userId}` | GET | User's order history | Yes |
| | `/api/orders/{id}/status` | PUT | Update order status (admin) | Yes |
| **Users** | `/api/users/register` | POST | User registration with Firebase | No |
| | `/api/users/{id}` | GET | User profile management | Yes |
| **Wishlist** | `/api/wishlist/user/{userId}` | GET | User's saved products | Yes |
| **Listings** | `/api/products/seller/{sellerId}` | GET | User's created listings | Yes |
| | `/api/products` | POST | Create new product listing | Yes |
| | `/api/products/{id}` | PUT | Update product listing | Yes |
| | `/api/products/{id}` | DELETE | Delete product listing | Yes |
| **Brands** | `/api/brands` | GET | Get all brands | No |
| | `/api/brands/{id}` | GET | Get brand by ID | No |
| | `/api/brands` | POST | Create new brand | No |
| | `/api/brands/find-or-create` | POST | Find or create brand by name | No |
| | `/api/brands/brands-with-count` | GET | Get brands with product counts | No |
| **Newsletter** | `/api/newsletter/subscribe` | POST | Subscribe to newsletter | No |
| | `/api/newsletter/unsubscribe` | POST | Unsubscribe from newsletter | No |

### API Response Standards
```json
// Success Response
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}

// Error Response
{
  "error": "Validation Error",
  "message": "Invalid product ID format",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Key Technical Features

### Advanced Authentication System
The authentication system supports multiple sign-in methods with Firebase integration:
- **Email/Password Authentication** - Traditional registration and login
- **Google OAuth 2.0** - One-click sign-in with Google accounts
- **Profile Synchronization** - Automatic user profile creation in backend database
- **JWT Token Validation** - Secure API endpoint protection
- **Session Management** - Persistent authentication across browser sessions

### Dynamic Brand Management System
Advanced brand creation system allows marketplace scalability:
- **Smart Brand Selector** - Searchable dropdown with autocomplete functionality
- **On-the-Fly Brand Creation** - Users can create new brands during product listing
- **Duplicate Prevention** - Database constraints prevent brand name conflicts
- **Automatic Brand Discovery** - Find-or-create API endpoint for seamless UX
- **Real-time Brand Updates** - Frontend automatically refreshes brand lists

### Social Commerce Features
Interactive like system enhances user engagement and provides social proof:
- **Product Like System** - Instagram-style heart icons with dynamic like counts
- **Wishlist Integration** - Liking products adds them to user wishlist
- **Real-time Updates** - Like counts update dynamically when users interact
- **Social Proof Display** - Popular products show engagement metrics
- **Cross-platform Consistency** - Like counts visible across all product views

### Advanced Product Search
The search system uses PostgreSQL's full-text search capabilities with `tsvector` and `plainto_tsquery()` for relevance-ranked results. The search includes:
- Title and description matching
- Brand and category filtering
- Price range filtering
- Size, color, and condition attributes
- Relevance-based result ranking

### Cart Management
The shopping cart system provides:
- Persistent storage across browser sessions
- Real-time quantity updates with optimistic UI
- Automatic cart creation for new users
- Stock validation before adding items
- Seamless checkout integration

### Order Processing
Complete order management includes:
- Stripe payment intent creation with live keys
- Order status tracking (pending, paid, shipped, delivered)
- Email confirmations (when implemented)
- Order history with detailed item information
- Admin order management capabilities

### Listing Management System
The platform includes a comprehensive listing management system for sellers:
- **Create Listings** - Multi-step form with image upload, category selection, and attribute management
- **Edit Listings** - Update product details, pricing, and availability
- **Delete Listings** - Remove products with confirmation dialogs
- **My Listings Dashboard** - Centralized view of all user-created products with quick actions
- **Seller Tracking** - Database tracking of which user created each listing

### Professional Profile Dashboard
Clean, minimalist profile page designed for professional appearance:
- **User Information** - Display name, email, join date, and profile picture
- **Activity Statistics** - Order count, wishlist items, and listing metrics
- **Listing Management** - Integrated view and management of user's products
- **Quick Actions** - Easy access to create listings and view orders
- **Responsive Design** - Mobile-optimized layout with clean typography

### Newsletter Subscription System
Complete email marketing integration with database persistence:
- **Subscribe/Unsubscribe** - User-friendly newsletter signup with validation
- **Database Integration** - Persistent subscriber management with PostgreSQL
- **API Endpoints** - RESTful endpoints for subscription management
- **Email Validation** - Input validation and duplicate prevention

### Performance Optimizations
- Code splitting for faster initial load times
- React Query for intelligent data caching
- Database indexing for quick product searches
- Lazy loading of images and components
- Debounced search input to reduce API calls

---

## Deployment

### Frontend Deployment (Vercel)
The React application is deployed on Vercel with:
- Automatic deployments from the main GitHub branch
- Preview deployments for pull requests
- Environment variable management for production keys
- Custom domain support
- Performance monitoring and analytics

### Backend Deployment (Render)
The Node.js API is deployed on Render featuring:
- Container-based deployment with automatic scaling
- Managed PostgreSQL database with automated backups
- Environment variable management and secrets
- Automatic SSL certificate management
- Application monitoring and logging

### CI/CD Pipeline
- GitHub integration for automatic deployments
- Environment-specific build configurations
- Database migration handling
- Health check endpoints for monitoring

---

## Development Methodology

This project was built using modern full-stack development practices:

### Code Organization
- **MVC Architecture** - Separation of models, controllers, and routes
- **Service Layer Pattern** - Business logic abstraction
- **Component-Based Frontend** - Reusable React components
- **Custom Hooks** - Shared state logic and API interactions

### Database Design
- **Normalized Schema** - Efficient data organization with proper relationships
- **Foreign Key Constraints** - Data integrity enforcement
- **Optimized Queries** - Strategic indexing for performance
- **Database Views** - Simplified complex joins for frequent queries

### Security Implementation
- **Firebase Authentication** - Secure user registration and login
- **Google OAuth 2.0** - Social authentication integration
- **JWT Token Validation** - Protected API endpoints
- **Input Validation** - Zod schemas for type safety
- **CORS Configuration** - Controlled cross-origin requests
- **Environment Variables** - Secure configuration management

---

## Future Enhancements

Planned improvements and features for future development:

- **Admin Dashboard** - Comprehensive order and inventory management
- **Product Reviews** - Customer review and rating system
- **Inventory Tracking** - Real-time stock management with low stock alerts
- **Email Notifications** - Order confirmations and shipping updates
- **Advanced Analytics** - Sales reporting and customer insights
- **Mobile Application** - React Native app for iOS and Android
- **Recommendation Engine** - AI-powered product suggestions
- **Multi-vendor Support** - Marketplace functionality for multiple sellers
- **Social Authentication** - GitHub, Facebook, and Twitter OAuth integration
- **Product Rating System** - Star ratings and review analytics integration
- **Recommendation Engine** - AI-powered product suggestions based on likes and purchases

---

## About This Project

**Developer**: Mia Tapia  
**Institution**: CUNY Hunter College 
**Semester**: Upper Junior

### Technical Achievements

This project represents a comprehensive demonstration of modern software engineering practices and enterprise-level development capabilities:

**Full-Stack Proficiency**
- **Frontend**: Advanced React patterns including custom hooks, context management, and performance optimization
- **Backend**: RESTful API design with proper HTTP semantics, middleware architecture, and error handling
- **Database**: Normalized schema design, query optimization, and advanced PostgreSQL features

**DevOps & Production Readiness**
- **Cloud Deployment**: Multi-environment CI/CD pipeline with Vercel and Render
- **Documentation**: Interactive API documentation exceeding industry standards
- **Monitoring**: Health checks, error tracking, and performance metrics
- **Security**: Firebase ID token authentication, Google OAuth, input validation, and secure payment processing

**Software Engineering Practices**
- **Architecture**: Clean separation of concerns with scalable design patterns
- **Testing**: Comprehensive API testing through interactive documentation
- **Version Control**: Professional Git workflow with feature branching
- **Code Quality**: Consistent coding standards and modular component architecture

### Business Impact Simulation

eCart demonstrates understanding of real-world e-commerce challenges:
- **Scalability**: Architecture designed to handle enterprise-level traffic
- **User Experience**: Intuitive interface with modern authentication options
- **Data Integrity**: ACID transactions and proper error handling
- **Payment Security**: PCI-compliant Stripe integration with live payment processing
- **Operational Excellence**: Comprehensive logging and monitoring capabilities

This project showcases the ability to deliver production-ready software that meets both technical requirements and business objectives, demonstrating readiness for professional software development roles.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## Contact

- **GitHub**: [@miasdk](https://github.com/miasdk)
- **Email**: miatapiaswe@gmail.com
- **LinkedIn**: [Mia Elena](https://www.linkedin.com/in/miaelena/)
- **Project Repository**: [GitHub Repository](https://github.com/miasdk/ecart)

---

<div align="center">

Built with dedication by [Mia Tapia](https://github.com/miasdk)

</div>