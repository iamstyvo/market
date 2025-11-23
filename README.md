# Inzozi Shop

An online marketplace for electronic devices, clothes, shoes, toys, and second-hand items.

## Features

- Product browsing by category
- Shopping cart functionality
- Admin panel for product management
- MoMo payment integration
- Search functionality
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory

### Running the Application

1. Start the frontend server:
   ```
   npm start
   ```
   The application will be available at http://localhost:8000 (or another port if 8000 is in use)

2. Start the payment backend server:
   ```
   npm run server
   ```
   The payment API will be available at http://localhost:3000

3. Alternatively, use the batch script to start both servers:
   ```
   start-servers.bat
   ```

### Project Structure

```
project/
├── admin/                 # Admin panel pages
├── categories/            # Category-specific pages
├── images/                # Product and site images
├── server/                # Backend payment server
├── buy.html              # Checkout page
├── cart.html             # Shopping cart page
├── index.html            # Homepage
├── script.js             # Main JavaScript functionality
├── styles.css            # Main stylesheet
├── test-payment.html     # Payment integration test page
├── payment-success.html  # Payment success page
├── payment-error.html    # Payment error page
├── package.json          # Frontend dependencies and scripts
├── start-servers.bat     # Script to start both servers
├── test-servers.js       # Script to test both servers
├── README.md             # This file
├── ARCHITECTURE.md       # System architecture documentation
├── MOMO_INTEGRATION.md   # MoMo integration guide
└── server/
    ├── server.js         # Payment server implementation
    ├── package.json      # Server dependencies
    ├── .env              # Environment variables
    └── README.md         # Server documentation
```

### MoMo Payment Integration

The project includes a complete MoMo payment integration:

1. Frontend: The checkout page (`buy.html`) includes a "Pay with MoMo" button
2. Backend: A Node.js server (`server/`) handles payment requests
3. API: The server exposes a `/api/momo-payment` endpoint for processing payments

To test the payment integration:
1. Visit `test-payment.html` to test the API directly
2. Or proceed through the normal checkout process on `buy.html`

#### Customizing MoMo Integration

For detailed instructions on customizing the MoMo integration for your specific provider, see `MOMO_INTEGRATION.md`.

### Admin Panel

To access the admin panel:
1. Navigate to `/admin/login.html`
2. Use credentials:
   - Username: `styvo`
   - Password: `styvo100@`

From the admin dashboard, you can:
- Upload new products
- View existing products
- Delete products

### Customization

To customize the MoMo payment integration:
1. Update the MoMo API credentials in `server/.env`
2. Modify the payment request format in `server/server.js` to match your MoMo provider's API
3. Update the frontend payment handling in `buy.html` if needed

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Node.js
- Express.js
- localStorage for data persistence

## Notes

- All product and cart data is stored in the browser's localStorage
- The MoMo integration is designed to be easily adaptable to different MoMo provider APIs
- The design is fully responsive and works on mobile, tablet, and desktop devices
- For production deployment, consider using a database instead of localStorage
- Always use HTTPS in production environments