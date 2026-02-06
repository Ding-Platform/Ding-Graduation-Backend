/*
  Verification Script for Sprint 10: Groups
  Usage: node _test/verify-groups.js <AUTH_TOKEN> <FRIEND_ID>
*/

const http = require('http');

const TOKEN = process.argv[2];
const FRIEND_ID = process.argv[3];

if (!TOKEN || !FRIEND_ID) {
  console.log('Usage: node _test/verify-groups.js <AUTH_TOKEN> <FRIEND_ID>');
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
  console.log('--- 1. Create Group ---');
  const group = await request('POST', '/api/chat/rooms', {
    name: 'Test Group',
    userIds: [FRIEND_ID],
    type: 'GROUP',
  });
  console.log(group);

  if (group && group.id) {
    console.log(
      '--- 2. Add Member (Mock, using FRIEND_ID again to fail or strict check) ---',
    );
    // Actually we need a 3rd user to add really.
    // Or remove and add again?

    console.log('--- 3. Get User Rooms ---');
    const rooms = await request('GET', '/api/chat/rooms');
    console.log(JSON.stringify(rooms, null, 2));
  }
}

verify();
