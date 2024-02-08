import { EntryDetailsProps } from "./types";
import OccupationalHealthcareDetails from "../OccupationalHealthcareDetails/OccupationalHealthcareDetails";
import HospitalEntryDetails from "../HospitalEntryDetails/HospitalEntryDetails";
import HealthCheckEntryDetails from "../HealthCheckEntryDetails/HealthCheckEntryDetails";
import { assertNever } from "../../utils";


const EntryDetails = (props: EntryDetailsProps): JSX.Element => {

    switch (props.entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={props.entry} />;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={props.entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareDetails entry={props.entry} />;
        default:
            return assertNever(props.entry);
    }
};

export default EntryDetails;