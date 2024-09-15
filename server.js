const fs = require('fs');
const path = require('path');
const https = require('https');

const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('google profile:', profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();

app.use(helmet());
app.use(passport.initialize());

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
