import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get potential matches
router.get('/:id/matches', async (req, res) => {
  try {
    const currentItem = await Item.findById(req.params.id);
    if (!currentItem) return res.status(404).json({ error: 'Item not found' });

    const matches = await Item.find({
      _id: { $ne: currentItem._id },
      status: { $ne: currentItem.status },
      category: currentItem.category
    });

    const enrichedMatches = matches.map(item => ({
      item,
      matchScore: Math.floor(Math.random() * 40) + 60
    })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);

    res.json(enrichedMatches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark item as resolved
router.patch('/:id/resolve', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, { isResolved: true }, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
