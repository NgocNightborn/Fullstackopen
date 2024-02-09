import { Card, CardContent, Stack, Typography } from "@mui/material";
import { OccupationalHealthcareDetailsProps } from "./types";
import WorkIcon from '@mui/icons-material/Work';
import DiagnosisList from "../../DiagnosisList";

const OccupationalHealthcareDetails = (props: OccupationalHealthcareDetailsProps): JSX.Element => {
    return (
        <Card sx={{ marginBottom: '10px', border:'1px solid' }}>
            <CardContent>
                <Stack direction={'row'} sx={{marginBottom: '5px'}}>
                    <Typography>
                        {props.entry.date}
                        <WorkIcon />
                        {props.entry.employerName}
                    </Typography>
                </Stack>
                <Typography sx={{marginBottom: '5px'}}>{props.entry.description}</Typography>
                <Typography sx={{marginBottom: '5px'}}>Diagnosed by {props.entry.specialist}</Typography>
                <Typography>Diagnoses: </Typography>
                {props.entry.diagnosisCodes && <DiagnosisList entry={props.entry} diagnoses={props.diagnoses} />}   
            </CardContent>
        </Card>
    );
};

export default OccupationalHealthcareDetails;