import { NextApiRequest, NextApiResponse } from "next";
import { query } from "infra/database";

const status = async (req: NextApiRequest, res: NextApiResponse) => {
  const updated_at = new Date().toISOString();

  const versionResult = await query("SHOW server_version;");
  const version = versionResult.rows[0].server_version;

  const maxConnectionResult = await query("SHOW max_connections;");
  const max_connections = parseInt(maxConnectionResult.rows[0].max_connections);

  const databaseName = req.query.databaseName || process.env.POSTGRES_DB;
  console.log(`Database name: ${databaseName}`);
  const openedConnectionsResults = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const opened_connections = openedConnectionsResults.rows[0].count;

  const json = {
    updated_at,
    dependencies: {
      database: { version, max_connections, opened_connections },
    },
  };

  console.log(json);

  res.status(200).json(json);
};

export default status;
