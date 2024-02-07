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

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
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

interface HospitalEntry extends BaseEntry {
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