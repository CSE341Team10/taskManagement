const request = require("supertest");
const app = require("../server");

describe("GET /categories", () => {
  it("responds with status 200", async () => {
    const res = await request(app).get("/categories");
    expect(res.status).toBe(200);
  });
});
