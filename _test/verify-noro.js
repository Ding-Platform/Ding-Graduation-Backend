const http = require('http');

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/tags', // List models
  method: 'GET',
};

async function checkOllama() {
  console.log('Checking Ollama connection (localhost:11434)...');

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Ollama is RUNNING.');
          try {
            const json = JSON.parse(data);
            console.log(
              'Available models:',
              json.models?.map((m) => m.name) || 'None',
            );
          } catch (e) {
            console.log('Response:', data);
          }
          resolve(true);
        } else {
          console.log(`❌ Ollama returned status: ${res.statusCode}`);
          resolve(false);
        }
      });
    });

    req.on('error', (e) => {
      console.log(`❌ Ollama NOT reachable: ${e.message}`);
      console.log(
        'Ensure Ollama is installed and running (standard port 11434).',
      );
      resolve(false);
    });

    req.end();
  });
}

checkOllama();
