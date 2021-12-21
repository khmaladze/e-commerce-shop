import knex, { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    database: "app",
    user: "root",
    password: "root",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

export default config;
