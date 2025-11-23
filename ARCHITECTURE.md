# Inzozi Shop Architecture

## System Components

```mermaid
graph TD
    A[Frontend Browser] --> B[Frontend Server<br/>Port: 8000]
    A --> C[Payment Server<br/>Port: 3000]
    
    B --> D[index.html<br/>Homepage]
    B --> E[cart.html<br/>Shopping Cart]
    B --> F[buy.html<br/>Checkout]
    B --> G[admin/*<br/>Admin Panel]
    B --> H[categories/*<br/>Category Pages]
    
    C --> I[POST /api/momo-payment<br/>Process MoMo Payments]
    C --> J[GET /api/health<br/>Health Check]
    
    I --> K[MoMo API<br/>External Service]
    
    style A fill:#4CAF50,stroke:#388E3C
    style B fill:#2196F3,stroke:#0D47A1
    style C fill:#2196F3,stroke:#0D47A1
    style K fill:#FF9800,stroke:#E65100
    
    classDef frontend fill:#4CAF50,stroke:#388E3C;
    classDef backend fill:#2196F3,stroke:#0D47A1;
    classDef external fill:#FF9800,stroke:#E65100;
```

## Data Flow

1. **Product Management**:
   - Admin uploads products via admin panel
   - Products stored in browser localStorage
   - All pages read product data from localStorage

2. **Shopping Experience**:
   - Users browse products by category
   - Products added to cart (stored in localStorage)
   - Users proceed to checkout (buy.html)

3. **Payment Processing**:
   - User selects MoMo payment option
   - Frontend sends payment request to backend server
   - Backend server processes payment with MoMo API
   - Response sent back to frontend
   - User receives payment confirmation

## Technologies

### Frontend
- HTML5
- CSS3 (with modern styling and animations)
- Vanilla JavaScript
- localStorage for data persistence

### Backend
- Node.js
- Express.js
- Axios for HTTP requests
- CORS for cross-origin requests

### External Services
- MoMo Payment API (integration ready)

## Security Considerations

- Admin authentication via simple credentials (localStorage)
- CORS configuration for API security
- Environment variables for sensitive data
- HTTPS recommended for production deployment

## Scalability

- Frontend is completely static (easy to deploy)
- Backend is stateless (can be scaled horizontally)
- localStorage limits data to individual browsers
- For production, consider using a database instead of localStorage