import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    user: "root",
    password: "example",
    host: "localhost",
    port: 3307,
    database: "Records",
  },
} satisfies Config;
