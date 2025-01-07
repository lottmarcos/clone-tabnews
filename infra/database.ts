import { Client } from "pg";

async function query(
  queryObject:
    | string
    | { text: string; name?: string; values?: any[]; rowMode?: "array" },
) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Error database.ts@query()", error);
    throw error;
  } finally {
    await client.end();
  }
}

export { query };
