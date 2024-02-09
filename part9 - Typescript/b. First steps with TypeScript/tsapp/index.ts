import express from 'express';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';
import calculateExercises from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (isNotNumber(height) || isNotNumber(weight)) return res.status(400).json({error: 'malformatted parameters'});

    const bmi = calculateBmi(Number(height), Number(weight));

    return res.json({weight, height, bmi});
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyExercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target } = req.body;

    if (!dailyExercises || !target) return res.status(400).json({error: 'paramaters missing'});

    if (!Array.isArray(dailyExercises) || isNotNumber(target) || dailyExercises.some(exercises =>  isNotNumber(exercises))) {
        return res.status(400).json({error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exercises = calculateExercises(dailyExercises, Number(target));

    return res.json({exercises});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

