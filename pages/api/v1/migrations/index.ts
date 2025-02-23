import { getClient } from "infra/database";
import { NextApiRequest, NextApiResponse } from "next";
import node_pg_migration from "node-pg-migrate";
import { join } from "node:path";

const migrations = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const dbClient = await getClient();
  const dryRun = req.method === "GET";

  const migrations = await node_pg_migration({
    dbClient,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun,
    verbose: true,
  });

  await dbClient.end();

  if (migrations.length > 0) return res.status(201).json(migrations);

  res.status(200).json(migrations);
};

export default migrations;
