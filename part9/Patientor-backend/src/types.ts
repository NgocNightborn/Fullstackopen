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

export interface patientEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSsnPatientEntry = Omit<patientEntry, 'ssn'>;

export type newPatientEntry = Omit<patientEntry, 'id'>;