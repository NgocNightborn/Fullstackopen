import { BaseEntryWithoutId, Discharge, Entry, EntryWithoutId, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, SickLeave, diagnoseEntry, newPatientEntry } from "./types";

const toNewPatientEntry = (object: unknown): newPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        const newEntry: newPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object' || !isEntry(object)) {
        throw new Error('Incorrect or missing data');
    }

    switch (object.type) {
        case 'Hospital':
            return parseHopitalEntry(object);
        case 'HealthCheck':
            return parseHealthCheckEntry(object);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(object);
        default:
            throw new Error('Incorrect Entry type');
    }
};

const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(value => value.toString()).includes(param);
};

const parseDiagnosisCodes = (object: unknown): Array<diagnoseEntry['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<diagnoseEntry['code']>;
    }

    return object.diagnosisCodes as Array<diagnoseEntry['code']>;
};

// const parseEntries = (entries: unknown): EntryWithoutId[] => {
//     if (!entries || !isArray(entries) || !isEntryArray(entries)) {
//         throw new Error('Incorrect or missing entries');
//     }
//     const parsedEntries = entries.map(entry => {
//         switch (entry.type) {
//             case 'Hospital':
//                 return parseHopitalEntry(entry);
//             case 'HealthCheck':
//                 return parseHealthCheckEntry(entry);
//             case 'OccupationalHealthcare':
//                 return parseOccupationalHealthcareEntry(entry);
//             default:
//                 throw new Error('Incorrect entries');
//         }
//     });
//     return parseEntries;
// };


// const isEntryArray = (entries: unknown[]): entries is Entry[] => {
//     return entries.every(entry => isEntry(entry));
// };

// const isArray = (value: unknown): value is unknown[] => {
//     return Array.isArray(value);
// };

const isEntry = (entry: unknown): entry is Entry => {
    if (!entry || typeof entry !== 'object') return false;
    return 'id' in entry && 'description' in entry && 'date' in entry && 'specialist' in entry && 'type' in entry;
};

const parseBaseEntry = (entry: EntryWithoutId): BaseEntryWithoutId => {
    const baseEntry: BaseEntryWithoutId = {
        description: parseString(entry.description),
        date: parseDate(entry.date),
        specialist: parseString(entry.specialist),
    };

    if (entry.diagnosisCodes) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }
    return baseEntry;
};

const parseHopitalEntry = (entry: HospitalEntry): EntryWithoutId => {
    const baseEntry = parseBaseEntry(entry);
    const hospitalEntry: EntryWithoutId = {
        ...baseEntry,
        type: entry.type,
        discharge: parseDischarge(entry.discharge)
    };

    return hospitalEntry;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!isDischarge(discharge)) {
        throw new Error('Incorrect Hospital Entry');
    }
    return {
        date: discharge.date,
        criteria: discharge.criteria
    };
};

const isDischarge = (value: unknown): value is Discharge => {
    if (!value || typeof value !== 'object') {
        return false;
    }
    if ('date' in value && 'criteria' in value) {
        if (!isString(value.date) || !isString(value.criteria)) return false;
        return true;
    }
    return false;
};

const parseHealthCheckEntry = (entry: HealthCheckEntry): EntryWithoutId => {
    const baseEntry = parseBaseEntry(entry);
    const healthCheckEntry: EntryWithoutId = {
        ...baseEntry,
        type: entry.type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
    }; 

    return healthCheckEntry;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect Healthcheck Entry');
    }
    return rating;
};

const isNumber = (value: unknown): value is number => {
    return typeof value === 'number' && !Number.isNaN(value);
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(value);
};

const parseOccupationalHealthcareEntry = (entry: OccupationalHealthcareEntry): EntryWithoutId => {
    const baseEntry = parseBaseEntry(entry);
    const occupationalHealthcareEntry: EntryWithoutId = {
        ...baseEntry,
        type: entry.type,
        employerName: parseString(entry.employerName),
    };
    if (entry.sickLeave) {
        occupationalHealthcareEntry.sickLeave = parseSickLeave(entry.sickLeave);
    }

    return occupationalHealthcareEntry;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickLeave');
    }
    return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate
    };
};

const isSickLeave = (object: object): object is SickLeave => {
    if ('startDate' in object && 'endDate') {
        return true;
    }
    return false;
};

export default toNewPatientEntry;