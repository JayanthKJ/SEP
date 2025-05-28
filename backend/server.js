import express from 'express';
import mongoose from 'mongoose';
import itemsRoutes from './routes/itemRoutes.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/items', itemsRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
