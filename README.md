# Vite Ecommerce Template

This is a basic e-commerce platform built with Vite, React, and a custom Node.js/PostgreSQL backend. It provides a solid foundation for building your own online store.

## Table of Contents

1.  **Introduction**
2.  **Features**
3.  **Wireframes**
4.  **Technology Stack**
5.  **Entry Relationship Diagram**
6.  **System Architecture** 
7.  **Contributing**
8.  **License**

## 1. Introduction

eCart aims to provide a quick and easy way to get started with building an e-commerce application. It includes essential features like product management, user authentication, shopping cart, and basic order processing. You can use this as a starting point for your own custom e-commerce projects, tailoring it to your specific needs.

## 2. Features

*   **Product Management:**
    *   Add, edit, and delete products.
    *   Manage product categories and attributes.
    *   Display product details with images.
*   **User Authentication:**
    *   User registration and login.
    *   Secure user sessions.
*   **Shopping Cart:**
    *   Add products to the cart.
    *   Update cart quantities.
    *   Remove products from the cart.
*   **Checkout:**
    *   Stripe integration for secure payment processing.
    *   Order placement and confirmation.
*   **Order Management:**
    *   View order history.
    *   Track order status.
*   **Responsive Design:**
    *   Works seamlessly on desktops, tablets, and mobile devices.
*   **Scalable Backend:**
    *   Built with Node.js and Express.js for efficient and scalable backend operations.
    *   Leverages PostgreSQL for reliable and efficient data storage.
*   **Fast Development:**
    *   Utilizes Vite for rapid development and a smooth development experience.

## Search, Sorting & Wishlist Functionality

---

## 1. Search System Architecture

### Frontend Implementation
- **Component Structure:**
  - Search input in Navbar component
  - SearchResultsPage for displaying results
  - ProductContext for managing search state

- **Search Process Flow:**
  - User input triggers debounced search query
  - Search parameters stored in URL for shareable/bookmarkable results
  - React Query used for caching search results

### Backend Implementation
- **PostgreSQL Full-Text Search:**
  - `tsvector` column on products table: `search_vector`
    * Converts product text into searchable "lexemes" (word roots)
    * Removes stop words and handles word variations automatically
  - Pre-generated indices using `to_tsvector()` on title and description:
    ```sql
    -- In reset.js, adding search capability to products
    UPDATE products 
    SET search_vector = to_tsvector('english', title || ' ' || description);
    
    -- Create performance-optimized index
    CREATE INDEX product_search_idx ON products USING GIN (search_vector);
    ```
  - Query using `plainto_tsquery()` for natural language search:
    ```sql
    -- When user searches "blue running shoes"
    SELECT * FROM product_details
    WHERE search_vector @@ plainto_tsquery('english', 'blue running shoes')
    ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'blue running shoes')) DESC;
    ```
    * Finds products containing all concept roots ("blue", "run", "shoe")
    * Ranks results by relevance (title matches prioritized)

```sql
-- Search query example
SELECT * FROM product_details
WHERE search_vector @@ plainto_tsquery('english', $1)
ORDER BY ts_rank(to_tsvector('english', title), plainto_tsquery($1)) DESC;
```

- **Fallback Search Strategy:**
  - ILIKE pattern matching as backup
  - Prioritizes exact title matches, then brand, then category
  - Returns results in weighted relevance order

---

## 2. Filtration & Sorting System

### Filter System Design
- **Hierarchical Filter Structure:**
  - Primary filters (categories in sidebar)
  - Secondary filters (attributes in top bar)
  - Filter counts calculated dynamically from database

- **Filter Data Flow:**
  - ProductContext maintains filter state
  - URL parameters updated via `window.history.replaceState`
  - Backend queries optimized with ANY operator

```javascript
// Dynamic SQL query construction for filtering
let selectQuery = `
    SELECT * 
    FROM product_details
    WHERE 1=1
`;

if (category) {
    selectQuery += ` AND category_name = $${paramIndex}`;
    queryParams.push(category);
    paramIndex++;
}

if (size) { 
    selectQuery += ` AND $${paramIndex} = ANY (sizes)`;
    queryParams.push(size);
    paramIndex++;
}
```

### Sorting Implementation
- **Frontend Sorting:**
  - Dropdown with sort options in FilterTopBar
  - Sort parameters added to request URL
  - UI updates immediately upon sort change

- **Backend Sorting:**
  - Dynamic ORDER BY clause creation
  - Supports multiple fields and directions
  - SQL Injection prevention with parameter validation

```javascript
// Safe dynamic sorting
selectQuery += ` ORDER BY ${
  ['title', 'price', 'created_at'].includes(sortBy) ? sortBy : 'title'
} ${sortOrder === 'DESC' ? 'DESC' : 'ASC'}`;
```

---

## 3. Wishlist System

### Data Model
- **Database Structure:**
  - `wishlists` table with composite keys:
    - `user_id` (FK to users)
    - `product_id` (FK to products)
  - Timestamp for tracking add date

```sql
CREATE TABLE wishlists (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
```

### Frontend Implementation
- **State Management:**
  - WishlistContext provides app-wide wishlist state
  - User authentication state from AuthContext
  - Optimistic UI updates for instant feedback

- **Key Functionality:**
  - Toggle wishlist item (add/remove)
  - Check if item is in wishlist
  - Fetch user's wishlist
  - Clear wishlist

```jsx
// Wishlist toggle in product card
<button 
  onClick={() => toggleWishlistItem(productId)}
  className={`${inWishlist ? 'text-red-500' : 'text-gray-400'}`}
>
  {inWishlist ? <FaHeart /> : <FaRegHeart />}
</button>
```

### Backend API
- **RESTful Endpoints:**
  - GET `/api/wishlist/user/:uid` - Fetch user's wishlist
  - POST `/api/wishlist` - Add item to wishlist
  - DELETE `/api/wishlist/user/:uid/product/:productId` - Remove item
  - DELETE `/api/wishlist/user/:uid` - Clear all items

- **Security:**
  - Firebase auth verification middleware
  - User ID validation to prevent unauthorized access

---

## 4. Performance Optimizations

### Database Optimizations
- **Indices:**
  - GIN index on search_vector column
  - B-tree indices on frequently queried columns
  - Composite indices for common filter combinations

- **Caching:**
  - Redis cache for frequently accessed filter options
  - Product view materialization for complex queries

### Frontend Optimizations
- **Code Splitting:**
  - React.lazy for route-based splitting
  - Dynamic imports for heavy components

- **State Management:**
  - Debounced filter updates to prevent excessive API calls
  - Memoized selectors with useCallback and useMemo
  - Optimistic UI updates for better perceived performance

### API Optimizations
- **Query Efficiency:**
  - Pagination for large result sets
  - Selective field retrieval with targeted queries
  - Batch operations for multiple updates

---

## 5. Future Enhancements

### Search Improvements
- Elasticsearch integration
- Fuzzy matching for typo tolerance
- Autocomplete suggestions
- Personalized search results

### Filter System
- Saved filter preferences
- More dynamic filter options
- Filter combination analysis

### Wishlist Features
- Shared wishlists
- Email notifications for price drops
- "Move to cart" batch operations

---

## Thank You
### Questions?

## 3. Wireframes
<img width="925" alt="Screenshot 2025-01-21 at 9 50 25 AM" src="https://github.com/user-attachments/assets/cb807a79-91b9-416d-b7de-7912b011c884" />
<img width="925" alt="Screenshot 2025-01-21 at 10 37 07 AM" src="https://github.com/user-attachments/assets/a6915a05-3b7c-465b-b2f3-01fbf598c715" />
<img width="925" alt="Screenshot 2025-01-21 at 10 37 24 AM" src="https://github.com/user-attachments/assets/df765060-dbbb-4c04-a2c7-3f7bc69e2073" />
<img width="925" alt="Screenshot 2025-01-21 at 10 38 13 AM" src="https://github.com/user-attachments/assets/121231e1-3672-4349-9f9c-1fa9c9cef3aa" />
<img width="925" alt="Screenshot 2025-01-21 at 10 38 29 AM" src="https://github.com/user-attachments/assets/48a0f1f5-6c43-4415-b52d-b0061a2c6264" />
<img width="925" alt="Screenshot 2025-01-21 at 10 38 40 AM" src="https://github.com/user-attachments/assets/b42e6e9b-0d2d-444a-8d84-4a8ffb1a2506" />
<img width="925" alt="Screenshot 2025-01-21 at 10 38 54 AM" src="https://github.com/user-attachments/assets/8f835f1e-e282-4c7e-a05e-dfa6dbdfa5df" />





## 4. Technology Stack

*   **Frontend:** React, Vite, JavaScript, CSS
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **Payment Gateway:** Stripe
*   **State Management:** Redux

## 5. ERD Diagram 
![Entity Relationship Diagram](https://github.com/user-attachments/assets/438baec4-890c-492f-98bb-f406d912a733)

## 6. System Architecture
![System Design  (1)](https://github.com/user-attachments/assets/e6f36a80-aacb-4f3a-b1da-44c635f38c26)


## 8. License

This project is licensed under the MIT License.

