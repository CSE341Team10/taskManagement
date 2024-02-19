const { app, request, expect, mockOAuth } = require('../testSetup');

describe('Comment Tests', () => {

  test('responds to GET /comments', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/comments').set(`Authorization`, `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });
  
  test('responds to GET /comments/65c7cf6da83c31eb208ab662', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/comments/65c7cf6da83c31eb208ab662').set(`Authorization`, `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to GET /comments/user', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();

    // Assuming you have a mock user session with a valid _id
    const mockUserSession = { user: { _id: '65cb03e5175cacd434436f2e' } };

    const res = await request.get('/comments/user')
      .set(`Authorization`, `Bearer ${accessToken}`)
      .set('Cookie', [`yourSessionCookie=${JSON.stringify(mockUserSession)}`]);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to GET /comments/user/65cb03e5175cacd434436f2e', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/comments/user/65cb03e5175cacd434436f2e').set(`Authorization`, `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to GET /comments/task/65c28199da9035e2c8944312', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = await request.get('/comments/task/65c28199da9035e2c8944312').set(`Authorization`, `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  let createdCommentId; // To store the _id of the comment created
  
  test('responds to POST /comments', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();

    // mock user session with a valid _id
    const mockUserSession = { user: { _id: '65cb03e5175cacd434436f2e' } };

    const requestBody = {
      comment: "Let it be",
      taskId: "65c28199da9035e2c8944312"
    };

    const res = await request.post('/comments')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', [`yourSessionCookie=${JSON.stringify(mockUserSession)}`])
        .send(requestBody);
    
    // Store the _id of the created comment
    createdCommentId = res.body._id;
    console.log(createdCommentId);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('responds to PUT /comments/65d2b185a6bb6176fcdf3d49', async () => {
    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();

    // mock user session with a valid _id
    const mockUserSession = { user: { _id: '65cb03e5175cacd434436f2e' } };

    const requestBody = {
      comment: "Modified Let it be",
      taskId: "65c28199da9035e2c8944312"
    };

    const res = await request.put('/comments/65d2b185a6bb6176fcdf3d49')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', [`yourSessionCookie=${JSON.stringify(mockUserSession)}`])
        .send(requestBody);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`responds to DELETE /comments/<_id>`, async () => {

    // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();

    // mock user session with a valid _id
    const mockUserSession = { user: { _id: '65cb03e5175cacd434436f2e' } };

    // Use the stored _id from the previous POST test
    //console.log(createdCommentId);
    const deleteEndpoint = `/comments/${createdCommentId}`;
    //console.log(deleteEndpoint) ;

    const res = await request.delete(deleteEndpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', [`yourSessionCookie=${JSON.stringify(mockUserSession)}`]);

    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

});