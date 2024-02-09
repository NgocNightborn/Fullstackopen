export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>
}

export enum HealthCheckRating {
  "Healty" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave
}

interface SickLeave {
  startDate: string,
  endDate: string
}

interface Discharge {
  date: string,
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T , K>: never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;