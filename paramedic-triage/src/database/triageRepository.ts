import { Triage } from "../models/triage";
import { db } from "./database";

export class TriageRepository {
save(record: Triage) {
  try {
    console.log("Saving:", record);

    db.runSync(
      `
      INSERT INTO triage (
        id,
        patientName,
        description,
        priority,
        status,
        synced,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.patientName,
        record.description,
        record.priority,
        record.status,
        record.synced ? 1 : 0,
        record.createdAt,
      ]
    );

    console.log("Saved successfully");
  } catch (error) {
    console.error("SQLite Error:", error);
  }
}

  getAll(): Triage[] {
    return db.getAllSync<Triage>("SELECT * FROM triage");
  }

  getPending(): Triage[] {
    return db.getAllSync<Triage>(
      "SELECT * FROM triage WHERE synced = 0"
    );
  }

  markAsSynced(id: string) {
    db.runSync(
      "UPDATE triage SET synced = 1 WHERE id = ?",
      [id]
    );
    console.log(`Record with id ${id} marked as synced.`);
  }

  delete(id: string) {
  db.runSync(
    "DELETE FROM triage WHERE id = ?",
    [id]
  );
}
}