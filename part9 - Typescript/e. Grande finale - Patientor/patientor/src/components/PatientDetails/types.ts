import { Diagnose, Entry } from "../../types";

export interface PatientEntryChanges {
    entry: Entry[];
    diagnoses: Diagnose[];
}