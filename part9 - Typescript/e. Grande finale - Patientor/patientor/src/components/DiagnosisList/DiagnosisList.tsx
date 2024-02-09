import { List, ListItem, Typography } from "@mui/material";
import { Diagnose } from "../../types";
import { DiagnosisListProps } from "./types";

const DiagnosisList = (props: DiagnosisListProps) => {
    return (
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
            {props.entry.diagnosisCodes && (
                props.entry.diagnosisCodes.map((code: string) => {
                    return (
                        <ListItem key={code} sx={{ display: 'list-item' }}>
                            <Typography>{code} {props.diagnoses.find((diagnose: Diagnose) => diagnose.code === code)?.name}</Typography> 
                        </ListItem>
                    );      
                }))
            }
        </List>   
    );
};

export default DiagnosisList;