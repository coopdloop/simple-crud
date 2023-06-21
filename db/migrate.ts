import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { connection } from "@/db/db";
import postgres from 'postgres'

const sql = postgres(connection,{max:1})
const db: PostgresJsDatabase = drizzle(sql);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};
