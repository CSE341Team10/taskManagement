const { app, request, expect, mockOAuth } = require('../testSetup');

describe('User Tests', () => {
  test('responds to /users', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/users').set(`Authorization`, `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to /users/:id', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/users/121740143').set('Authorization', `Bearer ${accessToken}`);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  test('responds to /users', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = (await request.post('/users').set('Authorization', `Bearer ${accessToken}`).send({
      githubUserId: 1111111111,
      username: 'testUser',
      displayName: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      userRole: 'user',
      password: 'password',
      email: 'test@test.com',
      profilePic: 'test.jpg'
    }));
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
  
  test('responds to /users/:id', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = (await request.put('/users/1111111111').set('Authorization', `Bearer ${accessToken}`).send({
      githubUserId: 1111111111,
      username: 'testUser',
      displayName: 'Updated User',
      firstName: 'Test',
      lastName: 'User',
      userRole: 'user',
      password: 'password',
      email: 'test@test.com',
      profilePic: 'test.jpg'
    }));
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to /users/:id', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = (await request.delete('/users/1111111111').set('Authorization', `Bearer ${accessToken}`));
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
});