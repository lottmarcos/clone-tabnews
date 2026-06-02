import { query } from 'infra/database';

export async function GET(request: Request) {
  const now = new Date().toISOString();

  const versionResult = await query('SHOW server_version;');
  const version = versionResult.rows[0].server_version;

  const maxConnectionResult = await query('SHOW max_connections;');
  const maxConnections = parseInt(maxConnectionResult.rows[0].max_connections);

  const { searchParams } = new URL(request.url);
  const databaseName =
    searchParams.get('databaseName') || process.env.POSTGRES_DB;

  const openedConnectionsResults = await query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  });

  const openedConnections = openedConnectionsResults.rows[0].count;

  const json = {
    updated_at: now,
    dependencies: {
      database: {
        version,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  };

  return Response.json(json);
}
