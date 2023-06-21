import { serial, text, timestamp, pgTable, date, varchar } from "drizzle-orm/pg-core";

export const record = pgTable("Record", {
  id: serial("id").primaryKey(),
  albumName: varchar("name", { length: 256 }),
  artistName: varchar("artist", { length: 256 }),
  genreName: varchar("genre", { length: 256 }),
  releaseDate: varchar("releaseDate", { length: 256 }),
});
