import express from 'express';
import identifyRouter from './routes/identify';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', identifyRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
