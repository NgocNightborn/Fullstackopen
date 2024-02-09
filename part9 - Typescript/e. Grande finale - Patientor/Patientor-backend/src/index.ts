import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());

const PORT = 3001;

const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173'
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});