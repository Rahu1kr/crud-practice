import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/items', itemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));
