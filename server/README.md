# Inzozi Shop Payment Server

This is the backend server for handling MoMo payments in the Inzozi Shop project.

## Setup Instructions

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Edit the `.env` file and replace the placeholder values with your actual MoMo API credentials

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/momo-payment` - Process MoMo payment
- `GET /api/health` - Health check endpoint

## MoMo Integration

The server is configured to work with the MoMo API. You'll need to:

1. Register for a MoMo API account
2. Obtain your API key and user ID
3. Update the `.env` file with your credentials
4. Update the MoMo API URLs in `server.js` based on your country's MoMo API documentation

## Testing

You can test the health endpoint by visiting:
http://localhost:3000/api/health

## Notes

- The current implementation is a template that needs to be adapted to your specific MoMo provider's API
- Make sure to use HTTPS in production
- Update the CORS configuration as needed for your frontend domain