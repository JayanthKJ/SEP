import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  res.json(items);
});

// GET single item by ID
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// POST new item
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.status(201).json(saved);
});

// PATCH update item
router.patch('/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

export default router;
