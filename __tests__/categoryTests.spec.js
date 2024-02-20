const { request, expect, mockOAuth } = require("../testSetup");

describe("Category Tests", () => {
  test("responds to GET /categories", async () => {
    // Use the mocked getToken function instead of real OAuth authentication



    expect(res.statusCode).toBe(200);
  });
});
