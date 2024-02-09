import {
  FormControl,
  Button,
  Box,
  InputLabel,
  Input,
  Typography,
  Stack,
} from "@mui/material";
import { AddEntryProps, addEntryForm } from "./types";
import { useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { EntryWithoutId } from "../../types";
import axios from "axios";

const AddEntry = (props: AddEntryProps) => {
  const { id } = useParams();
  const [formFields, setFormField] = useState<addEntryForm>({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: "",
    diagnosisCodes: "",
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
    dischargeDate: "",
    dischargeCriteria: "",
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormField((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
            criteria: formFields.dischargeCriteria
            },
        };
    } else if (props.entryType === "HealthCheck") {
        newEntry = {
            description: formFields.description,
            specialist: formFields.specialist,
            date: formFields.date,
            type: 'HealthCheck',
            healthCheckRating: Number(formFields.healthCheckRating)
        };
    } else {
        newEntry = {
            description: formFields.description,
            specialist: formFields.specialist,
            date: formFields.date,
            type: 'OccupationalHealthcare',
            employerName: formFields.employerName,
            
        };
        if (formFields.sickLeaveStartDate !== '' && formFields.sickLeaveEndDate !== '') {
            newEntry.sickLeave = {
                startDate: formFields.sickLeaveStartDate,
                endDate: formFields.sickLeaveEndDate
            };
        }
    }

    if (formFields.diagnosisCodes.trim() !== "") {
      let splitCodes;
      if (formFields.diagnosisCodes.includes(",")) {
        splitCodes = formFields.diagnosisCodes
          .split(",")
          .map((code) => code.trim());
      } else {
        splitCodes = formFields.diagnosisCodes
          .split(" ")
          .map((code) => code.trim());
      }
      newEntry.diagnosisCodes = splitCodes;
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
              <InputLabel htmlFor='healthCheckRating'>
                Healthcheck rating
              </InputLabel>
              <Input
                id='healthCheckRating'
                name='healthCheckRating'
                onChange={handleFieldChange}
                value={formFields.healthCheckRating}
              />
            </FormControl>
          </Box>
        );
      case "Hospital":
        return (
          <>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <InputLabel htmlFor='dischargeDate'>Discharge date</InputLabel>
                <Input
                  id='dischargeDate'
                  name='dischargeDate'
                  onChange={handleFieldChange}
                  value={formFields.dischargeDate}
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <InputLabel htmlFor='dischargeCriteria'>
                  Employer name
                </InputLabel>
                <Input
                  id='dischargeCriteria'
                  name='dischargeCriteria'
                  onChange={handleFieldChange}
                  value={formFields.dischargeCriteria}
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
                <InputLabel htmlFor='employerName' shrink={false} >Employer name</InputLabel>
                <Input
                  id='employerName'
                  name='employerName'
                  onChange={handleFieldChange}
                  value={formFields.employerName}
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <InputLabel htmlFor='sickLeaveStartDate'>sickLeave startDate</InputLabel>
                <Input
                  id='sickLeaveStartDate'
                  name='sickLeaveStartDate'
                  onChange={handleFieldChange}
                  value={formFields.sickLeaveStartDate}
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <FormControl>
                <InputLabel htmlFor='sickLeaveEndDate'>sickLeave endDate</InputLabel>
                <Input
                  id='sickLeaveEndDate'
                  name='sickLeaveEndDate'
                  onChange={handleFieldChange}
                  value={formFields.sickLeaveEndDate}
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
          <InputLabel htmlFor='description'>Description</InputLabel>
          <Input
            id='description'
            name='description'
            onChange={handleFieldChange}
            value={formFields.description}
          />
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <FormControl>
          <InputLabel htmlFor='date'>Date</InputLabel>
          <Input
            id='date'
            name='date'
            onChange={handleFieldChange}
            value={formFields.date}
          />
        </FormControl>
      </Box>

      <Box sx={{ marginBottom: "15px" }}>
        <FormControl>
          <InputLabel htmlFor='specialist'>Specialist</InputLabel>
          <Input
            id='specialist'
            name='specialist'
            onChange={handleFieldChange}
            value={formFields.specialist}
          />
        </FormControl>
      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <FormControl>
          <InputLabel htmlFor='diagnosisCode'>Diagnosis codes</InputLabel>
          <Input
            id='diagnosisCode'
            name='diagnosisCodes'
            onChange={handleFieldChange}
            value={formFields.diagnosisCodes}
          />
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
