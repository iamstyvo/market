const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomUUID } = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MoMo API configuration for MTN MoMo
const MOMO_CONFIG = {
  apiKey: process.env.MOMO_API_KEY,
  userId: process.env.MOMO_USER_ID,
  baseUrl: 'https://sandbox.momodeveloper.mtn.com',
  currency: 'RWF',
  environment: process.env.MOMO_ENVIRONMENT || 'sandbox'
};

// Function to get access token from MTN MoMo API
async function getAccessToken() {
  try {
    const response = await axios.post(
      `${MOMO_CONFIG.baseUrl}/collection/token/`,
      {},
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${MOMO_CONFIG.userId}:${MOMO_CONFIG.apiKey}`).toString('base64')}`,
          'Ocp-Apim-Subscription-Key': MOMO_CONFIG.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// MoMo payment endpoint
app.post('/api/momo-payment', async (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;
    
    // Validate input
    if (!phoneNumber || !amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: phoneNumber, amount, or orderId'
      });
    }
    
    // Get access token
    const accessToken = await getAccessToken();
    
    // Prepare payment request to MTN MoMo API
    const paymentData = {
      amount: amount.toString(),
      currency: MOMO_CONFIG.currency,
      externalId: orderId,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payerMessage: 'Payment for Inzozi Shop order',
      payeeNote: 'Payment from Inzozi Shop customer'
    };
    
    // Generate UUID for reference ID
    const uuid = randomUUID();
    
    // Make request to MTN MoMo API
    const response = await axios.post(
      `${MOMO_CONFIG.baseUrl}/collection/v1_0/requesttopay`,
      paymentData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Reference-Id': uuid,
          'X-Target-Environment': MOMO_CONFIG.environment,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': MOMO_CONFIG.apiKey
        }
      }
    );
    
    // Check if payment request was successful
    if (response.status === 202 || response.status === 200) {
      return res.json({
        success: true,
        message: 'Payment request sent successfully. Please check your phone for the MoMo payment prompt.',
        transactionId: uuid,
        orderId: orderId,
        amount: amount,
        status: 'PENDING'
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: 'Payment request failed',
        error: response.data
      });
    }
  } catch (error) {
    console.error('MoMo payment error:', error.response ? error.response.data : error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Payment processing error',
      error: error.response ? error.response.data : error.message
    });
  }
});

// MoMo payment status endpoint
app.get('/api/momo-payment-status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    // Get access token
    const accessToken = await getAccessToken();
    
    // Make request to MTN MoMo API to check payment status
    const response = await axios.get(
      `${MOMO_CONFIG.baseUrl}/collection/v1_0/requesttopay/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Ocp-Apim-Subscription-Key': MOMO_CONFIG.apiKey,
          'X-Target-Environment': MOMO_CONFIG.environment
        }
      }
    );
    
    return res.json({
      success: true,
      status: response.data.status,
      data: response.data
    });
  } catch (error) {
    console.error('MoMo payment status error:', error.response ? error.response.data : error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Error checking payment status',
      error: error.response ? error.response.data : error.message
    });
  }
});

// MoMo payment callback endpoint (when payment is confirmed)
app.post('/api/momo-callback', async (req, res) => {
  try {
    const { transactionId, status, orderId } = req.body;
    
    console.log('MoMo Callback Received:', { transactionId, status, orderId });
    
    // In a real implementation, you would:
    // 1. Verify the callback is from MTN MoMo
    // 2. Update your database with the payment status
    // 3. Fulfill the order
    // 4. Send confirmation to customer
    
    // For now, we'll just log it and send a success response
    return res.json({
      success: true,
      message: 'Callback received and processed'
    });
  } catch (error) {
    console.error('MoMo callback error:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Callback processing error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Inzozi Shop Payment Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Inzozi Shop Payment Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;