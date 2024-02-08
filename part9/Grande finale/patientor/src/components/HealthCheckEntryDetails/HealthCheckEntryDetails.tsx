
import { Card, CardContent, Typography } from "@mui/material";
import { HealthCheckEntryDetailsProps } from "./types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { orange, yellow } from "@mui/material/colors";

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
                <Typography>
                    {props.entry.date}
                    <MedicalServicesIcon />
                </Typography>
                <Typography>{props.entry.description}</Typography>
                {healthCheckRatingToIcon(props.entry.healthCheckRating)}
                <Typography>diagnose by {props.entry.specialist}</Typography>   
            </CardContent>
        </Card>
    );
};

export default HealthCheckEntryDetails;