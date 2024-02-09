
import { Card, CardContent, Typography } from "@mui/material";
import { HealthCheckEntryDetailsProps } from "./types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { orange, yellow } from "@mui/material/colors";
import DiagnosisList from "../../DiagnosisList";

const HealthCheckEntryDetails = (props: HealthCheckEntryDetailsProps) => {

    const healthCheckRatingToIcon = (rating: number): JSX.Element | null => {
        switch (rating) {
            case 0:
                return <FavoriteIcon color="success" />;
            case 1:
                return <FavoriteIcon sx={{color: yellow[500]}} />;
            case 2:
                return <FavoriteIcon sx={{color:orange[500]}}/>;
            case 3:
                return <FavoriteIcon color="error" />;
            default:
                return null;
        }
    };

    return (
        <Card sx={{ marginBottom: '10px', border:'1px solid' }}>
            <CardContent>         
                <Typography sx={{marginBottom: '5px'}}>
                    {props.entry.date}
                    <MedicalServicesIcon />
                </Typography>
                <Typography sx={{marginBottom: '5px'}}>{props.entry.description}</Typography>            
                <Typography sx={{marginBottom: '5px'}}>Health rating: {healthCheckRatingToIcon(props.entry.healthCheckRating)}</Typography>
                <Typography sx={{marginBottom: '5px'}}>Diagnosed by {props.entry.specialist}</Typography>
                <Typography>Diagnoses: </Typography>
                {props.entry.diagnosisCodes && <DiagnosisList entry={props.entry} diagnoses={props.diagnoses} />}   
            </CardContent>
        </Card>
    );
};

export default HealthCheckEntryDetails;