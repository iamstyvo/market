# MoMo Payment Integration Guide

This document explains how to customize the MoMo payment integration for your specific MoMo provider.

## Overview

The Inzozi Shop project includes a complete MoMo payment integration with:

1. Frontend implementation in `buy.html`
2. Backend API server in `server/server.js`
3. Environment configuration in `server/.env`

## Customization Steps

### 1. Update Environment Variables

Edit `server/.env` with your actual MoMo API credentials:

```env
# Server Configuration
PORT=3000

# MoMo API Configuration
MOMO_API_KEY=your_actual_api_key_here
MOMO_USER_ID=your_actual_user_id_here
MOMO_ENVIRONMENT=production  # Change to 'sandbox' for testing
```

### 2. Update MoMo API Configuration

In `server/server.js`, update the `MOMO_CONFIG` object with your provider's details:

```javascript
const MOMO_CONFIG = {
  apiKey: process.env.MOMO_API_KEY,
  userId: process.env.MOMO_USER_ID,
  baseUrl: 'https://your-momo-provider-api-url.com', // Update with your provider's URL
  currency: 'RWF' // Update if needed
};
```

### 3. Update Payment Request Format

Modify the payment request structure in the `/api/momo-payment` endpoint to match your MoMo provider's API:

```javascript
// Prepare payment request to MoMo API
const paymentData = {
  // Update these fields according to your MoMo provider's API documentation
  amount: amount,
  currency: MOMO_CONFIG.currency,
  externalId: orderId,
  payer: {
    partyIdType: 'MSISDN',
    partyId: phoneNumber
  },
  payerMessage: 'Payment for Inzozi Shop order',
  payeeNote: 'Payment received for Inzozi Shop order'
};
```

### 4. Update API Headers

Update the headers in the MoMo API request to match your provider's requirements:

```javascript
const response = await axios.post(
  `${MOMO_CONFIG.baseUrl}/your-payment-endpoint`,
  paymentData,
  {
    headers: {
      // Update these headers according to your MoMo provider's documentation
      'Authorization': `Bearer ${MOMO_CONFIG.apiKey}`,
      'X-Reference-Id': orderId,
      'X-Target-Environment': process.env.MOMO_ENVIRONMENT,
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': MOMO_CONFIG.apiKey
    }
  }
);
```

### 5. Update Callback Handling

If your MoMo provider uses callbacks, update the `/api/momo-callback` endpoint:

```javascript
app.post('/api/momo-callback', async (req, res) => {
  try {
    // Extract the required fields from your provider's callback
    const { transactionId, status, orderId, ...otherFields } = req.body;
    
    // Add your provider-specific verification logic here
    
    // Process the payment confirmation
    // Update your database
    // Fulfill the order
    // Send notifications
    
    return res.json({
      success: true,
      message: 'Callback received and processed'
    });
  } catch (error) {
    console.error('MoMo callback error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Callback processing error'
    });
  }
});
```

## Testing Your Integration

1. Start both servers:
   ```
   npm start              # Frontend
   npm run server         # Backend
   ```

2. Test the API directly using the test page:
   - Visit `test-payment.html`
   - Enter test data
   - Submit the form

3. Test through the normal checkout flow:
   - Add items to cart
   - Proceed to checkout
   - Select MoMo payment
   - Enter phone number
   - Click "Initiate MoMo Payment"

## Common MoMo Providers

### MTN MoMo (Africa)
- Base URL: `https://proxy.momoapi.mtn.com`
- Authentication: OAuth 2.0
- Headers: `Authorization`, `X-Reference-Id`, `Ocp-Apim-Subscription-Key`

### Orange Money
- Base URL: Provider-specific
- Authentication: API Key in headers
- Headers: `Authorization`, `X-Orange-Partner-ID`

## Security Considerations

1. Never expose API keys in frontend code
2. Always use HTTPS in production
3. Validate all callback requests from MoMo
4. Implement proper error handling
5. Log all payment transactions for audit purposes

## Troubleshooting

### "Connection Refused" Errors
- Ensure both servers are running
- Check that ports are not blocked by firewall
- Verify the correct URLs are being used

### "Authentication Failed" Errors
- Verify API keys and credentials
- Check environment variables
- Confirm the correct authentication method

### "Invalid Request" Errors
- Check the request format matches your provider's documentation
- Verify all required fields are included
- Ensure data types are correct

## Support

For provider-specific integration help, refer to your MoMo provider's API documentation or contact their support team.