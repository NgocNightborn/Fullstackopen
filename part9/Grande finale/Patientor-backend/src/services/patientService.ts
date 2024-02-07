import patientsData from '../../data/patients-full';
import { NonSensitivePatientEntry, newPatientEntry, patientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: patientEntry[] = patientsData;

const getEntries = (): patientEntry[] => {
    return patients;
};

const getEntry = (id: string): patientEntry | undefined => {
    return patients.find(patient => patient.id === id);
};

const getNonSsnEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const addPatient = (entry: newPatientEntry): patientEntry => {
    const newPatientEntry: patientEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        entries: [],
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSsnEntries,
    addPatient,
    getEntry
};