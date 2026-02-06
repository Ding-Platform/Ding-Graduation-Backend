const http = require('http');

/*
  Verification Script for Sprint 9: Bookmarks
  Usage: node _test/verify-bookmarks.js <AUTH_TOKEN> <POST_ID>
*/

const TOKEN = process.argv[2];
const POST_ID = process.argv[3];

if (!TOKEN || !POST_ID) {
  console.log('Usage: node _test/verify-bookmarks.js <AUTH_TOKEN> <POST_ID>');
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
  console.log('--- 1. Toggle Save ---');
  const toggle = await request('POST', `/api/posts/${POST_ID}/save`);
  console.log(toggle);

  console.log('--- 2. Get Saved Posts ---');
  const saved = await request('GET', `/api/posts/saved`);
  console.log(JSON.stringify(saved, null, 2));

  console.log('--- 3. Get Post History ---');
  const history = await request('GET', `/api/posts/${POST_ID}/history`);
  console.log(history);
}

verify();
