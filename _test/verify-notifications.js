const io = require('socket.io-client');
const http = require('http');

const URL = 'http://localhost:3000';
const NOTIFICATION_NAMESPACE = `${URL}/notifications`;

async function runTest() {
  console.log('1. Connecting to WebSocket...');

  // We need to simulate login to get a userId?
  // NotificationGateway doesn't seem to enforce auth in handleConnection properly yet (just logs),
  // but it expects `client.join("user_" + userId)` via a custom event or logic?
  // Checking NotificationGateway code:
  // "handleConnection(client) ... client.handshake.query.userId ... client.join" (commented out in my implementation?)
  // Wait, my implementation had:
  // async handleJoinRoom(client: Socket, userId: string) { client.join(`user_${userId}`); }

  // So we need to emit 'joinRoom'.

  const socket = io(NOTIFICATION_NAMESPACE, {
    transports: ['websocket'],
    forceNew: true,
  });

  socket.on('connect', () => {
    console.log('   Connected to Notification Namespace.');

    const userId = 'test-user-123';
    console.log(`2. Joining room for user ${userId}...`);
    socket.emit('handleJoinRoom', userId); // The method name in Gateway is handleJoinRoom, implies @SubscribeMessage('handleJoinRoom')?
    // Wait, in NestJS Gateway, if method is named handleJoinRoom, we need @SubscribeMessage('joinRoom')?
    // I didn't add @SubscribeMessage decorator in my previous write_to_file!
    // I need to FIX NotificationGateway to expose the method properly.
  });

  socket.on('new_notification', (data) => {
    console.log('✅ Received Notification:', data);
    socket.disconnect();
    process.exit(0);
  });

  // Timeout
  setTimeout(() => {
    console.log('❌ Timeout waiting for notification.');
    socket.disconnect();
    process.exit(1);
  }, 10000);
}

runTest();
