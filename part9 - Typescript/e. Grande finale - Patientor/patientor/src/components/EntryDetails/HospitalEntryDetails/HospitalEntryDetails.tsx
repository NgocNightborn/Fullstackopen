import { Card, CardContent, Typography } from "@mui/material";
import { HospitalEntryDetailsProps } from "./types";
import DiagnosisList from "../../DiagnosisList/DiagnosisList";


const HospitalEntryDetails = (props: HospitalEntryDetailsProps) => {
    return (
        <Card sx={{ marginBottom: '10px', border:'1px solid' }}>
            <CardContent>         
                <Typography sx={{marginBottom: '5px'}}>
                    {props.entry.date}
                </Typography>
                <Typography sx={{marginBottom: '5px'}}>{props.entry.description}</Typography>
                <Typography sx={{marginBottom: '5px'}}>Discharge on {props.entry.discharge.date} because {props.entry.discharge.criteria}</Typography>
                <Typography sx={{marginBottom: '5px'}}>Diagnosed by {props.entry.specialist}</Typography> 
                <Typography>Diagnoses: </Typography>
                {props.entry.diagnosisCodes && <DiagnosisList entry={props.entry} diagnoses={props.diagnoses} />}    
            </CardContent>
        </Card>
    );
};

export default HospitalEntryDetails;