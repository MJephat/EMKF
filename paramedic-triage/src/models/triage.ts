export type Status = "Pending" | "In-Transit";

export interface Triage {
  id: string;
  patientName: string;
  description: string;
  priority: number;
  status: Status;
  synced: boolean;
  createdAt: string;
}