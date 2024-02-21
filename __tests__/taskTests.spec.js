const { request, expect, mockOAuth } = require('../testSetup.js');

describe('Test Handlers', function () {

    test('responds to GET /', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks').set(`Authorization`, `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to GET /tasks/:id"', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks/65c69ddebe80c3b8bc76cc7f').set('Authorization', `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to GET /tasks/user/:id', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks/user/65cb03e5175cacd434436f2e').set('Authorization', `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to POST /tasks', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = (await request.post('/tasks').set('Authorization', `Bearer ${accessToken}`).send({
            title: "Test task",
            description: "Test desc.",
            dueDate: "2024-02-21",
            priorityLevel: "High",
            status: "In Progress",
            categoryId: "65d027fa2877681f8504eded",

        }));
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to GET /tasks/category/:id', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = await request.get('/tasks/category/65d027fa2877681f8504eded').set('Authorization', `Bearer ${accessToken}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to UPDATE /tasks/:id"', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = (await request.put('/tasks/65c69ddebe80c3b8bc76cc7f').set('Authorization', `Bearer ${accessToken}`).send({
            title: "Test task 2",
            description: "Test desc.",
            dueDate: "2024-02-21",
            priorityLevel: "High",
            status: "In Progress",
            categoryId: "65d027fa2877681f8504eded",
        }));
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to DELETE /tasks/:id"', async () => {
         // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = (await request.delete('/tasks/65d3a3c4c3605e10388f0e31').set('Authorization', `Bearer ${accessToken}`));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
});
});