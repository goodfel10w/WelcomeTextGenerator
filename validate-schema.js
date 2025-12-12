import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import https from 'https';

// Funktion zum Laden des Schemas von der URL
function fetchSchema(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function validateServerJson() {
  try {
    // Server.json laden
    const serverJson = JSON.parse(fs.readFileSync('./server.json', 'utf-8'));

    // Schema von der URL laden
    console.log('Loading schema from:', serverJson.$schema);
    const schema = await fetchSchema(serverJson.$schema);

    // AJV Validator erstellen
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);

    // Validierung durchführen
    const validate = ajv.compile(schema);
    const valid = validate(serverJson);

    if (valid) {
      console.log('✅ server.json is valid!');
      process.exit(0);
    } else {
      console.error('❌ server.json validation failed:');
      console.error(JSON.stringify(validate.errors, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error validating server.json:', error.message);
    process.exit(1);
  }
}

validateServerJson();
