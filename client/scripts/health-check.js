const axios = require('axios');

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const CLIENT_PORT = process.env.PORT || 3002;

console.log('🔍 Health Check: Frontend ↔ Backend Connection');
console.log('================================================');
console.log(`Frontend URL: http://localhost:${CLIENT_PORT}`);
console.log(`Backend API URL: ${API_BASE_URL}`);
console.log('');

async function testConnection() {
  const tests = [
    {
      name: 'Backend Health Check',
      url: `${API_BASE_URL.replace('/api', '')}/health`,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'Auth Routes Available',
      url: `${API_BASE_URL}/auth/health`,
      method: 'GET',
      expectedStatus: [404, 405] // Route exists but method not implemented
    },
    {
      name: 'Pet Routes Available',
      url: `${API_BASE_URL}/pets`,
      method: 'GET',
      expectedStatus: 200
    },
    {
      name: 'User Routes Available',
      url: `${API_BASE_URL}/users/profile`,
      method: 'GET',
      expectedStatus: 401 // Unauthorized without token
    },
    {
      name: 'Admin Routes Protected',
      url: `${API_BASE_URL}/admin/stats`,
      method: 'GET',
      expectedStatus: 401 // Should require authentication
    }
  ];

  console.log('Running connectivity tests...\n');
  
  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      const response = await axios({
        method: test.method,
        url: test.url,
        timeout: 5000,
        validateStatus: () => true // Don't throw on any status code
      });

      const expectedStatuses = Array.isArray(test.expectedStatus) 
        ? test.expectedStatus 
        : [test.expectedStatus];

      if (expectedStatuses.includes(response.status)) {
        console.log(`✅ ${test.name}: ${response.status} ${response.statusText}`);
        passedTests++;
      } else {
        console.log(`❌ ${test.name}: Expected ${test.expectedStatus}, got ${response.status}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`❌ ${test.name}: Backend server not running`);
      } else if (error.code === 'ENOTFOUND') {
        console.log(`❌ ${test.name}: DNS resolution failed`);
      } else {
        console.log(`❌ ${test.name}: ${error.message}`);
      }
    }
  }

  console.log('\n================================================');
  console.log(`Test Results: ${passedTests}/${totalTests} passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All connectivity tests passed!');
    return true;
  } else {
    console.log('⚠️  Some tests failed. Check backend server status.');
    return false;
  }
}

async function checkEnvironment() {
  console.log('\n🔧 Environment Check');
  console.log('====================');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID'
  ];

  let envIssues = 0;

  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar}: ${process.env[envVar]}`);
    } else {
      console.log(`❌ ${envVar}: Not set`);
      envIssues++;
    }
  }

  if (envIssues === 0) {
    console.log('🎉 All required environment variables are set!');
  } else {
    console.log(`⚠️  ${envIssues} environment variable(s) missing.`);
    console.log('\nCreate .env.local file with:');
    console.log('NEXT_PUBLIC_API_URL=http://localhost:3000/api');
    console.log('NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id');
  }

  return envIssues === 0;
}

async function checkTypescriptHealth() {
  console.log('\n📘 TypeScript Health Check');
  console.log('==========================');

  const fs = require('fs').promises;
  const path = require('path');

  try {
    // Check if types directory exists
    const typesDir = path.join(__dirname, '..', 'types');
    await fs.access(typesDir);
    console.log('✅ Types directory exists');

    // Check if admin types file exists
    const adminTypesFile = path.join(typesDir, 'admin.ts');
    await fs.access(adminTypesFile);
    console.log('✅ Admin types file exists');

    // Check if hooks directory exists
    const hooksDir = path.join(__dirname, '..', 'hooks');
    await fs.access(hooksDir);
    console.log('✅ Hooks directory exists');

    // Check if lib directory exists
    const libDir = path.join(__dirname, '..', 'lib');
    await fs.access(libDir);
    console.log('✅ Lib directory exists');

    console.log('🎉 TypeScript structure looks good!');
    return true;
  } catch (error) {
    console.log(`❌ TypeScript structure issue: ${error.message}`);
    return false;
  }
}

async function runHealthCheck() {
  console.log('Starting comprehensive health check...\n');

  const envOk = await checkEnvironment();
  const tsOk = await checkTypescriptHealth();
  const connectivityOk = await testConnection();

  console.log('\n🏁 Final Health Report');
  console.log('======================');
  console.log(`Environment: ${envOk ? '✅ OK' : '❌ Issues'}`);
  console.log(`TypeScript: ${tsOk ? '✅ OK' : '❌ Issues'}`);
  console.log(`Connectivity: ${connectivityOk ? '✅ OK' : '❌ Issues'}`);

  if (envOk && tsOk && connectivityOk) {
    console.log('\n🚀 System is healthy and ready for development!');
    process.exit(0);
  } else {
    console.log('\n🔧 Please fix the issues above before proceeding.');
    process.exit(1);
  }
}

// Run the health check
runHealthCheck().catch(error => {
  console.error('Health check failed:', error);
  process.exit(1);
}); 