import { Client } from "pg";

async function query(queryObject: string | { text: string; values?: any[] }) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  const result = await client.query(queryObject);
  await client.end();

  return { result };
}

export { query };
