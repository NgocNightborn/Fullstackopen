import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Diagnose, Entry, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import EntryDetails from "../EntryDetails/EntryDetails";

const PatientDetails = () => {
    const { id } = useParams();

    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

    useEffect(() => {
        patientService.getOne(id).then(response => setPatient(response));
    },[]);

    useEffect(() => {
        diagnoseService.getAll().then(response => setDiagnoses(response));
    },[]);

    if (!patient) return <p>Loading...</p>;

    const renderComponentBasedOnGender = (gender: string): JSX.Element | null => {
        switch (gender) {
            case 'male':
                return <MaleIcon />;
            case 'female':
                return <FemaleIcon />;
            case 'other':
                return <TransgenderIcon />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Box sx={{ display:'flex', fontWeight: 'bold', marginY: '20px'}}>
                <Typography variant="h5">{patient.name}</Typography>
                {renderComponentBasedOnGender(patient.gender)}
            </Box>
            <Box>
                <Typography>ssh: {patient.ssn}</Typography>
                <Typography>occupation: {patient.occupation}</Typography>
            </Box>

            <Typography variant="h6">entries</Typography>
            {
                patient.entries.length === 0 
                ? <Typography>No entries</Typography>
                : patient.entries.map((entry: Entry, index: number) => {
                    return (
                        <EntryDetails key={index} entry={entry} />
                        // <Card key={index} sx={{ marginBottom: '15px', border:'2px solid' }}>
                        //     <CardContent>
                        //         <Box>
                        //             <Typography>{entry.date}</Typography>
                        //             <Typography>{entry.description}</Typography>
                        //             <List sx={{ listStyleType: 'disc', pl: 4 }}>
                        //             {entry.diagnosisCodes && (
                        //                 entry.diagnosisCodes.map((code: string) => {
                        //                     console.log(code);
                        //                     return (
                        //                         <ListItem key={code} sx={{ display: 'list-item' }}>
                        //                             {code} {diagnoses.find((diagnose: Diagnose) => diagnose.code === code)?.name}
                        //                         </ListItem>
                        //                     );
                        //                 }))
                        //             }
                        //             </List>          
                        //         </Box>
                        //     </CardContent>                 
                        // </Card>         
                        
                    );
                })
            }
            <Button variant="contained">ADD NEW ENTRY</Button>
        </Box>
        
    );
};

export default PatientDetails;