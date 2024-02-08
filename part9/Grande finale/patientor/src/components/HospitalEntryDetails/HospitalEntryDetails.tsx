import { Box, Card, CardContent, Typography } from "@mui/material";
import { HospitalEntryDetailsProps } from "./types";


const HospitalEntryDetails = (props: HospitalEntryDetailsProps) => {
    return (
        <Card sx={{ marginBottom: '10px', border:'1px solid' }}>
            <CardContent>         
                <Typography>
                    {props.entry.date}
                </Typography>
                <Typography>{props.entry.description}</Typography>
                <Typography>discharge {props.entry.discharge.date} {props.entry.discharge.criteria}</Typography>
                <Typography>diagnose by {props.entry.specialist}</Typography>   
            </CardContent>
        </Card>
    );
};

export default HospitalEntryDetails;