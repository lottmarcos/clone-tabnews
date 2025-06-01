/* eslint-disable no-console */
import { exec } from 'node:child_process';

const checkPostgres = async () => {
  exec(
    'docker exec clone-tabnews-postgres-dev pg_isready --host localhost',
    (_, stdout) => {
      if (stdout.search('accepting connections') === -1) {
        checkPostgres();
        return;
      }

      console.log('✅ Postgres está aceitando conexões!\n');
    }
  );
};

console.log('\n⏳ Aguardando Postgres aceitar conexões...');
checkPostgres();
