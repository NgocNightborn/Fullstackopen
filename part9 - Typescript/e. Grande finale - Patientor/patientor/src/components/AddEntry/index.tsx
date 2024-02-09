import {
  FormControl,
  Button,
  Box,
  InputLabel,
  Typography,
  Stack,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Chip,
} from "@mui/material";
import { AddEntryProps, addEntryForm } from "./types";
import { useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId } from "../../types";
import axios from "axios";
import { Theme, useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
return {
    fontWeight:
    personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
};
}

const AddEntry = (props: AddEntryProps) => {
  const { id } = useParams();
  const [formFields, setFormField] = useState<addEntryForm>({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: "",
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
    dischargeDate: "",
    dischargeCriteria: "",
  });

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const theme = useTheme();

  console.log(diagnosisCodes)
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormField((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleEntryAddition = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newEntry: EntryWithoutId;
    if (props.entryType === "Hospital") {
      newEntry = {
        description: formFields.description,
        specialist: formFields.specialist,
        date: formFields.date,
        type: "Hospital",
        discharge: {
          date: formFields.dischargeDate,
          criteria: formFields.dischargeCriteria,
        },
      };
    } else if (props.entryType === "HealthCheck") {
      newEntry = {
        description: formFields.description,
        specialist: formFields.specialist,
        date: formFields.date,
        type: "HealthCheck",
        healthCheckRating: Number(formFields.healthCheckRating),
      };
    } else {
      newEntry = {
        description: formFields.description,
        specialist: formFields.specialist,
        date: formFields.date,
        type: "OccupationalHealthcare",
        employerName: formFields.employerName,
      };
      if (
        formFields.sickLeaveStartDate !== "" &&
        formFields.sickLeaveEndDate !== ""
      ) {
        newEntry.sickLeave = {
          startDate: formFields.sickLeaveStartDate,
          endDate: formFields.sickLeaveEndDate,
        };
      }
    }

    if (diagnosisCodes.length !== 0) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

    patientService
      .addEntryToPatient(id, newEntry)
      .then((response) => props.onPatientEntryChanges(response))
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data;
            props.onErrorChange(message);
            setTimeout(() => {
              props.onErrorChange("");
            }, 5000);
          } else {
            props.onErrorChange("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          props.onErrorChange("Unknown error");
        }
      });
  };

  const renderInputFieldBasedOnType = (type: string) => {
    switch (type) {
      case "HealthCheck":
        return (
          <Box sx={{ marginBottom: "15px" }}>
            <FormControl>
              <FormLabel id='healthCheckRating-group'>
                Healthcheck rating
              </FormLabel>
              <RadioGroup
                aria-labelledby='healthCheckRating-group'
                name='healthCheckRating'
                value={formFields.healthCheckRating}
                onChange={handleFieldChange}
              >
                <Box>
                  <FormControlLabel
                    value='0'
                    control={<Radio />}
                    label='Healthy'
                  />
                  <FormControlLabel
                    value='1'
                    control={<Radio />}
                    label='Low risk'
                  />
                  <FormControlLabel
                    value='2'
                    control={<Radio />}
                    label='High risk'
                  />
                  <FormControlLabel
                    value='3'
                    control={<Radio />}
                    label='Critical risk'
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case "Hospital":
        return (
          <>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <TextField
                  id='dischargeDate'
                  name='dischargeDate'
                  onChange={handleFieldChange}
                  value={formFields.dischargeDate}
                  label='Discharge date'
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <TextField
                  id='dischargeCriteria'
                  name='dischargeCriteria'
                  onChange={handleFieldChange}
                  value={formFields.dischargeCriteria}
                  label='Discharge criteria'
                />
              </FormControl>
            </Box>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <InputLabel htmlFor='employerName'>Employer name</InputLabel>
                <TextField
                  id='employerName'
                  name='employerName'
                  onChange={handleFieldChange}
                  value={formFields.employerName}
                  label='Employer name'
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <TextField
                  id='sickLeaveStartDate'
                  name='sickLeaveStartDate'
                  onChange={handleFieldChange}
                  value={formFields.sickLeaveStartDate}
                  label='Sickleave start date'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <TextField
                  id='sickLeaveEndDate'
                  name='sickLeaveEndDate'
                  onChange={handleFieldChange}
                  value={formFields.sickLeaveEndDate}
                  label='Sickleave end date'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </Box>
          </>
        );
    }
  };

  return (
    <Box component={"form"} sx={{ borderStyle: "dashed", padding: "10px" }}>
      <Typography variant='h6'>New {props.entryType} entry</Typography>
      <Box sx={{ marginTop: "5px", marginBottom: "15px" }}>
        <FormControl>
          <TextField
            id='description'
            name='description'
            onChange={handleFieldChange}
            value={formFields.description}
            label='Description'
          />
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <FormControl>
          <TextField
            id='date'
            name='date'
            onChange={handleFieldChange}
            value={formFields.date}
            type='date'
            label='Date'
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </Box>

      <Box sx={{ marginBottom: "15px" }}>
        <FormControl>
          <TextField
            id='specialist'
            name='specialist'
            onChange={handleFieldChange}
            value={formFields.specialist}
            label='Specialist'
          />
        </FormControl>


      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
            <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {props.diagnoses.map((diagnose) => (
                <MenuItem
                key={diagnose.code}
                value={diagnose.code}
                style={getStyles(diagnose.code, diagnosisCodes, theme)}
                >
                {diagnose.code}
                </MenuItem>
            ))}
            </Select>
          {/* <TextField
            id='diagnosisCode'
            name='diagnosisCodes'
            onChange={handleFieldChange}
            value={formFields.diagnosisCodes}
            label='Diagnosis codes'
          /> */}
        </FormControl>
      </Box>

      {renderInputFieldBasedOnType(props.entryType)}

      <Stack
        direction={"row"}
        justifyContent='space-between'
        sx={{ marginY: "15px" }}
      >
        <Button variant='contained' onClick={props.onShowForm}>
          CANCEL
        </Button>
        <Button type='submit' variant='contained' onClick={handleEntryAddition}>
          ADD
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEntry;
