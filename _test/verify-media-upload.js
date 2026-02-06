const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

function request(options, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: 'localhost',
      port: PORT,
      ...options,
      headers: {
        ...options.headers,
        ...headers,
      },
    };

    if (
      body &&
      !reqOptions.headers['Content-Type'] &&
      !reqOptions.headers['content-type']
    ) {
      reqOptions.headers['Content-Type'] = 'application/json';
    }

    // Auto-add Content-Length if possible (and not chunked)
    const bodyData = body
      ? typeof body === 'string' || Buffer.isBuffer(body)
        ? body
        : JSON.stringify(body)
      : null;
    if (bodyData) {
      reqOptions.headers['Content-Length'] = Buffer.byteLength(bodyData);
    }

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          // Try parsing JSON
          const parsed = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            data: parsed,
            raw: data,
            headers: res.headers,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            raw: data,
            headers: res.headers,
          });
        }
      });
    });

    req.on('error', (e) => reject(e));

    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
}

function createMultipartBody(fields, files, boundary) {
  const CRLF = '\r\n';
  const parts = [];

  // Fields
  for (const [key, value] of Object.entries(fields)) {
    parts.push(
      `--${boundary}${CRLF}Content-Disposition: form-data; name="${key}"${CRLF}${CRLF}${value}`,
    );
  }

  // Files
  for (const file of files) {
    parts.push(
      `--${boundary}${CRLF}Content-Disposition: form-data; name="${file.fieldname}"; filename="${file.filename}"${CRLF}Content-Type: ${file.contentType}${CRLF}${CRLF}`,
    );
    parts.push(file.content);
  }

  parts.push(`--${boundary}--${CRLF}`);

  // Combine all parts
  // Use Buffers to handle binary data safely
  const bufferParts = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (typeof part === 'string') {
      bufferParts.push(Buffer.from(part, 'utf8'));
    } else {
      bufferParts.push(part);
    }
    if (
      i < parts.length - 1 &&
      typeof parts[i] !== 'string' &&
      typeof parts[i + 1] === 'string' &&
      parts[i + 1].startsWith('--')
    ) {
      // The newline was part of the previous string part, no need to add extra unless constructing manually
      // Actually, my construction above includes CRLF suffix for fields but ONLY header suffix for files.
      // Let's correct the file construction manually.
    }
  }

  // Simpler approach: build array of Buffers
  const finalParts = [];

  for (const [key, value] of Object.entries(fields)) {
    finalParts.push(
      Buffer.from(
        `--${boundary}${CRLF}Content-Disposition: form-data; name="${key}"${CRLF}${CRLF}${value}${CRLF}`,
      ),
    );
  }

  for (const file of files) {
    finalParts.push(
      Buffer.from(
        `--${boundary}${CRLF}Content-Disposition: form-data; name="${file.fieldname}"; filename="${file.filename}"${CRLF}Content-Type: ${file.contentType}${CRLF}${CRLF}`,
      ),
    );
    finalParts.push(file.content);
    finalParts.push(Buffer.from(CRLF));
  }

  finalParts.push(Buffer.from(`--${boundary}--${CRLF}`));

  return Buffer.concat(finalParts);
}

async function runTest() {
  try {
    console.log('1. Registering User...');
    const email = `test.media.native.${Date.now()}@example.com`;
    const password = 'Password123!';

    // Register
    await request(
      { path: '/api/auth/register', method: 'POST' },
      { email, password, name: 'Media User' },
    ).catch(() => {}); // Ignore error

    // Login
    console.log('2. Logging in...');
    const loginRes = await request(
      { path: '/api/auth/login', method: 'POST' },
      { email, password },
    );

    if (loginRes.status !== 201 && loginRes.status !== 200) {
      throw new Error(
        `Login failed: ${loginRes.status} ${JSON.stringify(loginRes.data)}`,
      );
    }

    const token = loginRes.data.data.accessToken;
    console.log('   Logged in successfully.');

    // Create Room
    console.log('3. Creating Room...');
    const roomRes = await request(
      {
        path: '/api/chat/rooms',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      },
      { type: 'DIRECT', participantIds: [] },
    );

    if (roomRes.status !== 201) {
      throw new Error(
        `Room creation failed: ${roomRes.status} ${JSON.stringify(roomRes.data)}`,
      );
    }

    const roomId = roomRes.data.id;
    console.log(`   Room created: ${roomId}`);

    // Create dummy image buffer
    console.log('4. Creating dummy image...');
    const dummyImageBuffer = Buffer.from('fake image content');

    // Send Message with Media
    console.log('5. Sending Message with Media...');
    const boundary = '--------------------------' + Date.now().toString(16);

    const bodyBuffer = createMultipartBody(
      { content: 'Testing native media upload' },
      [
        {
          fieldname: 'images',
          filename: 'test.jpg',
          contentType: 'image/jpeg',
          content: dummyImageBuffer,
        },
      ],
      boundary,
    );

    const msgRes = await request(
      {
        path: `/api/chat/rooms/${roomId}/messages`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
      },
      bodyBuffer,
    );

    console.log('   Response status:', msgRes.status);
    console.log('   Message ID:', msgRes.data.id);
    console.log(
      '   Media attachments:',
      JSON.stringify(msgRes.data.media, null, 2),
    );

    if (msgRes.data.media && msgRes.data.media.length > 0) {
      console.log('✅ TEST PASSED: Media attached to message.');
    } else {
      console.log('❌ TEST FAILED: No media in response.');
      console.log('Response:', JSON.stringify(msgRes.data, null, 2));
    }
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  }
}

runTest();
