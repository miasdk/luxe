

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

If you’d like the Markdown in a downloadable file, let me know!
