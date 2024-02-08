import { Card, CardContent, Stack, Typography } from "@mui/material";
import { OccupationalHealthcareDetailsProps } from "./types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareDetails = (props: OccupationalHealthcareDetailsProps): JSX.Element => {
    return (
        <Card sx={{ marginBottom: '10px', border:'1px solid' }}>
            <CardContent>
                <Stack direction={'row'}>
                    <Typography>
                        {props.entry.date}
                        <WorkIcon />
                        {props.entry.employerName}
                    </Typography>
                </Stack>
                <Typography>{props.entry.description}</Typography>
                <Typography>diagnose by {props.entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

export default OccupationalHealthcareDetails;