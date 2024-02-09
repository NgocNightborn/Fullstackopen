import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('get patients');
    return res.json(patientService.getNonSsnEntries()); 
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