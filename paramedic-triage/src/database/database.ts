import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("triage.db");

export function initializeDatabase() {

      console.log("Initializing database...");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS triage (
      id TEXT PRIMARY KEY NOT NULL,
      patientName TEXT NOT NULL,
      description TEXT NOT NULL,
      priority INTEGER NOT NULL,
      status TEXT NOT NULL,
      synced INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);
    console.log("Database initialized.");

}