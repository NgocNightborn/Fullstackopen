import { Diagnose, OccupationalHealthcareEntry } from "../../types";

export interface OccupationalHealthcareDetailsProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnose[];
}