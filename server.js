const express = require('express');
const cors = require('cors'); // Import CORS middleware
const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

const app = express();
const PORT = 5000;

// Use CORS to allow requests from your frontend
app.use(cors()); // Enable CORS for all routes

// Google Fit API Scopes and Paths
const SCOPES = ['https://www.googleapis.com/auth/fitness.activity.read'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

/**
 * Load saved credentials if they exist.
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Save new credentials after authorization.
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Authorize client, load or request credentials.
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) return client;

  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Fetch Google Fit data for step count and calories.
 */
async function fetchFitData(authClient) {
  const fitness = google.fitness({ version: 'v1', auth: authClient });
  const startTimeMillis = Date.now() - 24 * 60 * 60 * 1000; // 1 day ago
  const endTimeMillis = Date.now();

  const stepData = await fitness.users.dataset.aggregate({
    userId: 'me',
    requestBody: {
      aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis,
      endTimeMillis,
    },
  });

  const caloriesData = await fitness.users.dataset.aggregate({
    userId: 'me',
    requestBody: {
      aggregateBy: [{ dataTypeName: 'com.google.calories.expended' }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis,
      endTimeMillis,
    },
  });

  const steps = stepData.data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
  const calories = caloriesData.data.bucket[0]?.dataset[0]?.point[0]?.fpVal || 0;

  return { steps, calories };
}

// Route to fetch Google Fit data
app.get('/api/fit-data', async (req, res) => {
  try {
    const authClient = await authorize();
    const data = await fetchFitData(authClient);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Fit API' });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
