const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/secret', (req, res) => {
  return res.send('Your personal secret value is 42');
});

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
