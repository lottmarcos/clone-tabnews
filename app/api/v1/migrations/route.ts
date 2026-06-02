import { join } from 'node:path';

import { getClient } from 'infra/database';
import node_pg_migration from 'node-pg-migrate';

async function runMigrations(dryRun: boolean) {
  const dbClient = await getClient();

  try {
    const migrations = await node_pg_migration({
      dbClient,
      migrationsTable: 'pgmigrations',
      dir: join('infra', 'migrations'),
      direction: 'up',
      dryRun,
      verbose: true,
    });

    if (migrations.length > 0) {
      return Response.json(migrations, { status: 201 });
    }

    return Response.json(migrations);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await dbClient.end();
  }
}

export async function GET() {
  return runMigrations(true);
}

export async function POST() {
  return runMigrations(false);
}
