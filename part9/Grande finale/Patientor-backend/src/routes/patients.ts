import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('get patients');
    return res.json(patientService.getNonSsnEntries()); 
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService.getEntry(id);
    if (patient === undefined) return res.status(404).send({error: 'Error: patient not found'});
    return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
    
    try {
        const { id } = req.params;
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntryToPatient(id, newEntry);
        return res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += `Error ${error.message}`;
        }
        return res.status(400).send(errorMessage);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addEntry = patientService.addPatient(newPatientEntry);
        res.json(addEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += `Error ${error.message}`;  
        }
        res.status(404).send(errorMessage);
    }
});

export default router;