const session = jest.createMockFromModule('express-session');

// Mock the session middleware
session.mockImplementation(() => (req, res, next) => {
  // Simulate setting the user in the session
  req.session = {
    user: {
      _id: '65cb03e5175cacd434436f2e',
    },
  };
  next();
});

module.exports = session;