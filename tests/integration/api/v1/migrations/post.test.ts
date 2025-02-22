import { clearDatabase } from "tests/utils";

describe("POST /api/v1/migrations", () => {
  beforeAll(async () => {
    await clearDatabase();
  });
  it("should post to /api/v1/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
});
