// // // modules 
// // let name="prasad"
// // console.log(`Hello there ${name}`)

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure your DB name is set, here I used 'hermioneDB')
mongoose.connect('mongodb://127.0.0.1:27017/hermioneDB')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('DB Connection error:', err));

// Define a simple schema and model (example: Item)
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Routes

// Health check
app.get('/', (req, res) => {
  res.send('Prasad');
});

// Create a new item (POST /api/items)
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create item', error });
  }
});

// Get all items (GET /api/items)
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error });
  }
});

// Optional: Get one item by ID (GET /api/items/:id)
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
