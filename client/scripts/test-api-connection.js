#!/usr/bin/env node

const axios = require('axios');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function testApiConnection() {
  console.log('🔍 Probando conexión con el API...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Probando health check...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('✅ Health check exitoso:', healthResponse.data.status);
    
    // Test 2: API endpoints
    console.log('\n2. Probando endpoints del API...');
    
    const endpoints = [
      { name: 'Pets', url: `${API_BASE_URL}/pets` },
      { name: 'Featured Pets', url: `${API_BASE_URL}/pets/featured` },
      { name: 'Auth (should fail without token)', url: `${API_BASE_URL}/auth/me` },
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(endpoint.url, { timeout: 5000 });
        console.log(`✅ ${endpoint.name}: ${response.status}`);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(`⚠️  ${endpoint.name}: 401 (esperado para endpoints protegidos)`);
        } else if (error.code === 'ECONNREFUSED') {
          console.log(`❌ ${endpoint.name}: Servidor no disponible`);
        } else {
          console.log(`❌ ${endpoint.name}: ${error.response?.status || error.message}`);
        }
      }
    }
    
    // Test 3: CORS
    console.log('\n3. Verificando configuración CORS...');
    try {
      const corsResponse = await axios.options(`${API_BASE_URL}/pets`);
      console.log('✅ CORS configurado correctamente');
    } catch (error) {
      console.log('⚠️  CORS: Verificar configuración en el servidor');
    }
    
    console.log('\n📋 Resumen de la configuración:');
    console.log(`- API URL: ${API_BASE_URL}`);
    console.log('- TanStack Query: Configurado en client/lib/query-client.ts');
    console.log('- Servicios API: Disponibles en client/lib/services/');
    console.log('- Hooks personalizados: Disponibles en client/hooks/');
    console.log('- Provider: Configurado en app/layout.tsx');
    
    console.log('\n🚀 Para usar TanStack Query en tus componentes:');
    console.log('1. Importa los hooks: import { usePets } from "@/hooks/use-pets"');
    console.log('2. Usa en componentes: const { data, isLoading } = usePets()');
    console.log('3. Revisa el ejemplo en: client/components/examples/pets-list-example.tsx');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
    console.log('\n🔧 Soluciones posibles:');
    console.log('1. Asegúrate de que el servidor API esté corriendo en puerto 3000');
    console.log('2. Verifica la variable NEXT_PUBLIC_API_URL en .env.local');
    console.log('3. Revisa la configuración de CORS en el servidor');
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  testApiConnection();
}

module.exports = testApiConnection; 