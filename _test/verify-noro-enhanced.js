/*
  Verification Script for Sprint 11: Enhanced Noro
  Usage: node _test/verify-noro-enhanced.js <AUTH_TOKEN>
*/

const http = require('http');
const fs = require('fs');

const TOKEN = process.argv[2];

if (!TOKEN) {
  console.log('Usage: node _test/verify-noro-enhanced.js <AUTH_TOKEN>');
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
  console.log('--- 1. Chat with Context ---');
  // First message
  await request('POST', '/api/noro/chat', { message: 'My name is Zack.' });

  // Second message (asking for name)
  const response = await request('POST', '/api/noro/chat', {
    message: 'What is my name?',
  });
  console.log('Noro Response:', response);

  console.log('--- 2. Speak (TTS) ---');
  const speech = await request('POST', '/api/noro/speak', {
    text: 'Hello Zack',
  });
  console.log('Speech:', speech);

  console.log('--- 3. Transcribe (Mock) ---');
  // Basic multipart mock not easy with http module, skipping or using curl msg
  console.log(
    'Skipping transcribe in this script (requires multipart). Use Postman/Curl.',
  );
}

verify();
