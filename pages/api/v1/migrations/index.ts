import { NextApiRequest, NextApiResponse } from "next";
import node_pg_migration from "node-pg-migrate";
import { join } from "node:path";

const migrations = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const dryRun = req.method === "GET";

  console.log("Running migrations", { dryRun });

  const migrations = await node_pg_migration({
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun,
    verbose: true,
  });

  res.status(200).json(migrations);
};

export default migrations;
