import { Diagnose, Entry } from "../../types";

export interface AddEntryProps {
    onShowForm: () => void;
    onPatientEntryChanges: (entry: Entry) => void;
    onErrorChange: (error: string) => void;
    entryType: string
    diagnoses: Diagnose[]
}

export interface addEntryForm {
    description: string;
    date: string;
    specialist: string;
    healthCheckRating: string;
    employerName: string,
    sickLeaveStartDate: string,
    sickLeaveEndDate: string,
    dischargeDate: string
    dischargeCriteria: string
}