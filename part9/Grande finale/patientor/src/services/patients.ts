import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id: string | undefined) => {
  if (!id) throw new Error('Error: missing id');
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

// const addEntryToPatient = async(patientId, entry) => {
//   const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
//   return data;
// };

export default {
  getAll, create, getOne
};

