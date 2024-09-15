const fs = require('fs');
const path = require('path');
const https = require('https');

const helmet = require('helmet');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; // TODO
  if (!isLoggedIn) {
    return res.status(401).send('You must log in to view this page');
  }
  next();
}

app.get('/auth/google', (req, res) => {});

app.get('/auth/google/callback', (req, res) => {});

app.get('/auth/logout', (req, res) => {});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42');
});

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https
  .createServer(
    {
      cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
      key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
