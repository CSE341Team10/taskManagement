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

  test("responds to /categories", async () => {
    const res = await request.post("/categories").send({
      categoryName: "Test Category",
      categoryDescription: "This is a test category",
    });
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("responds to /categories/:id", async () => {
    const res = await request.put("/categories/65d53bf994d0145c0aa6a84d").send({
      categoryName: "Test Category",
      categoryDescription: "This is a test category change.",
    });
    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("responds to /categories/:id", async () => {
    const res = await request.delete("/categories/65d53bf994d0145c0aa6a84d");
    expect(res.statusCode).toBe(200);
  });
});
