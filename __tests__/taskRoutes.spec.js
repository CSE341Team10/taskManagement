describe('Test Handlers', function () {

    test('get all. responds to /', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks').set(`Authorization`, `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('get by ID. responds to /tasks/:id"', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks/65c2dd7320b904022cc440e0').set('Authorization', `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('get by user ID. responds to /tasks/user/:id', async () => {

    });

    test('post. responds to /tasks', async () => {
        
    });

    test('update. responds to /tasks/:id"', async () => {
        
    });

    test('delete. responds to /tasks/:id"', async () => {
        
    });
});