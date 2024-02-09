import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Diagnose, Entry, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails/EntryDetails";
import AddEntry from "../AddEntry";

const PatientDetails = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('HealthCheck');
  const [alertType, setAlertType] = useState<AlertColor>('success');

  useEffect(() => {
    patientService.getOne(id).then((response) => setPatient(response));
  }, []);

  useEffect(() => {
    diagnoseService.getAll().then((response) => setDiagnoses(response));
  }, []);

  if (!patient) return <p>Loading...</p>;

  const renderComponentBasedOnGender = (gender: string): JSX.Element | null => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  const handleShowForm = (): void => {
    setShowForm((prevState) => !prevState);
  };

  const handlePatientEntryChanges = (patientNewEntry: Entry) => {
    setPatient((prevState) => {
      if (!prevState) {
        return;
      }
      return {
        ...prevState,
        entries: prevState.entries.concat(patientNewEntry),
      };
    });
  };

  const handleMessageChange = (message: string) => {
    setMessage(message);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleAlertTypeChange = (color: AlertColor) => {
    setAlertType(color);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", fontWeight: "bold", marginY: "20px" }}>
        <Typography variant='h5'>{patient.name}</Typography>
        {renderComponentBasedOnGender(patient.gender)}
      </Box>
      <Box sx={{marginBottom: '15px'}}>
        <Typography sx={{marginBottom: '5px'}}>ssh: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Box>
      {message !== "" && <Alert severity={alertType} sx={{marginY: '10px'}}>{message}</Alert>}
      {
        !showForm && 
            <FormControl>
                <FormLabel id='demo-controlled-radio-buttons-group'>ADD NEW ENTRY</FormLabel>
                <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={type}
                onChange={handleTypeChange}
                >
                    <Box>
                        <FormControlLabel value='HealthCheck' control={<Radio />} label='Health check' />
                        <FormControlLabel value='OccupationalHealthcare' control={<Radio />} label='Occupational healthcare' />
                        <FormControlLabel value='Hospital' control={<Radio />} label='Hospital' />
                        <Button variant='contained' onClick={handleShowForm}>
                        SHOW FORM
                        </Button>
                    </Box>
                </RadioGroup> 
            </FormControl>
      }
      {showForm && (
        <AddEntry
          onShowForm={handleShowForm}
          onPatientEntryChanges={handlePatientEntryChanges}
          onMessageChange={handleMessageChange}
          entryType={type}
          diagnoses={diagnoses}
          onAlertTypeChange={handleAlertTypeChange}
        />
      )}

      <Typography variant='h6'>Entries:</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry: Entry, index: number) => {
          return (
            <EntryDetails key={index} entry={entry} diagnoses={diagnoses} />
          );
        })
      )}
    </Box>
  );
};

export default PatientDetails;
