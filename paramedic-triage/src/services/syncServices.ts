import { TriageRepository } from "../database/triageRepository";
import { ApiService } from "./api";

export class SyncService {
  private repository = new TriageRepository();
  private api = new ApiService();

  private isSyncing = false;

  async syncPending(onComplete?: () => void) {
  if (this.isSyncing) return;

  this.isSyncing = true;

  try {
    const pending = this.repository.getPending();

    console.log(`Found ${pending.length} pending record(s)`);

    for (const record of pending) {
      try {
        await this.api.upload(record);

        this.repository.markAsSynced(record.id);

        console.log(`${record.patientName} synced`);
      } catch {
        console.log(`${record.patientName} failed to sync`);
      }
    }

    // Notify UI that sync has finished
    onComplete?.();

  } finally {
    this.isSyncing = false;
  }

  }
}