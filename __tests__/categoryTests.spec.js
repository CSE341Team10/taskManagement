const { app, request, expect } = require("../testSetup");

describe("Category Tests", () => {
  test("responds to /categories", async () => {
    const res = await request.get("/categories");
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("responds to /categories/:id", async () => {
    const res = await request.get("/categories/65c2648728effa2a283adaea");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /categories/task/:id", async () => {
    const res = await request.get("/categories/task/65cbc252dba7cd4a50112942");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /categories", async () => {
    const res = await request.post("/categories").send({
      categoryName: "Test Category",
      categoryDescription: "This is a test category",
    });
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("responds to /categories/:id", async () => {
    const res = await request.put("/categories/65d4d51fbf32c72352bc30c7").send({
      categoryName: "Test Category",
      categoryDescription: "This is a test category change.",
    });
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("responds to /categories/:id", async () => {
    const res = await request.delete("/categories/65d4d51fbf32c72352bc30c7");
    expect(res.statusCode).toBe(200);
  });
});
