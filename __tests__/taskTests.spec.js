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

        }));
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to UPDATE /tasks/:id"', async () => {
        // Use the mocked getToken function instead of real OAuth authentication
        const accessToken = await mockOAuth.getToken();
        const res = (await request.put('/tasks/65c69ddebe80c3b8bc76cc7f').set('Authorization', `Bearer ${accessToken}`).send({
            title: "Test task",
            description: "Test desc.",
            dueDate: "2024-02-21",
            priorityLevel: "Medium",
            status: "In Progress",
        }));
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('responds to DELETE /tasks/:id"', async () => {
         // Use the mocked getToken function instead of real OAuth authentication
    const accessToken = await mockOAuth.getToken();
    const res = (await request.delete('/tasks/65d3af8e41603e2939316616').set('Authorization', `Bearer ${accessToken}`));
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
});
});