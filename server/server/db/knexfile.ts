import knex, { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const database = process.env.DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const config: Knex.Config = {
  client: "pg",
  connection: {
    database: database,
    user: user,
    password: password,
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
