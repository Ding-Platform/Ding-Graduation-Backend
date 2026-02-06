/*
  Verification Script for Sprint 12: Caching
  Usage: node _test/verify-cache.js <AUTH_TOKEN>
*/

const http = require('http');

const TOKEN = process.argv[2];

if (!TOKEN) {
  console.log('Usage: node _test/verify-cache.js <AUTH_TOKEN>');
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

function request(method, path) {
  return new Promise((resolve) => {
    const start = Date.now();
    const options = { ...commonOptions, method, path };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        const duration = Date.now() - start;
        console.log(`${method} ${path} -> ${res.statusCode} (${duration}ms)`);
        resolve(duration);
      });
    });
    req.end();
  });
}

async function verify() {
  console.log('--- 1. First Call (Cache Miss) ---');
  const time1 = await request('GET', '/api/feed?type=HOME');

  console.log('--- 2. Second Call (Cache Hit) ---');
  const time2 = await request('GET', '/api/feed?type=HOME');

  console.log(`\nImprovement: ${time1 - time2}ms faster`);
}

verify();
