const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const app = require('./server.js');
const { expect } = require('@jest/globals');

// Mock OAuth authentication module
const mockOAuth = {
  getToken: jest.fn().mockImplementation(() => {
    // Generate a valid access token
    const accessToken = jwt.sign({ /* payload */ }, 'your_secret_key', { expiresIn: '1h' });
    return Promise.resolve(accessToken);
  })
};

// Inject the mock into your server setup
beforeAll(() => {
  jest.mock('./middleware/authenticate', () => {
    return mockOAuth;
  });
});

const request = supertest(app);
jest.mock('express-session');

module.exports = { app, request, expect, mockOAuth };