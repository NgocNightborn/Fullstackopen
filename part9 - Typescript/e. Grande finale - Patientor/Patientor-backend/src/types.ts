export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface diagnoseEntry {
    code: string,
    name: string,
    latin?: string
}


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<diagnoseEntry['code']>
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

export interface SickLeave {
    startDate: string,
    endDate: string
}

export interface Discharge {
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: Discharge
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export interface patientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[] 
}

export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn' | 'entries'>;

export type newPatientEntry = Omit<patientEntry, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T , K>: never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;