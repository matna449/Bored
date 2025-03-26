/**
 * Simple script to test connectivity with the Quotable API
 * Run with: node src/tools/testApiConnection.js
 */
const axios = require('axios');

// Test endpoint
const TEST_ENDPOINT = 'https://api.quotable.io/random';

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

/**
 * Tests the connection to the Quotable API
 */
async function testApiConnection() {
  console.log(`${colors.blue}Testing connection to Quotable API...${colors.reset}`);
  console.log(`${colors.yellow}URL: ${TEST_ENDPOINT}${colors.reset}`);
  
  try {
    console.log('Sending request...');
    const startTime = Date.now();
    const response = await axios.get(TEST_ENDPOINT, {
      timeout: 5000 // 5 second timeout
    });
    const endTime = Date.now();
    
    console.log(`${colors.green}✓ Connection successful!${colors.reset}`);
    console.log(`Response time: ${endTime - startTime}ms`);
    console.log(`Status code: ${response.status}`);
    console.log('\nSample quote received:');
    console.log(`"${response.data.content}"`);
    console.log(`— ${response.data.author}`);
    
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Connection failed!${colors.reset}`);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`Status code: ${error.response.status}`);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from the server.');
      console.log('Possible causes:');
      console.log('  - The server is down');
      console.log('  - Network connectivity issues');
      console.log('  - CORS issues (if running in a browser)');
      console.log('  - Timeout (request took too long)');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error setting up request:', error.message);
    }
    
    // Check if there's a proxy issue
    if (process.env.HTTP_PROXY || process.env.HTTPS_PROXY) {
      console.log(`${colors.yellow}Note: Proxy settings detected. This might affect connectivity.${colors.reset}`);
    }
    
    return false;
  }
}

// Execute the test
testApiConnection()
  .then(success => {
    if (!success) {
      console.log('\nSuggestions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify the API is operational: https://status.quotable.io/');
      console.log('3. Try again later');
      console.log('4. Consider implementing more robust fallback mechanisms');
    }
    console.log('\nTest completed.');
  })
  .catch(err => {
    console.error('Unexpected error during test execution:', err);
  });
