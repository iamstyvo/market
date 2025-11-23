const http = require('http');

// Test the frontend server
function testFrontendServer() {
    const options = {
        hostname: 'localhost',
        port: 2153, // This might change, but we'll try this first
        path: '/',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        console.log('Frontend Server Test:');
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
        res.on('data', (chunk) => {
            // Just check that we get some data
        });
        res.on('end', () => {
            console.log('Frontend server is responding\n');
        });
    });
    
    req.on('error', (error) => {
        console.log('Frontend Server Test:');
        console.log('Error connecting to frontend server:', error.message);
        console.log('Make sure the frontend server is running\n');
    });
    
    req.end();
}

// Test the backend server
function testBackendServer() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/health',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        console.log('Backend Server Test:');
        console.log(`Status Code: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log('Response Body:', chunk);
        });
        res.on('end', () => {
            console.log('Backend server is responding\n');
        });
    });
    
    req.on('error', (error) => {
        console.log('Backend Server Test:');
        console.log('Error connecting to backend server:', error.message);
        console.log('Make sure the backend server is running\n');
    });
    
    req.end();
}

console.log('Testing Inzozi Shop Servers...\n');

// Test both servers
testFrontendServer();
testBackendServer();

console.log('Tests completed. Check output above for results.');