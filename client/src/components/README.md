# Component Organization Structure

This directory follows a feature-based organization pattern to improve maintainability and developer experience.

## Directory Structure

```
components/
├── common/           # Reusable UI components
│   ├── forms/       # Form-related components
│   ├── layout/      # Layout components
│   └── ui/          # Basic UI elements
├── features/         # Feature-specific components
│   ├── auth/        # Authentication components
│   ├── cart/        # Shopping cart components
│   ├── catalog/     # Product catalog components
│   ├── checkout/    # Checkout flow components
│   ├── navigation/  # Navigation components
│   ├── orders/      # Order management components
│   ├── profile/     # User profile components
│   └── wishlist/    # Wishlist components
└── __tests__/       # Test files
```

## Component Categories

### Common Components (`common/`)
- **forms/**: Reusable form components (FormInput, NewsletterForm)
- **layout/**: Layout and structural components (Layout, AuthLayout, ProtectedRoute)
- **ui/**: Basic UI elements (PriceDisplay, Breadcrumb, DemoWarning)

### Feature Components (`features/`)
- **auth/**: Authentication-related components (LoginForm, RegisterForm)
- **cart/**: Shopping cart functionality (Cart, CartItem, CartModal)
- **catalog/**: Product browsing and filtering (ProductCard, ProductGrid, ProductCarousel)
- **checkout/**: Checkout process components (PaymentForm)
- **navigation/**: Navigation elements (Navbar, TopNavBar, TopSearchBar, SearchBar)
- **orders/**: Order management (MyListings)
- **profile/**: User profile components
- **wishlist/**: Wishlist functionality (WishlistButton)

## Naming Conventions

- Use PascalCase for component files
- Use descriptive names that indicate the component's purpose
- Group related components in feature directories
- Keep common components in the `common/` directory

## Import Guidelines

When importing components, use the following pattern:
```javascript
// Feature components
import ProductCard from '../components/features/catalog/ProductCard';
import CartModal from '../components/features/cart/CartModal';

// Common components
import FormInput from '../components/common/forms/FormInput';
import Layout from '../components/common/layout/Layout';
```

## Benefits

1. **Scalability**: Easy to add new features without cluttering the main components directory
2. **Maintainability**: Related components are grouped together
3. **Discoverability**: Clear structure makes it easy to find components
4. **Team Collaboration**: Multiple developers can work on different features without conflicts
5. **Code Splitting**: Features can be easily code-split in the future 