const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Routes for each HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'chat.html'));
});

app.get('/delivery', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'delivery.html'));
});

app.get('/fitness', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'fitness.html'));
});

app.get('/emergencycall', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'emergencycall.html'));
});

app.get('/medirecommend', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'medirecommend.html'));
});

// Catch-all route for any unmatched paths
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
