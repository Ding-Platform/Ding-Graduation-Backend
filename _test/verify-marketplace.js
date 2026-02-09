/*
  Verification Script for Sprint 13: Marketplace
  Usage: node _test/verify-marketplace.js <AUTH_TOKEN>
*/

const http = require('http');

const TOKEN = process.argv[2];

if (!TOKEN) {
  console.log('Usage: node _test/verify-marketplace.js <AUTH_TOKEN>');
  process.exit(1);
}

const commonOptions = {
  hostname: 'localhost',
  port: 3000,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
};

function request(method, path, body = null) {
  return new Promise((resolve) => {
    const options = { ...commonOptions, method, path };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        console.log(`${method} ${path} -> ${res.statusCode}`);
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function verify() {
  console.log('--- 1. Create Product ---');
  const product = await request('POST', '/api/marketplace/products', {
    title: 'Vintage Camera',
    description: 'A classic 35mm film camera.',
    price: 150.0,
    currency: 'USD',
    images: ['https://example.com/cam.jpg'],
  });
  console.log('Product created:', product.id);

  if (product && product.id) {
    console.log('--- 2. List Products ---');
    const list = await request(
      'GET',
      '/api/marketplace/products?search=camera',
    );
    console.log('Found:', list.length);

    console.log('--- 3. Buy Product (Self-buy should fail) ---');
    // This should fail 400 because seller is same as buyer
    const buyResult = await request(
      'POST',
      `/api/marketplace/products/${product.id}/buy`,
    );
    console.log('Buy Result (Expect Fail):', buyResult);
  }
}

verify();
