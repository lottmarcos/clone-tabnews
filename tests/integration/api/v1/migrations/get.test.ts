import { query } from "infra/database";
import { clearDatabase } from "tests/utils";

describe("GET /api/v1/migrations", () => {
  beforeAll(async () => {
    await clearDatabase();
  });

  it("should GET to /api/v1/migrations should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    query("SELECT 1+1;");

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });
});
