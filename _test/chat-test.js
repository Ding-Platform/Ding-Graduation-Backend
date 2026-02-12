/**
 * Chat Module Test Script
 * Tests both REST API and WebSocket functionality for Sprint 6
 */

const io = require('socket.io-client');
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const API_PREFIX = '/api/v1';

// Test credentials
const testUser = {
  email: 'zackriver.dev@gmail.com',
  password: '*A01201024880z#',
};

let accessToken = '';
let roomId = '';
let messageId = '';

// Utility function to log test results
function logResult(testName, success, details = '') {
  const status = success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${testName}`);
  if (details) console.log(`   ${details}`);
}

// REST API Tests
async function testRestApi() {
  console.log('\n=== REST API Tests ===\n');

  try {
    // 1. Login
    const loginRes = await axios.post(
      `${BASE_URL}${API_PREFIX}/auth/login`,
      testUser,
    );
    accessToken = loginRes.data.accessToken;
    logResult(
      'Login',
      !!accessToken,
      `Token received: ${accessToken.substring(0, 50)}...`,
    );

    const authHeader = { Authorization: `Bearer ${accessToken}` };

    // 2. Get user's chat rooms
    const roomsRes = await axios.get(`${BASE_URL}${API_PREFIX}/chat/rooms`, {
      headers: authHeader,
    });
    const rooms = roomsRes.data;
    logResult('Get Rooms', Array.isArray(rooms), `Found ${rooms.length} rooms`);

    if (rooms.length > 0) {
      roomId = rooms[0]._id;
      console.log(
        `   Room: "${rooms[0].name}" (${rooms[0].type}), Members: ${rooms[0].memberCount}`,
      );
    }

    // 3. Get room details
    if (roomId) {
      const roomDetailsRes = await axios.get(
        `${BASE_URL}${API_PREFIX}/chat/rooms/${roomId}`,
        { headers: authHeader },
      );
      logResult(
        'Get Room Details',
        !!roomDetailsRes.data,
        `Room: ${roomDetailsRes.data.name}`,
      );
    }

    // 4. Get messages from room
    if (roomId) {
      const messagesRes = await axios.get(
        `${BASE_URL}${API_PREFIX}/chat/rooms/${roomId}/messages`,
        { headers: authHeader },
      );
      const messages = messagesRes.data.messages || messagesRes.data;
      logResult(
        'Get Messages',
        Array.isArray(messages),
        `Found ${messages.length} messages`,
      );

      if (messages.length > 0) {
        messageId = messages[0]._id;
        console.log(
          `   Latest: "${messages[0].content?.substring(0, 50)}..." by ${messages[0].userId}`,
        );
      }
    }

    // 5. Send a test message
    if (roomId) {
      const sendRes = await axios.post(
        `${BASE_URL}${API_PREFIX}/chat/rooms/${roomId}/messages`,
        {
          content: `Test message from automated test at ${new Date().toISOString()}`,
        },
        { headers: authHeader },
      );
      logResult(
        'Send Message',
        !!sendRes.data._id,
        `Message ID: ${sendRes.data._id}`,
      );
      messageId = sendRes.data._id;
    }

    // 6. Get unread count
    const unreadRes = await axios.get(
      `${BASE_URL}${API_PREFIX}/chat/unread-counts`,
      { headers: authHeader },
    );
    logResult('Get Unread Counts', !!unreadRes.data, `Unread counts retrieved`);

    // 7. Search messages
    const searchRes = await axios.get(
      `${BASE_URL}${API_PREFIX}/chat/search?query=test`,
      { headers: authHeader },
    );
    logResult(
      'Search Messages',
      Array.isArray(searchRes.data),
      `Found ${searchRes.data.length} matching messages`,
    );

    // 8. Get room stats
    if (roomId) {
      const statsRes = await axios.get(
        `${BASE_URL}${API_PREFIX}/chat/rooms/${roomId}/stats`,
        { headers: authHeader },
      );
      logResult(
        'Get Room Stats',
        !!statsRes.data,
        `Stats: ${JSON.stringify(statsRes.data).substring(0, 80)}...`,
      );
    }

    // 9. Add reaction to message
    if (messageId) {
      try {
        const reactionRes = await axios.post(
          `${BASE_URL}${API_PREFIX}/chat/messages/${messageId}/reactions`,
          { emoji: '👍' },
          { headers: authHeader },
        );
        logResult('Add Reaction', true, `Reaction added`);
      } catch (e) {
        logResult('Add Reaction', false, e.message);
      }
    }

    // 10. Mark message as read
    if (messageId && roomId) {
      try {
        const readRes = await axios.post(
          `${BASE_URL}${API_PREFIX}/chat/messages/${messageId}/read`,
          {},
          { headers: authHeader },
        );
        logResult('Mark Message Read', true, `Message marked as read`);
      } catch (e) {
        logResult('Mark Message Read', false, e.message);
      }
    }

    return true;
  } catch (error) {
    console.error(
      'REST API Test Error:',
      error.response?.data || error.message,
    );
    return false;
  }
}

// WebSocket Tests
async function testWebSocket() {
  console.log('\n=== WebSocket Tests ===\n');

  return new Promise((resolve) => {
    const socket = io(`${BASE_URL}/chat`, {
      auth: { token: accessToken },
      transports: ['websocket'],
    });

    const results = {
      connected: false,
      joinedRoom: false,
      messageSent: false,
      typing: false,
      messageReceived: false,
    };

    let testTimeout = setTimeout(() => {
      console.log('\n⏱️ WebSocket test timeout reached');
      socket.disconnect();
      printResults();
      resolve(false);
    }, 10000);

    socket.on('connect', () => {
      results.connected = true;
      logResult('WebSocket Connect', true, `Socket ID: ${socket.id}`);

      // Join room
      if (roomId) {
        socket.emit('joinRoom', { roomId }, (response) => {
          results.joinedRoom = !response?.error;
          logResult(
            'Join Room (WebSocket)',
            results.joinedRoom,
            results.joinedRoom ? `Joined room ${roomId}` : response?.error,
          );

          // Test typing indicator
          socket.emit('typing', { roomId, isTyping: true });
          results.typing = true;
          logResult('Typing Indicator', true, 'Typing event emitted');

          // Send a message
          socket.emit(
            'message',
            {
              roomId,
              content: `WebSocket test message at ${new Date().toISOString()}`,
            },
            (response) => {
              results.messageSent = !response?.error && response?.success;
              logResult(
                'Send Message (WebSocket)',
                results.messageSent,
                results.messageSent
                  ? `Message sent via WebSocket`
                  : response?.error,
              );

              // Clean up and finish
              setTimeout(() => {
                clearTimeout(testTimeout);
                socket.disconnect();
                printResults();
                resolve(true);
              }, 1000);
            },
          );
        });
      } else {
        clearTimeout(testTimeout);
        socket.disconnect();
        logResult('Join Room (WebSocket)', false, 'No room ID available');
        printResults();
        resolve(false);
      }
    });

    socket.on('connected', (data) => {
      logResult('Auth Confirmation', true, `User: ${data.username}`);
    });

    socket.on('message', (message) => {
      results.messageReceived = true;
      console.log(
        `   📩 Received message: "${message.content?.substring(0, 50)}..."`,
      );
    });

    socket.on('typing', (data) => {
      console.log(
        `   ⌨️ Typing indicator: User ${data.userId} ${data.isTyping ? 'is typing' : 'stopped typing'}`,
      );
    });

    socket.on('error', (error) => {
      logResult(
        'WebSocket Error',
        false,
        error.message || JSON.stringify(error),
      );
    });

    socket.on('connect_error', (error) => {
      logResult('WebSocket Connect', false, error.message);
      clearTimeout(testTimeout);
      printResults();
      resolve(false);
    });

    function printResults() {
      console.log('\n=== WebSocket Test Summary ===');
      console.log(`Connected: ${results.connected ? '✅' : '❌'}`);
      console.log(`Joined Room: ${results.joinedRoom ? '✅' : '❌'}`);
      console.log(`Message Sent: ${results.messageSent ? '✅' : '❌'}`);
      console.log(`Typing Event: ${results.typing ? '✅' : '❌'}`);
    }
  });
}

// Main test runner
async function runTests() {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║     Chat Module Test Suite - Sprint 6               ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`Started: ${new Date().toISOString()}`);

  const restSuccess = await testRestApi();
  const wsSuccess = await testWebSocket();

  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║                 Final Results                       ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log(`REST API Tests: ${restSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`WebSocket Tests: ${wsSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Completed: ${new Date().toISOString()}`);

  process.exit(restSuccess && wsSuccess ? 0 : 1);
}

runTests();
