import { AlertColor } from "@mui/material";
import { Diagnose, Entry } from "../../types";

export interface AddEntryProps {
    onShowForm: () => void;
    onPatientEntryChanges: (entry: Entry) => void;
    onMessageChange: (error: string) => void;
    entryType: string;
    diagnoses: Diagnose[];
    onAlertTypeChange: (color: AlertColor) => void;
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