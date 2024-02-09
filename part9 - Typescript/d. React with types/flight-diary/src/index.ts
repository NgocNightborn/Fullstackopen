import express from 'express';
const app = express();
const cors = require('cors')
import diaryRouter from './routes/diaries';
app.use(express.json());

const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:5173'
}

app.use(cors(corsOptions));

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});