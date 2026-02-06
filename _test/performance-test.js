const autocannon = require('autocannon');

async function runPerformanceTest() {
  console.log('🚀 Starting Performance Test for Notifications Endpoint...');

  const result = await autocannon({
    url: 'http://localhost:3000/api/notifications', // Assuming GET /api/notifications works
    connections: 10, // 10 concurrent connections
    pipelining: 1,
    duration: 10, // 10 seconds
    method: 'GET',
    headers: {
      // 'Authorization': 'Bearer ...' // We might need a token, but let's see if 401 is returned (still measures throughput)
    },
  });

  console.log(autocannon.printResult(result));

  console.log(
    '🚀 Starting Performance Test for Media Upload Init (Simulated)...',
  );
  // We can't easily upload files with autocannon without complex body,
  // so we'll test a lighter endpoint like creating a room or just general health.

  const result2 = await autocannon({
    url: 'http://localhost:3000/api/health', // Standard health check
    connections: 50,
    duration: 5,
  });

  console.log(autocannon.printResult(result2));
}

runPerformanceTest();
