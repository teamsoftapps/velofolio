/** @format */

export type Status = string; // Could be expanded to specific union types later

export interface BaseEntity {
  id: string | number;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
}

export type DateString = string; // Format: YYYY-MM-DD or ISO
