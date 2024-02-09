import { Diagnose, HospitalEntry } from "../../types";

export interface HospitalEntryDetailsProps {
    entry: HospitalEntry;
    diagnoses: Diagnose[];
}