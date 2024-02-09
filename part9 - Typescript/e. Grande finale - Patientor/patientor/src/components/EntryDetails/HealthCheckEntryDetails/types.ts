import { Diagnose, HealthCheckEntry } from "../../../types";

export interface HealthCheckEntryDetailsProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnose[];
}