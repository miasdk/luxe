

# Vite Ecommerce Template

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Search, Sorting & Wishlist Functionality](#search-sorting--wishlist-functionality)
    - [Search System Architecture](#1-search-system-architecture)
    - [Filtration & Sorting System](#2-filtration--sorting-system)
    - [Wishlist System](#3-wishlist-system)
4. [Performance Optimizations](#4-performance-optimizations)
5. [Future Enhancements](#5-future-enhancements)
6. [Wireframes](#wireframes)
7. [Technology Stack](#technology-stack)
8. [ERD Diagram](#erd-diagram)
9. [System Architecture](#system-architecture)
10. [License](#license)

---

## Introduction

eCart aims to provide a quick and easy way to get started with building an e-commerce application. It includes essential features like product management, user authentication, shopping cart, and basic checkout.

## Features

- **Product Management:**
  - Add, edit, and delete products.
  - Manage product categories and attributes.
  - Display product details with images.
- **User Authentication:**
  - User registration and login.
  - Secure user sessions.
- **Shopping Cart:**
  - Add products to the cart.
  - Update cart quantities.
  - Remove products from the cart.
- **Checkout:**
  - Stripe integration for secure payment processing.
  - Order placement and confirmation.
- **Order Management:**
  - View order history.
  - Track order status.
- **Responsive Design:**
  - Works seamlessly on desktops, tablets, and mobile devices.
- **Scalable Backend:**
  - Built with Node.js and Express.js for efficient and scalable backend operations.
  - Leverages PostgreSQL for reliable and efficient data storage.
- **Fast Development:**
  - Utilizes Vite for rapid development and a smooth development experience.

---

## Search, Sorting & Wishlist Functionality

### 1. Search System Architecture

**Frontend Implementation:**
- Search input in Navbar component
- SearchResultsPage for displaying results
- ProductContext for managing search state

**Search Process Flow:**
- User input triggers debounced search query
- Search parameters stored in URL for shareable/bookmarkable results
- React Query used for caching search results

**Backend Implementation:**
- PostgreSQL Full-Text Search with `tsvector` and `plainto_tsquery()`
- Fallback to ILIKE for pattern matching
- Weighted and ranked results

### 2. Filtration & Sorting System

- Hierarchical filters (category, attributes)
- Filters and sort parameters maintained in frontend state and URL
- Backend optimized with dynamic queries and indices
- Frontend and backend support for multiple sorting fields

### 3. Wishlist System

- Database: `wishlists` table with composite keys (`user_id`, `product_id`)
- Frontend: WishlistContext and AuthContext for state and authentication
- Backend: RESTful API with secure endpoints and Firebase auth verification

---

## 4. Performance Optimizations

- **Database:** GIN and B-tree indices, Redis caching
- **Frontend:** Code splitting, debounced updates, memoization
- **API:** Pagination, selective queries, batch operations

---

## 5. Future Enhancements

- **Search:** Elasticsearch, fuzzy matching, autocomplete, personalization
- **Filters:** Saved preferences, dynamic options, combination analysis
- **Wishlist:** Shared lists, notifications, batch operations

---

## Wireframes

![Wireframe 1](https://github.com/user-attachments/assets/cb807a79-91b9-416d-b7de-7912b011c884)
![Wireframe 2](https://github.com/user-attachments/assets/a6915a05-3b7c-465b-b2f3-01fbf598c715)
![Wireframe 3](https://github.com/user-attachments/assets/df765060-dbbb-4c04-a2c7-3f7bc69e2073)
![Wireframe 4](https://github.com/user-attachments/assets/121231e1-3672-4349-9f9c-1fa9c9cef3aa)
![Wireframe 5](https://github.com/user-attachments/assets/48a0f1f5-6c43-4415-b52d-b0061a2c6264)
![Wireframe 6](https://github.com/user-attachments/assets/b42e6e9b-0d2d-444a-8d84-4a8ffb1a2506)
![Wireframe 7](https://github.com/user-attachments/assets/8f835f1e-e282-4c7e-a05e-dfa6dbdfa5df)

---

## Technology Stack

### Frontend
- **Languages:** JavaScript
- **Frameworks:** React (with Vite)
- **UI Components:** ShadCN UI, TailwindCSS
- **Icons:** Lucide Icons
- **Data Fetching/Caching:** React Query, Axios
- **Form Validation:** React Hook Form, Zod
- **Notifications/Toasts:** React Hot Toast

### Backend
- **Languages:** Node.js, Express.js
- **Authentication:** Firebase Auth
- **Payment Processing:** Stripe
- **API Specification (UI):** OpenAPI (Swagger) (*In Progress*)
- **Database:** PostgreSQL

### Infrastructure & Design
- **Hosting:** Railway
- **Design:** Figma

---

## ERD Diagram

![Entity Relationship Diagram](https://github.com/user-attachments/assets/438baec4-890c-492f-98bb-f406d912a733)

---

## System Architecture

![System Design](https://github.com/user-attachments/assets/e6f36a80-aacb-4f3a-b1da-44c635f38c26)


## License

This project is licensed under the MIT License.

---

# eCart: Full-Stack Ecommerce Application
**Final Project Submission**

---

## Deployment & Live Application

**Live URLs:**
- **Frontend**: https://ecart-frontend.vercel.app (deployed on Vercel)
- **Backend API**: https://ecart-backend.railway.app (deployed on Railway)
- **Database**: PostgreSQL hosted on Railway

**Deployment Stack:**
I chose a split deployment approach that works really well:
- **Vercel for Frontend**: Automatic deployments from GitHub, global CDN, perfect for React apps
- **Railway for Backend + Database**: One platform for both my API and PostgreSQL database, simple environment management

This setup gives me the best of both worlds - Vercel's incredible frontend optimization and Railway's excellent backend hosting with managed database services.

---

## Project Title
**eCart - Vite Ecommerce Template**

## Group Members
- [Mia Tapia] - [23672664]


---

## Project Motivation

I chose to build eCart because I wanted to challenge myself with a comprehensive full-stack project that would demonstrate everything I've learned this semester. E-commerce applications are complex - they require you to think about user experience, data relationships, security, payments, and performance all at once.

**What drove me to build this:**
- I wanted to create something that felt real and useful, not just another todo app
- E-commerce touches so many different technical concepts - perfect for showcasing full-stack skills
- I was curious about implementing advanced features like full-text search and real-time cart updates
- I wanted experience integrating with real services like Stripe and Firebase that I'd use in industry

**Technical challenges I set for myself:**
- Building a scalable backend that could handle complex product queries and relationships
- Implementing search functionality that actually works well (PostgreSQL full-text search was a fun deep dive)
- Creating a smooth, responsive frontend that manages state efficiently across shopping cart, wishlist, and user sessions
- Integrating secure payment processing and user authentication
- Making sure the whole thing could actually be deployed and work in production

**Why this matters:**
This isn't just a class project for me - I built eCart as something I'd actually want to use and show to potential employers. It demonstrates that I can take a complex problem, break it down into manageable pieces, and build something that works end-to-end. Plus, the template approach means other developers could actually fork this and build their own e-commerce solutions.

---

## Tools and Technologies Used

### **Frontend Development**
- **React** - I chose React because I wanted to build something with reusable components and efficient state management
- **Vite** - Way faster than Create React App for development, and the build times are incredible
- **Tailwind CSS** - I love how quickly I can style components without writing custom CSS
- **ShadCN UI** - Pre-built components that look professional and saved me tons of time
- **React Query** - Game-changer for API calls and caching - no more manual loading states everywhere
- **React Hook Form** - Makes form validation actually enjoyable to work with
- **Zod** - TypeScript-style validation that catches errors before they happen
- **Lucide Icons** - Clean, consistent icons that match the modern aesthetic I was going for
- **React Hot Toast** - Simple notifications that don't get in the user's way

### **Backend Development**
- **Node.js & Express.js** - I'm comfortable with JavaScript, so keeping everything in one language made sense
- **PostgreSQL** - I wanted a real database with proper relationships, not just a document store
- **Firebase Auth** - Why reinvent the wheel? Google's auth is rock-solid and handles all the security stuff
- **Stripe** - The gold standard for payments - I trust them with money more than I trust myself
- **Axios** - Clean HTTP client that makes API calls readable

### **Deployment & Infrastructure**
- **Railway** - Perfect for hosting my backend and PostgreSQL database - just works
- **Vercel** - Ideal for React deployments with automatic builds from GitHub
- **Figma** - Used for wireframing and planning the UI before I started coding
- **Git/GitHub** - Version control and automated deployments
- **OpenAPI (Swagger)** - Working on proper API documentation (still in progress)

---

## Application Screenshots

### Home Page
![Homepage showing product showcase and navigation](https://github.com/user-attachments/assets/0b0761b4-fb96-4dbd-9438-1bce80778a9a)
![homepage2](https://github.com/user-attachments/assets/3a961aec-bab9-4128-a335-71dca5ee2f2e)
![homepage3](https://github.com/user-attachments/assets/d4a0f375-66e9-4fea-be00-7fcf6939fd2c)

*Main landing page featuring product categories and promotional banners*

### Product Catalog
![Product listing with search and filter capabilities](https://github.com/user-attachments/assets/f2eb826c-ec29-42b3-a847-6c0b28d65139)
*Product catalog with advanced search, filtering, and sorting functionality*

### Product Details
![Individual product page with detailed information](https://github.com/user-attachments/assets/c26410fb-35fc-40d7-b9f6-0d466b11e6a3)
*Detailed product view with images, specifications, and add-to-cart functionality*

### Shopping Cart
![Shopping cart interface with item management](https://github.com/user-attachments/assets/ee6b8097-ba03-44ec-8555-27a509d5e8d6)
*Shopping cart with quantity controls and price calculations*

### Checkout Process
![Secure checkout with Stripe integration](https://github.com/user-attachments/assets/84b82ecb-2a1e-492c-9bb3-af3298c7e4a0)
![checkout2](https://github.com/user-attachments/assets/8b2760a7-16e0-4c43-917a-1ae067842c95)
*Checkout page with secure payment processing via Stripe*

### User Dashboard
![User account management and order history](https://github.com/user-attachments/assets/1138a257-9a26-4074-971d-bd8d27201977)
![order_history](https://github.com/user-attachments/assets/09578a18-213c-4dbc-8364-448bbdca8307)
*User profile and order history management*

### Mobile Responsive Design
![Mobile-optimized interface](https://github.com/user-attachments/assets/c36990fb-f6e9-4990-9820-51f5f8ee2b87)
*Responsive design optimized for mobile and tablet devices*
user

---

## Application Functionality

### **What I Built - Core Features**

**Product Management That Actually Works:**
I spent a lot of time getting the product system right. Users can browse through a comprehensive catalog with real categories and detailed product information. The search functionality was probably the most challenging part - I implemented PostgreSQL full-text search using `tsvector` and `plainto_tsquery()` which gives much better results than basic string matching. The filtering and sorting system supports hierarchical categories and multiple product attributes, so users can actually find what they're looking for.

**Authentication & User Management:**
I integrated Firebase Auth because I wanted to use something production-ready rather than rolling my own authentication. Users can register, log in, and maintain their profiles securely. I implemented protected routes and role-based access, plus all the expected features like password reset and session persistence.

**Shopping Cart & Checkout Experience:**
The shopping cart updates in real-time and persists across browser sessions - no losing your items when you refresh the page. I built the checkout process with Stripe integration for secure payment processing. Users get order confirmations and can track their order history.

**Order Management System:**
I created a complete order management system with tracking, status updates, and admin capabilities. Orders get unique numbers, and I track everything from initial cart to final delivery status.

### **Advanced Features I'm Proud Of**

**Smart Search System:**
The search goes beyond basic keyword matching. I implemented debounced search input for performance, URL-based search parameters so results are shareable, and a fallback system that uses ILIKE patterns when the full-text search doesn't find results. The results are weighted and ranked for relevance.

**Wishlist Functionality:**
I built a personal wishlist system with its own database table using composite keys for efficient queries. It integrates with the user authentication system and provides real-time updates through React context.

**Performance Optimizations:**
I implemented code splitting and lazy loading for faster initial page loads, used React Query for intelligent data caching, debounced user inputs to reduce API calls, and set up proper database indexing. The app also supports pagination for large data sets.

**Responsive Design:**
Using Tailwind CSS, I built a mobile-first responsive design that works well on desktop, tablet, and mobile. The interfaces are touch-friendly and I've included progressive web app capabilities.

### **Technical Architecture I Implemented**

**Database Design:**
I designed a normalized PostgreSQL schema with proper relationships and constraints. The indexing strategy supports both search and filtering operations efficiently, and I used foreign keys appropriately to maintain data integrity.

**API Architecture:**
My backend follows RESTful design principles with consistent endpoint structure, comprehensive error handling and validation, secure authentication middleware, and I'm working on API documentation with OpenAPI.

**Frontend Architecture:**
I built a component-based React architecture with reusable UI components, used Context API for global state management, created custom hooks to abstract business logic, and implemented form validation with Zod schemas for type safety.

---
## Future Enhancements

**Search Improvements I Want to Add:**
- Elasticsearch integration for even better search results (PostgreSQL full-text search is good, but Elasticsearch would be amazing)
- Fuzzy matching so typos don't break search
- Autocomplete suggestions and search history
- Personalized search results based on what users actually buy
**Performance & Scaling:**
- Redis caching for frequently accessed data (product catalogs, user sessions)
- Batch operations to reduce database load
- CDN integration for image optimization
- Microservices architecture if this thing ever gets big enough to need it

**Admin Features I Need:**
- Better inventory management dashboard
- Sales analytics and reporting
- Customer support tools
- Automated email marketing integration
