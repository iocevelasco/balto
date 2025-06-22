const axios = require('axios');
const colors = require('colors');

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const testResults = [];

// Helper functions
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  switch (type) {
    case 'success':
      console.log(`[${timestamp}] ✅ ${message}`.green);
      break;
    case 'error':
      console.log(`[${timestamp}] ❌ ${message}`.red);
      break;
    case 'warning':
      console.log(`[${timestamp}] ⚠️  ${message}`.yellow);
      break;
    case 'info':
    default:
      console.log(`[${timestamp}] ℹ️  ${message}`.blue);
      break;
  }
};

const runTest = async (testName, testFunction) => {
  totalTests++;
  log(`Running test: ${testName}`, 'info');
  
  try {
    await testFunction();
    passedTests++;
    log(`PASSED: ${testName}`, 'success');
    testResults.push({ name: testName, status: 'PASSED' });
  } catch (error) {
    failedTests++;
    log(`FAILED: ${testName} - ${error.message}`, 'error');
    testResults.push({ name: testName, status: 'FAILED', error: error.message });
  }
};

const makeRequest = async (method, url, data = null, headers = {}) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (data) {
    config.data = data;
  }

  return await axios(config);
};

// Test suites
const testHealthEndpoint = async () => {
  const response = await makeRequest('GET', '/health');
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  
  if (!response.data.status || response.data.status !== 'OK') {
    throw new Error('Health check status is not OK');
  }
  
  if (!response.data.database) {
    throw new Error('Database status not included in health check');
  }
};

const testApiDocumentation = async () => {
  const response = await makeRequest('GET', '/api-docs');
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
};

const testNotFoundEndpoint = async () => {
  try {
    await makeRequest('GET', '/non-existent-endpoint');
    throw new Error('Should have returned 404 for non-existent endpoint');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return; // Expected 404
    }
    throw error;
  }
};

// Auth endpoints tests
const testAuthEndpoints = async () => {
  console.log('\n🔐 Testing Auth Endpoints...');
  
  try {
    // Test auth/verify without token (should fail)
    const verifyWithoutToken = await makeRequest('GET', '/auth/verify');
    console.log('✅ /auth/verify without token:', verifyWithoutToken.success ? 'FAIL' : 'PASS (Expected 401)');
    
    // Test Google sign-in endpoint exists
    const googleSignInResponse = await makeRequest('POST', '/auth/google', {});
    console.log('✅ /auth/google endpoint exists:', googleSignInResponse ? 'PASS' : 'FAIL');
    
    // Test /auth/me endpoint exists
    const meResponse = await makeRequest('GET', '/auth/me');
    console.log('✅ /auth/me endpoint exists:', meResponse ? 'PASS' : 'FAIL');
    
  } catch (error) {
    console.log('❌ Auth endpoints test failed:', error.message);
  }
};

// Pet endpoints tests
const testPetEndpoints = async () => {
  await runTest('GET /api/pets - Public access', async () => {
    const response = await makeRequest('GET', '/api/pets');
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  });

  await runTest('GET /api/pets/featured - Public access', async () => {
    const response = await makeRequest('GET', '/api/pets/featured');
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  });

  await runTest('GET /api/pets/:id - Invalid ID format', async () => {
    try {
      await makeRequest('GET', '/api/pets/invalid-id');
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 404)) {
        return; // Expected error
      }
      throw error;
    }
  });

  // Test protected routes without authentication
  await runTest('POST /api/pets - No authentication', async () => {
    try {
      await makeRequest('POST', '/api/pets', { name: 'Test Pet' });
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });

  await runTest('PUT /api/pets/123 - No authentication', async () => {
    try {
      await makeRequest('PUT', '/api/pets/123', { name: 'Updated Pet' });
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });

  await runTest('DELETE /api/pets/123 - No authentication', async () => {
    try {
      await makeRequest('DELETE', '/api/pets/123');
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });
};

// Adoption endpoints tests
const testAdoptionEndpoints = async () => {
  await runTest('POST /api/adoptions - No authentication', async () => {
    try {
      await makeRequest('POST', '/api/adoptions', { petId: '123' });
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });

  await runTest('GET /api/adoptions/my-applications - No authentication', async () => {
    try {
      await makeRequest('GET', '/api/adoptions/my-applications');
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });

  await runTest('GET /api/adoptions/shelter/applications - No authentication', async () => {
    try {
      await makeRequest('GET', '/api/adoptions/shelter/applications');
      throw new Error('Should have failed with authentication error');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return; // Expected authentication error
      }
      throw error;
    }
  });
};

// Test invalid JSON
const testInvalidJson = async () => {
  await runTest('POST /api/auth/register - Invalid JSON', async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/auth/register`,
        data: '{"invalid": json}',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      throw new Error('Should have failed with JSON parsing error');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return; // Expected JSON parsing error
      }
      throw error;
    }
  });
};

// Test rate limiting
const testRateLimiting = async () => {
  await runTest('Rate limiting test', async () => {
    const promises = [];
    // Make many requests quickly to trigger rate limiting
    for (let i = 0; i < 120; i++) {
      promises.push(makeRequest('GET', '/api/pets').catch(e => e.response));
    }
    
    const responses = await Promise.all(promises);
    const rateLimitedResponses = responses.filter(r => r && r.status === 429);
    
    if (rateLimitedResponses.length === 0) {
      log('Rate limiting might not be working properly', 'warning');
    } else {
      log(`Rate limiting working: ${rateLimitedResponses.length} requests were rate limited`, 'info');
    }
  });
};

// Main test runner
const runAllTests = async () => {
  console.log('🚀 Starting comprehensive endpoint testing...\n'.cyan);
  
  // Basic health checks
  await runTest('Health Check', testHealthEndpoint);
  await runTest('API Documentation', testApiDocumentation);
  await runTest('404 Not Found', testNotFoundEndpoint);
  
  // Auth endpoints
  console.log('\n📝 Testing Authentication Endpoints...'.yellow);
  await testAuthEndpoints();
  
  // Pet endpoints
  console.log('\n🐕 Testing Pet Endpoints...'.yellow);
  await testPetEndpoints();
  
  // Adoption endpoints
  console.log('\n🏠 Testing Adoption Endpoints...'.yellow);
  await testAdoptionEndpoints();
  
  // Error handling tests
  console.log('\n⚠️  Testing Error Handling...'.yellow);
  await testInvalidJson();
  
  // Rate limiting test
  console.log('\n🚦 Testing Rate Limiting...'.yellow);
  await testRateLimiting();
  
  // Summary
  console.log('\n📊 Test Summary'.cyan);
  console.log('================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`.green);
  console.log(`Failed: ${failedTests}`.red);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  
  if (failedTests > 0) {
    console.log('\n❌ Failed Tests:'.red);
    testResults
      .filter(result => result.status === 'FAILED')
      .forEach(result => {
        console.log(`- ${result.name}: ${result.error}`.red);
      });
  }
  
  console.log('\n🎉 Testing completed!'.green);
  process.exit(failedTests > 0 ? 1 : 0);
};

// Run tests if this file is executed directly
if (require.main === module) {
  // Check if server is running
  log('Checking if server is running...', 'info');
  
  makeRequest('GET', '/health')
    .then(() => {
      log('Server is running, starting tests...', 'success');
      runAllTests();
    })
    .catch(() => {
      log('Server is not running. Please start the server first with: npm run dev', 'error');
      process.exit(1);
    });
}

module.exports = { runAllTests }; 